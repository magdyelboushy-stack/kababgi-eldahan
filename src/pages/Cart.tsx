import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        style={{ padding: '120px 20px 80px', textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
        className="container"
      >
        <h1 className="heading-lg text-gold mb-4">سلة المشتريات</h1>
        <p className="text-secondary mb-8" style={{ fontSize: '1.2rem' }}>عربة التسوق فارغة حالياً</p>
        <Link to="/menu" className="btn btn-primary btn-lg">العودة لللمنيو</Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="page-container"
    >
      <div className="cart-header">
        <div className="container">
          <h1 className="heading-xl">سلة <span className="text-gold">المشتريات</span></h1>
        </div>
      </div>

      <div className="container section-padding">
        <div className="cart-layout">
          <div className="cart-items-container">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-item-details">
                  <div className="cart-item-header">
                    <h3 className="cart-item-title">{item.name}</h3>
                    <button onClick={() => removeFromCart(item.id)} className="remove-btn">
                      <FaTrash />
                    </button>
                  </div>
                  <div className="cart-item-footer">
                    <span className="cart-item-price">{item.price} ج.م</span>
                    <div className="quantity-controls">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="qty-btn" disabled={item.quantity <= 1}>
                        <FaMinus />
                      </button>
                      <span className="qty-value">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="qty-btn">
                        <FaPlus />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3 className="summary-title">ملخص الطلب</h3>
            <div className="summary-row">
              <span>المجموع الفرعي</span>
              <span>{cartTotal} ج.م</span>
            </div>
            <div className="summary-row">
              <span>التوصيل</span>
              <span className="text-gold">يحدد لاحقاً</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-row total-row">
              <span>الإجمالي</span>
              <span>{cartTotal} ج.م</span>
            </div>
            
            <button 
              className="btn btn-primary w-100 checkout-btn"
              onClick={() => navigate('/checkout')}
            >
              اكمل الاوردر
            </button>
            <button 
              className="btn btn-outline w-100 mt-3"
              onClick={clearCart}
            >
              تفريغ السلة
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .page-container {
          min-height: 80vh;
        }
        .cart-header {
          padding: 60px 20px 40px;
          text-align: center;
          background-color: var(--bg-dark);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        .mb-4 { margin-bottom: 24px; }
        .mb-8 { margin-bottom: 48px; }
        .mt-3 { margin-top: 16px; }
        .w-100 { width: 100%; }

        .cart-layout {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 40px;
          align-items: start;
        }

        .cart-items-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .cart-item {
          display: flex;
          background: var(--bg-card);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: var(--border-radius-lg);
          padding: 20px;
          gap: 24px;
          transition: transform 0.3s ease;
        }

        .cart-item:hover {
          border-color: rgba(201, 160, 80, 0.2);
        }

        .cart-item-image {
          width: 120px;
          height: 120px;
          border-radius: 8px;
          overflow: hidden;
          flex-shrink: 0;
        }

        .cart-item-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .cart-item-details {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .cart-item-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .cart-item-title {
          font-size: 1.3rem;
          margin: 0;
          color: var(--text-primary);
        }

        .remove-btn {
          color: var(--red-accent);
          background: transparent;
          border: none;
          padding: 8px;
          font-size: 1.1rem;
          cursor: pointer;
          transition: opacity 0.3s ease;
        }
        
        .remove-btn:hover {
          opacity: 0.8;
        }

        .cart-item-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 16px;
        }

        .cart-item-price {
          font-weight: 800;
          color: var(--gold-primary);
          font-size: 1.2rem;
        }

        .quantity-controls {
          display: flex;
          align-items: center;
          gap: 16px;
          background: rgba(0,0,0,0.2);
          padding: 6px 12px;
          border-radius: 30px;
          border: 1px solid rgba(255,255,255,0.05);
        }

        .qty-btn {
          background: transparent;
          border: none;
          color: var(--text-primary);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          transition: background 0.3s ease;
        }

        .qty-btn:hover:not(:disabled) {
          background: rgba(201, 160, 80, 0.2);
          color: var(--gold-primary);
        }

        .qty-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .qty-value {
          font-weight: 700;
          min-width: 20px;
          text-align: center;
        }

        .cart-summary {
          background: var(--bg-card);
          padding: 30px;
          border-radius: var(--border-radius-lg);
          border: 1px solid rgba(255,255,255,0.05);
          position: sticky;
          top: calc(var(--nav-height) + 40px);
        }

        .summary-title {
          font-size: 1.4rem;
          margin-bottom: 24px;
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
          margin-bottom: 30px;
        }

        .checkout-btn {
          padding: 16px;
          font-size: 1.15rem;
          border-radius: 8px;
        }

        @media (max-width: 968px) {
          .cart-layout {
            grid-template-columns: 1fr;
          }
          .cart-summary {
            position: static;
          }
        }

        @media (max-width: 576px) {
          .cart-item {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          .cart-item-image {
            width: 100%;
            height: 200px;
          }
          .cart-item-header {
            flex-direction: column;
            align-items: center;
            gap: 12px;
          }
          .cart-item-footer {
            flex-direction: column;
            gap: 20px;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default Cart;
