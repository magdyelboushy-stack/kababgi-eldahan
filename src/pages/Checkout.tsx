import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { FaTruck, FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    governorate: '',
    city: '',
    address: '',
    notes: ''
  });
  
  const [orderType, setOrderType] = useState('delivery'); // Default to delivery
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      clearCart();
    }, 1500);
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="container success-container"
      >
        <FaCheckCircle className="success-icon text-gold" />
        <h1 className="heading-xl mb-4">تم تأكيد طلبك بنجاح!</h1>
        <p className="text-secondary mb-8">
          شكراً لطلبك من أولاد الدهان. سنتواصل معك قريباً لتأكيد الطلب.
        </p>
        <button className="btn btn-primary btn-lg" onClick={() => navigate('/')}>
          العودة للرئيسية
        </button>
      </motion.div>
    );
  }

  // Redirect if cart is empty and not on success page
  if (cartItems.length === 0 && !isSuccess) {
    navigate('/cart');
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="page-container"
    >
      <div className="checkout-header">
        <div className="container">
          <h1 className="heading-xl">إتمام <span className="text-gold">الطلب</span></h1>
        </div>
      </div>

      <div className="container section-padding">
        <div className="checkout-layout">
          
          <div className="checkout-form-container">
            <h2 className="section-title mb-4">تفاصيل الطلب</h2>
            
            <div className="order-type-selector mb-8">
              <button 
                className={`type-btn ${orderType === 'delivery' ? 'active' : ''}`}
                onClick={() => setOrderType('delivery')}
              >
                <FaTruck /> التوصيل
              </button>
              <button 
                className={`type-btn ${orderType === 'pickup' ? 'active' : ''}`}
                onClick={() => setOrderType('pickup')}
              >
                <FaMapMarkerAlt /> استلام من الفرع
              </button>
            </div>

            <form onSubmit={handleSubmit} className="checkout-form">
              <div className="form-group">
                <label htmlFor="name">الاسم بالكامل <span className="text-red">*</span></label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  className="form-control" 
                  value={formData.name}
                  onChange={handleInputChange}
                  required 
                  placeholder="أدخل اسمك"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">رقم الهاتف <span className="text-red">*</span></label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  className="form-control" 
                  value={formData.phone}
                  onChange={handleInputChange}
                  required 
                  placeholder="11 رقم"
                  dir="ltr"
                />
              </div>

              {orderType === 'delivery' && (
                <>
                  <div className="form-group-row">
                    <div className="form-group full-width">
                      <label htmlFor="governorate">المحافظة <span className="text-red">*</span></label>
                      <select 
                        id="governorate"
                        name="governorate"
                        className="form-control"
                        value={formData.governorate}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">اختر المحافظة</option>
                        <option value="cairo">القاهرة</option>
                        <option value="giza">الجيزة</option>
                        <option value="qalyubia">القليوبية</option>
                      </select>
                    </div>
                    <div className="form-group full-width">
                      <label htmlFor="city">المدينة / المنطقة <span className="text-red">*</span></label>
                      <input 
                        type="text" 
                        id="city" 
                        name="city" 
                        className="form-control" 
                        value={formData.city}
                        onChange={handleInputChange}
                        required 
                        placeholder="مثل: الحوامدية"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">باقي تفاصيل العنوان <span className="text-red">*</span></label>
                    <textarea 
                      id="address" 
                      name="address" 
                      className="form-control" 
                      rows={2}
                      value={formData.address}
                      onChange={handleInputChange}
                      required 
                      placeholder="الشارع، المجاورة، رقم العمارة، رقم الشقة"
                    ></textarea>
                  </div>
                </>
              )}

              <div className="form-group">
                <label htmlFor="notes">ملاحظات إضافية (اختياري)</label>
                <textarea 
                  id="notes" 
                  name="notes" 
                  className="form-control" 
                  rows={2}
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="أي تعليمات خاصة بالطلب..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                className={`btn btn-primary btn-lg w-100 mt-4 submit-btn ${isSubmitting ? 'loading' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'جاري تأكيد الطلب...' : 'تأكيد الطلب'}
              </button>
            </form>
          </div>

          <div className="order-summary-container">
            <div className="cart-summary sticky-sidebar">
              <h3 className="summary-title">فاتورة الطلب</h3>
              
              <div className="order-items-list mb-4">
                {cartItems.map(item => (
                  <div key={item.id} className="order-item-mini">
                    <span className="qty text-gold">{item.quantity}x</span>
                    <span className="name">{item.name}</span>
                    <span className="price">{item.price * item.quantity} ج.م</span>
                  </div>
                ))}
              </div>

              <div className="summary-divider"></div>

              <div className="summary-row">
                <span>المجموع الفرعي</span>
                <span>{cartTotal} ج.م</span>
              </div>
              <div className="summary-row">
                <span>التوصيل</span>
                <span className="text-gold">{orderType === 'delivery' ? 'يحدد لاحقاً' : 'مجاني'}</span>
              </div>
              
              <div className="summary-divider"></div>
              
              <div className="summary-row total-row">
                <span>الإجمالي المتوقع</span>
                <span>{cartTotal} ج.م</span>
              </div>
              
              <div className="payment-info mt-4">
                <p className="text-secondary text-center text-sm">
                  الدفع نقداً عند الاستلام
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .page-container {
          min-height: 80vh;
        }
        .checkout-header {
          padding: 60px 20px 40px;
          text-align: center;
          background-color: var(--bg-dark);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .success-container {
          padding: 120px 20px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 70vh;
        }
        
        .success-icon {
          font-size: 5rem;
          margin-bottom: 24px;
        }

        .checkout-layout {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 60px;
          align-items: start;
        }

        .checkout-form-container {
          background: var(--bg-card);
          padding: 40px;
          border-radius: var(--border-radius-lg);
          border: 1px solid rgba(255,255,255,0.05);
        }

        .section-title {
          font-size: 1.5rem;
          color: var(--text-primary);
        }

        .order-type-selector {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .type-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 16px;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          color: var(--text-secondary);
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .type-btn:hover {
          background: rgba(255,255,255,0.02);
        }

        .type-btn.active {
          background: rgba(201, 160, 80, 0.1);
          border-color: var(--gold-primary);
          color: var(--gold-primary);
        }

        .form-group {
          margin-bottom: 24px;
        }

        .form-group-row {
          display: flex;
          gap: 20px;
          margin-bottom: 24px;
        }

        .form-group.full-width {
          flex: 1;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
          color: var(--text-secondary);
        }

        .text-red {
          color: #ef4444;
        }

        .form-control {
          width: 100%;
          padding: 14px 16px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          color: var(--text-primary);
          font-family: inherit;
          font-size: 1rem;
          transition: border-color 0.3s ease, background 0.3s ease;
        }

        .form-control:focus {
          outline: none;
          border-color: var(--gold-primary);
          background: rgba(0,0,0,0.2);
        }

        .submit-btn {
          position: relative;
        }

        .submit-btn.loading {
          opacity: 0.8;
          cursor: wait;
        }

        /* Summary Sidebar styles similar to cart */
        .sticky-sidebar {
          position: sticky;
          top: calc(var(--nav-height) + 40px);
        }

        .cart-summary {
          background: var(--bg-card);
          padding: 30px;
          border-radius: var(--border-radius-lg);
          border: 1px solid rgba(255,255,255,0.05);
        }

        .summary-title {
          font-size: 1.4rem;
          margin-bottom: 24px;
          color: var(--text-primary);
        }

        .order-items-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          max-height: 250px;
          overflow-y: auto;
          padding-right: 8px;
        }

        .order-item-mini {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.95rem;
        }

        .order-item-mini .qty {
          width: 30px;
          font-weight: 700;
        }

        .order-item-mini .name {
          flex: 1;
          color: var(--text-secondary);
        }

        .order-item-mini .price {
          font-weight: 600;
          color: var(--text-primary);
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 16px;
          color: var(--text-secondary);
          font-size: 1.05rem;
        }

        .summary-divider {
          height: 1px;
          background: rgba(255,255,255,0.1);
          margin: 20px 0;
        }

        .total-row {
          color: var(--text-primary);
          font-size: 1.3rem;
          font-weight: 800;
          margin-bottom: 10px;
        }
        
        .text-sm {
          font-size: 0.9rem;
        }

        .mb-4 { margin-bottom: 24px; }
        .mb-8 { margin-bottom: 48px; }
        .mt-4 { margin-top: 24px; }
        .w-100 { width: 100%; }

        @media (max-width: 968px) {
          .checkout-layout {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          
          .sticky-sidebar {
            position: static;
          }
          
          .checkout-form-container {
            padding: 24px;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default Checkout;
