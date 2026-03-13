import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaUtensils, FaCrown, FaBirthdayCake, FaCalendarAlt, 
  FaClock, FaUserFriends, FaUser, FaPhoneAlt, 
  FaStickyNote, FaMoneyBillWave, FaCreditCard, FaCheckCircle,
  FaChevronRight, FaChevronLeft
} from 'react-icons/fa';

const STEPS = ['الخدمة', 'الموعد', 'التفاصيل', 'الدفع', 'تأكيد'];

const Booking = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingData, setBookingData] = useState({
    service: '',
    date: '',
    time: '',
    guests: '2',
    name: '',
    phone: '',
    notes: '',
    paymentMethod: 'cash'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBookingData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceSelect = (serviceType: string) => {
    setBookingData(prev => ({ ...prev, service: serviceType }));
  };

  const nextStep = () => {
    if (currentStep < 5) setCurrentStep(curr => curr + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(curr => curr - 1);
  };

  const confirmBooking = () => {
    setIsSubmitting(true);
    // Simulate API Call
    setTimeout(() => {
      setIsSubmitting(false);
      setCurrentStep(5); // Move to Done step
    }, 2000);
  };

  // Validators for continuing
  const canGoToStep2 = bookingData.service !== '';
  const canGoToStep3 = bookingData.date !== '' && bookingData.time !== '';
  const canGoToStep4 = bookingData.name.trim() !== '' && bookingData.phone.length >= 10;

  // Render Steps
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
            className="step-content"
          >
            <h2 className="heading-md mb-6 text-center">اختر نوع الخدمة التي تناسبك</h2>
            <div className="service-cards">
              <div 
                className={`service-card ${bookingData.service === 'dining' ? 'active' : ''}`}
                onClick={() => handleServiceSelect('dining')}
              >
                <FaUtensils className="service-icon" />
                <h3>طاولة غداء/عشاء</h3>
                <p>استمتع بوجبة مميزة في صالة المطعم الرئيسية بأجواء رائعة.</p>
              </div>
              <div 
                className={`service-card ${bookingData.service === 'vip' ? 'active' : ''}`}
                onClick={() => handleServiceSelect('vip')}
              >
                <FaCrown className="service-icon text-gold" />
                <h3>غرفة VIP خاصة</h3>
                <p>مساحة خاصة لك ولعائلتك لخصوصية وراحة تامة (تتطلب حداً أدنى للطلب).</p>
              </div>
              <div 
                className={`service-card ${bookingData.service === 'party' ? 'active' : ''}`}
                onClick={() => handleServiceSelect('party')}
              >
                <FaBirthdayCake className="service-icon text-red" />
                <h3>حفلات وأعياد ميلاد</h3>
                <p>تجهيزات خاصة لمناسباتكم السعيدة مع ترتيبات حسب الرغبة.</p>
              </div>
            </div>
            
            <div className="step-actions mt-8">
              <div></div> {/* Empty div for flex space-between */}
              <button className="btn btn-primary" onClick={nextStep} disabled={!canGoToStep2}>
                التالي <FaChevronLeft className="mr-2" />
              </button>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
            className="step-content form-container mx-auto max-w-lg"
          >
            <h2 className="heading-md mb-6 text-center">متى تود زيارتنا؟</h2>
            <div className="form-group mb-4">
              <label><FaCalendarAlt className="text-gold ml-2" /> التاريخ</label>
              <input 
                type="date" 
                name="date" 
                className="form-control" 
                value={bookingData.date} 
                onChange={handleInputChange} 
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className="form-group mb-4">
              <label><FaClock className="text-gold ml-2" /> الوقت</label>
              <input 
                type="time" 
                name="time" 
                className="form-control" 
                value={bookingData.time} 
                onChange={handleInputChange} 
              />
            </div>
            <div className="form-group mb-6">
              <label><FaUserFriends className="text-gold ml-2" /> عدد الأشخاص</label>
              <select name="guests" className="form-control" value={bookingData.guests} onChange={handleInputChange}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'أكثر من 10'].map(num => (
                  <option key={num} value={num}>{num} {typeof num === 'number' ? (num === 1 ? 'شخص' : num === 2 ? 'شخصين' : 'أشخاص') : ''}</option>
                ))}
              </select>
            </div>

            <div className="step-actions">
              <button className="btn btn-outline" onClick={prevStep}>
                <FaChevronRight className="ml-2" /> السابق 
              </button>
              <button className="btn btn-primary" onClick={nextStep} disabled={!canGoToStep3}>
                التالي <FaChevronLeft className="mr-2" />
              </button>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div 
            key="step3"
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
            className="step-content form-container mx-auto max-w-lg"
          >
            <h2 className="heading-md mb-6 text-center">أدخل بياناتك لتأكيد الحجز</h2>
            <div className="form-group mb-4">
              <label><FaUser className="text-gold ml-2" /> الاسم بالكامل</label>
              <input 
                type="text" 
                name="name" 
                className="form-control" 
                placeholder="اسمك الثلاثي"
                value={bookingData.name} 
                onChange={handleInputChange} 
              />
            </div>
            <div className="form-group mb-4">
              <label><FaPhoneAlt className="text-gold ml-2" /> رقم الهاتف</label>
              <input 
                type="tel" 
                name="phone" 
                className="form-control text-left" 
                placeholder="01xxxxxxxxx"
                dir="ltr"
                value={bookingData.phone} 
                onChange={handleInputChange} 
              />
            </div>
            <div className="form-group mb-6">
              <label><FaStickyNote className="text-gold ml-2" /> ملاحظات إضافية (اختياري)</label>
              <textarea 
                name="notes" 
                className="form-control" 
                rows={3} 
                placeholder="هل يوجد أطفال؟ هل تحتاج كرسياً متحركاً؟"
                value={bookingData.notes} 
                onChange={handleInputChange} 
              ></textarea>
            </div>

            <div className="step-actions">
              <button className="btn btn-outline" onClick={prevStep}>
                <FaChevronRight className="ml-2" /> السابق 
              </button>
              <button className="btn btn-primary" onClick={nextStep} disabled={!canGoToStep4}>
                التالي <FaChevronLeft className="mr-2" />
              </button>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div 
            key="step4"
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
            className="step-content summary-container mx-auto max-w-lg"
          >
            <h2 className="heading-md mb-6 text-center">مراجعة الحجز والدفع</h2>
            
            <div className="booking-summary-card mb-6">
              <h3 className="text-gold mb-3 font-bold border-b pb-2">تفاصيل حجزك</h3>
              <div className="summary-details">
                <p><strong>الخدمة:</strong> {bookingData.service === 'vip' ? 'غرفة VIP' : bookingData.service === 'party' ? 'حفلة/مناسبة' : 'طاولة طعام'}</p>
                <p><strong>التاريخ والوقت:</strong> {bookingData.date} | {bookingData.time}</p>
                <p><strong>عدد الأشخاص:</strong> {bookingData.guests}</p>
                <p><strong>الاسم:</strong> {bookingData.name}</p>
                <p><strong>الهاتف:</strong> <span dir="ltr">{bookingData.phone}</span></p>
              </div>
            </div>

            <h3 className="font-bold mb-3">طريقة الدفع (رسوم الحجز إن وجدت):</h3>
            <div className="payment-methods mb-8">
              <label className={`payment-method ${bookingData.paymentMethod === 'cash' ? 'active' : ''}`}>
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="cash" 
                  checked={bookingData.paymentMethod === 'cash'} 
                  onChange={handleInputChange} 
                  className="hidden-radio"
                />
                <FaMoneyBillWave className="payment-icon text-green" />
                <span>دفع عند الحضور</span>
              </label>
              <label className={`payment-method ${bookingData.paymentMethod === 'card' ? 'active' : ''}`}>
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="card" 
                  checked={bookingData.paymentMethod === 'card'} 
                  onChange={handleInputChange} 
                  className="hidden-radio"
                />
                <FaCreditCard className="payment-icon text-blue" />
                <span>بطاقة ائتمان (أونلاين)</span>
              </label>
            </div>

            <div className="step-actions">
              <button className="btn btn-outline" onClick={prevStep} disabled={isSubmitting}>
                <FaChevronRight className="ml-2" /> السابق 
              </button>
              <button 
                className={`btn btn-primary ${isSubmitting ? 'loading' : ''}`} 
                onClick={confirmBooking} 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'جاري التأكيد...' : 'تأكيد الحجز النهائي'}
              </button>
            </div>
          </motion.div>
        );

      case 5:
        return (
          <motion.div 
            key="step5"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="step-content success-content text-center mx-auto max-w-lg"
          >
            <div className="success-icon-wrapper mb-6">
              <FaCheckCircle className="text-gold" style={{ fontSize: '5rem' }} />
            </div>
            <h2 className="heading-lg mb-4 text-gold">تم حجز طاولتك بنجاح!</h2>
            <p className="text-secondary mb-2" style={{ fontSize: '1.2rem' }}>مرحباً بك يا <strong>{bookingData.name}</strong> في مطعم الدهان.</p>
            <p className="text-secondary mb-6">رقم الحجز الخاص بك هو: <strong className="text-primary font-bold" dir="ltr">#EL{Math.floor(Math.random() * 90000) + 10000}</strong></p>
            
            <div className="info-box mb-8 text-right p-4 rounded-lg" style={{ background: 'rgba(201,160,80,0.1)', border: '1px solid rgba(201,160,80,0.3)' }}>
              <p className="mb-2"><strong>يوم:</strong> {bookingData.date}</p>
              <p className="mb-2"><strong>الساعة:</strong> {bookingData.time}</p>
              <p className="mb-0 text-sm text-secondary">رقم الهاتف المسجل: <span dir="ltr">{bookingData.phone}</span></p>
            </div>

            <Link to="/" className="btn btn-primary btn-lg w-full">العودة للرئيسية</Link>
          </motion.div>
        );
      
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="page-container"
    >
      <div className="booking-header-hero">
        <div className="container">
          <h1 className="heading-xl">حجز <span className="text-gold">موعد</span></h1>
          <p className="text-secondary mt-3">خطوات بسيطة لتضمن مكانك في أصل المشويات</p>
        </div>
      </div>

      <div className="container section-padding">
        
        {/* Stepper UI (Hide if completed) */}
        {currentStep < 5 && (
          <div className="stepper-wrapper mb-12">
            {STEPS.map((step, index) => {
              const stepNumber = index + 1;
              const isActive = currentStep === stepNumber;
              const isCompleted = currentStep > stepNumber;

              return (
                <div key={index} className={`stepper-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
                  <div className="step-circle">
                    {isCompleted ? <FaCheckCircle /> : stepNumber}
                  </div>
                  <div className="step-label">{step}</div>
                  {index < STEPS.length - 1 && <div className="step-line"></div>}
                </div>
              );
            })}
          </div>
        )}

        {/* Content Box */}
        <div className="booking-card">
          <AnimatePresence mode="wait">
            {renderStepContent()}
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        .page-container {
          padding-top: var(--nav-height);
          min-height: 80vh;
        }

        .booking-header-hero {
          padding: 80px 20px 40px;
          text-align: center;
          background-color: var(--bg-dark);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        /* Helpers */
        .mb-2 { margin-bottom: 8px; }
        .mb-3 { margin-bottom: 12px; }
        .mb-4 { margin-bottom: 16px; }
        .mb-6 { margin-bottom: 24px; }
        .mb-8 { margin-bottom: 32px; }
        .mb-12 { margin-bottom: 48px; }
        .mt-3 { margin-top: 12px; }
        .mt-8 { margin-top: 32px; }
        .ml-2 { margin-left: 8px; }
        .mr-2 { margin-right: 8px; }
        .mx-auto { margin-right: auto; margin-left: auto; }
        .max-w-lg { max-width: 600px; }
        .w-full { width: 100%; display: block; text-align: center; }
        .text-center { text-align: center; }
        .text-right { text-align: right; }
        .font-bold { font-weight: 700; }
        .border-b { border-bottom: 1px solid rgba(255,255,255,0.1); }
        .pb-2 { padding-bottom: 8px; }
        .text-green { color: #2ecc71; }
        .text-blue { color: #3498db; }
        .text-red { color: #e74c3c; }

        /* Stepper */
        .stepper-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
          position: relative;
        }

        .stepper-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          flex: 1;
          position: relative;
          z-index: 2;
        }

        .step-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--bg-card);
          border: 2px solid rgba(255,255,255,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          color: var(--text-secondary);
          transition: all 0.3s ease;
          font-size: 1.1rem;
        }

        .stepper-item.completed .step-circle {
          background: var(--gold-primary);
          border-color: var(--gold-primary);
          color: #fff;
        }

        .stepper-item.active .step-circle {
          border-color: var(--gold-primary);
          color: var(--gold-primary);
          box-shadow: 0 0 15px rgba(201,160,80,0.3);
        }

        .step-label {
          font-size: 0.95rem;
          color: var(--text-secondary);
          font-weight: 600;
          text-align: center;
        }

        .stepper-item.active .step-label,
        .stepper-item.completed .step-label {
          color: var(--text-primary);
        }

        .step-line {
          position: absolute;
          top: 20px; /* half of circle height */
          left: 50%;
          width: 100%;
          height: 2px;
          background: rgba(255,255,255,0.1);
          z-index: -1;
        }

        .stepper-item.completed .step-line {
          background: var(--gold-primary);
        }

        [dir="rtl"] .step-line {
          right: 50%;
          left: auto;
        }

        .stepper-item:last-child .step-line {
          display: none;
        }

        /* Booking Main Card */
        .booking-card {
          background: var(--bg-card);
          border-radius: var(--border-radius-lg);
          padding: 50px;
          border: 1px solid rgba(255,255,255,0.05);
          box-shadow: 0 15px 40px rgba(0,0,0,0.15);
          min-height: 400px;
          display: flex;
          flex-direction: column;
        }

        .step-content {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        /* Step 1: Services */
        .service-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 24px;
        }

        .service-card {
          background: rgba(255,255,255,0.02);
          border: 2px solid rgba(255,255,255,0.05);
          border-radius: 16px;
          padding: 30px 20px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .service-card:hover {
          border-color: rgba(201,160,80,0.4);
          transform: translateY(-5px);
        }

        .service-card.active {
          border-color: var(--gold-primary);
          background: rgba(201,160,80,0.08);
        }

        .service-icon {
          font-size: 3rem;
          color: var(--text-secondary);
          margin-bottom: 20px;
          transition: color 0.3s ease;
        }

        .service-card.active .service-icon {
          color: var(--gold-primary);
        }

        .service-card h3 {
          font-size: 1.3rem;
          margin-bottom: 12px;
          color: var(--text-primary);
        }

        .service-card p {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.5;
        }

        /* Step Form Elements */
        .form-group label {
          display: block;
          margin-bottom: 10px;
          font-weight: 600;
        }

        .form-control {
          width: 100%;
          padding: 14px 16px;
          background: rgba(0,0,0,0.05);
          border: 1px solid rgba(0,0,0,0.1);
          border-radius: 8px;
          color: var(--text-primary);
          font-family: inherit;
          font-size: 1.05rem;
        }
        
        .form-control:focus {
          border-color: var(--gold-primary);
          outline: none;
          box-shadow: 0 0 0 2px rgba(201,160,80,0.2);
        }

        /* Step 4: Payments */
        .summary-details p {
          margin-bottom: 10px;
          font-size: 1.05rem;
          color: var(--text-secondary);
        }
        .summary-details strong {
          color: var(--text-primary);
          display: inline-block;
          min-width: 100px;
        }

        .payment-methods {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .payment-method {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 20px;
          border: 2px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          background: rgba(255,255,255,0.02);
        }

        .payment-method:hover {
          border-color: rgba(201,160,80,0.3);
        }

        .payment-method.active {
          border-color: var(--gold-primary);
          background: rgba(201,160,80,0.05);
        }

        .payment-icon {
          font-size: 1.5rem;
        }

        .hidden-radio {
          display: none;
        }

        /* Shared Step Actions */
        .step-actions {
          display: flex;
          justify-content: space-between;
          margin-top: auto; /* Push to bottom */
          padding-top: 24px;
        }

        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Mobile Adjustments */
        @media (max-width: 768px) {
          .booking-card {
            padding: 30px 20px;
          }
          .step-label {
            display: none; /* Hide text on very small screens to save space */
          }
        }
      `}</style>
    </motion.div>
  );
};

export default Booking;
