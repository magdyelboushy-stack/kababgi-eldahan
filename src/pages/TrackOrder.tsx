import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaGift, FaCheckCircle, FaStar, FaBoxOpen, FaMotorcycle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const TrackOrder = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [orderFound, setOrderFound] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchValue.trim()) return;

    setIsSearching(true);
    // Simulate finding an order after 1.5s
    setTimeout(() => {
      setIsSearching(false);
      setOrderFound(true);
    }, 1500);
  };

  const currentStep = 2; // 0: under review, 1: preparing, 2: out for delivery, 3: delivered
  const steps = [
    { title: 'تم الاستلام', icon: <FaCheckCircle /> },
    { title: 'جاري التجهيز', icon: <FaBoxOpen /> },
    { title: 'في الطريق إليك', icon: <FaMotorcycle /> },
    { title: 'تم التوصيل', icon: <FaStar /> },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="page-container"
    >
      <div className="track-header">
        <div className="container">
          <h1 className="heading-xl">تتبع <span className="text-gold">طلبك</span></h1>
          <p className="text-secondary mt-3">تابع حالة طلبك خطوة بخطوة حتى يصل إليك ساخناً</p>
        </div>
      </div>

      <div className="container section-padding">
        
        {/* Rewards Hook Section (Always Visible) */}
        <div className="rewards-banner mb-8">
          <div className="rewards-content">
            <div className="rewards-icon-wrapper">
              <FaGift className="rewards-icon" />
            </div>
            <div className="rewards-text">
              <h3 className="rewards-title">اطلب أونلاين وجمّع نقاط!</h3>
              <p>هل تعلم أن طلبات الموقع تمنحك <span className="text-gold font-bold">نقاط إضافية</span>؟ كل 10 جنيهات = بنقطة واحدة. جمّع 500 نقطة واحصل على وجبة ميكس جريل مجاناً! لا تفوت الفرصة واطلب من الموقع مباشرة.</p>
              <Link to="/menu" className="btn btn-outline btn-sm mt-3">اطلب الآن</Link>
            </div>
          </div>
        </div>

        <div className="track-card">
          {!orderFound ? (
            <div className="search-order-section">
              <h2 className="heading-md mb-4 text-center">أدخل كود الطلب أو رقم الهاتف</h2>
              <form onSubmit={handleSearch} className="track-form">
                <input 
                  type="text" 
                  className="form-control track-input"
                  placeholder="رقم الهاتف أو الكود مثلاً: #12345"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  dir="ltr"
                />
                <button 
                  type="submit" 
                  className={`btn btn-primary track-submit ${isSearching ? 'loading' : ''}`}
                  disabled={isSearching}
                >
                  {isSearching ? 'جاري البحث...' : <><FaSearch /> تتبع</>}
                </button>
              </form>
            </div>
          ) : (
            <AnimatePresence>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="order-status-container"
              >
                <div className="order-details-header">
                  <div>
                    <h3 className="heading-md">طلب رقم: #45892</h3>
                    <span className="text-secondary">تاريخ الطلب: اليوم، 05:30 مساءً</span>
                  </div>
                  <div className="earned-points-badge">
                    <FaStar className="text-gold" />
                    <span>كسبت <strong className="text-gold">45 نقطة</strong></span>
                  </div>
                </div>

                <div className="tracking-stepper">
                  {steps.map((step, index) => (
                    <div 
                      key={index} 
                      className={`stepper-item ${index <= currentStep ? 'active' : ''} ${index === currentStep ? 'current' : ''}`}
                    >
                      <div className="stepper-icon">{step.icon}</div>
                      <div className="stepper-title">{step.title}</div>
                      {index < steps.length - 1 && <div className="stepper-line"></div>}
                    </div>
                  ))}
                </div>

                <div className="delivery-info">
                  <h4 className="font-bold mb-3">تفاصيل التوصيل:</h4>
                  <p><strong>العنوان:</strong> الحوامدية، موقف السهران.</p>
                  <p><strong>الوقت المتوقع للاستلام:</strong> خلال 15 دقيقة</p>
                </div>

                <div className="text-center mt-6">
                  <button className="btn btn-outline" onClick={() => setOrderFound(false)}>
                    تتبع طلب آخر
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>

      <style>{`
        .page-container {
          min-height: 80vh;
        }

        .track-header {
          padding: 80px 20px 40px;
          text-align: center;
          background-color: var(--bg-dark);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .mb-4 { margin-bottom: 24px; }
        .mb-8 { margin-bottom: 48px; }
        .mt-3 { margin-top: 16px; }
        .mt-6 { margin-top: 32px; }
        .font-bold { font-weight: 700; }

        /* Rewards Banner */
        .rewards-banner {
          background: linear-gradient(135deg, rgba(201, 160, 80, 0.15) 0%, rgba(201, 160, 80, 0.05) 100%);
          border: 1px solid rgba(201, 160, 80, 0.3);
          border-radius: var(--border-radius-lg);
          padding: 30px;
          position: relative;
          overflow: hidden;
        }

        .rewards-banner::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 100%;
          background: var(--gold-primary);
        }

        .rewards-content {
          display: flex;
          align-items: flex-start;
          gap: 24px;
        }

        .rewards-icon-wrapper {
          background: rgba(201, 160, 80, 0.2);
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .rewards-icon {
          font-size: 1.8rem;
          color: var(--gold-primary);
        }

        .rewards-title {
          font-size: 1.3rem;
          color: var(--gold-primary);
          margin-bottom: 12px;
          font-weight: 800;
        }

        .rewards-text p {
          color: var(--text-secondary);
          line-height: 1.6;
          font-size: 1.05rem;
        }

        .btn-sm {
          padding: 8px 16px;
          font-size: 0.95rem;
        }

        /* Tracking Card */
        .track-card {
          background: var(--bg-card);
          padding: 50px;
          border-radius: var(--border-radius-lg);
          border: 1px solid rgba(255, 255, 255, 0.05);
          max-width: 800px;
          margin: 0 auto;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        .track-form {
          display: flex;
          gap: 16px;
          max-width: 500px;
          margin: 0 auto;
        }

        .track-input {
          flex: 1;
          padding: 16px 20px;
          font-size: 1.1rem;
          text-align: center;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          color: var(--text-primary);
        }

        .track-input:focus {
          outline: none;
          border-color: var(--gold-primary);
        }

        .track-submit {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0 32px;
          font-size: 1.1rem;
          border-radius: 8px;
          white-space: nowrap;
        }

        /* Order Details */
        .order-details-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
          padding-bottom: 20px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .earned-points-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(201, 160, 80, 0.1);
          padding: 10px 16px;
          border-radius: 30px;
          border: 1px solid rgba(201, 160, 80, 0.2);
          font-weight: 600;
        }

        /* Stepper */
        .tracking-stepper {
          display: flex;
          justify-content: space-between;
          margin-bottom: 50px;
          position: relative;
        }

        .stepper-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          position: relative;
          z-index: 2;
          width: 25%;
        }

        .stepper-icon {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: var(--bg-dark);
          border: 2px solid rgba(255,255,255,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3rem;
          color: var(--text-secondary);
          transition: all 0.4s ease;
        }

        .stepper-item.active .stepper-icon {
          background: var(--gold-primary);
          border-color: var(--gold-primary);
          color: var(--bg-darker);
          box-shadow: 0 0 15px rgba(201, 160, 80, 0.4);
        }

        .stepper-item.current .stepper-icon {
          animation: pulse 2s infinite;
        }

        .stepper-title {
          font-weight: 600;
          color: var(--text-secondary);
          font-size: 1rem;
          text-align: center;
        }

        .stepper-item.active .stepper-title {
          color: var(--text-primary);
        }

        .stepper-line {
          position: absolute;
          top: 25px;
          left: 50%;
          width: 100%;
          height: 3px;
          background: rgba(255,255,255,0.1);
          z-index: -1;
        }

        .stepper-item.active .stepper-line {
          background: var(--gold-primary);
        }
        
        /* The last item shouldn't have a line passing it, though the structural flex handles most of it, we target the pseudo or internal div */
        .stepper-item:last-child .stepper-line {
          display: none;
        }

        /* Adjust lines for RTL: In RTL, the line should go to the left, which is technically negative or right-aligned */
        [dir="rtl"] .stepper-line {
           right: 50%;
           left: auto;
        }

        .delivery-info {
          background: rgba(255,255,255,0.02);
          padding: 24px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.05);
        }

        .delivery-info p {
          margin-bottom: 8px;
          color: var(--text-secondary);
        }

        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(201, 160, 80, 0.4); }
          70% { box-shadow: 0 0 0 15px rgba(201, 160, 80, 0); }
          100% { box-shadow: 0 0 0 0 rgba(201, 160, 80, 0); }
        }

        @media (max-width: 768px) {
          .track-form {
            flex-direction: column;
          }
          .rewards-content {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          .tracking-stepper {
            flex-direction: column;
            align-items: flex-start;
            gap: 30px;
          }
          .stepper-item {
            flex-direction: row;
            width: 100%;
          }
          .stepper-line {
            width: 3px;
            height: 100%;
            top: 25px;
            right: 23px; /* align with center of 50px icon */
            left: auto;
          }
          .order-details-header {
            flex-direction: column;
            gap: 16px;
            align-items: flex-start;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default TrackOrder;
