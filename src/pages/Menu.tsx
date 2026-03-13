import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFire, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

import { menuCategories, menuItems } from '../data/menuData';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const { addToCart } = useCart();
  const [addingId, setAddingId] = useState<number | null>(null);

  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  const handleAddToCart = (item: any) => {
    setAddingId(item.id);
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category
    });
    setTimeout(() => setAddingId(null), 600);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="menu-page-wrapper"
    >
      {/* Premium Hero Section */}
      <section className="premium-menu-hero">
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <motion.h1 
            className="hero-title"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            قائمة <span className="text-gold">الطعام</span>
          </motion.h1>
          <motion.p 
            className="hero-subtitle"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            تذوق عراقة الماضي وأصالة الحاضر في كل قضمة من أطباقنا
          </motion.p>
        </div>
      </section>

      <div className="container section-padding menu-main-section">
        
        {/* Sleek Pill Categories */}
        <div className="categories-wrapper">
          <div className="categories-pill-container">
            {menuCategories.map(category => (
              <button
                key={category.id}
                className={`pill-btn ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
                {activeCategory === category.id && (
                  <motion.div 
                    layoutId="activeCategory" 
                    className="active-pill-background" 
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Stunning Menu Grid */}
        <motion.div layout className="premium-menu-grid">
          <AnimatePresence mode='popLayout'>
            {filteredItems.map(item => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.4 }}
                className="premium-menu-card"
              >
                <div className="card-image-box">
                  {item.popular && (
                    <div className="premium-badge">
                      <FaFire className="fire-icon" /> الأكثر طلباً
                    </div>
                  )}
                  <Link to={`/menu/${item.id}`} style={{ display: 'block', height: '100%' }}>
                    <img src={item.image} alt={item.name} className="food-img" loading="lazy" />
                  </Link>
                  <div className="img-gradient"></div>
                  
                  {/* Floating Price Tag */}
                  <div className="price-tag">
                    <span className="currency">ج.م</span>
                    <span className="amount">{item.price}</span>
                  </div>
                </div>

                <div className="card-content-box">
                  <Link to={`/menu/${item.id}`} style={{ textDecoration: 'none' }}>
                    <h3 className="food-title">{item.name}</h3>
                  </Link>
                  <p className="food-desc">{item.desc}</p>
                  
                  <div className="card-actions">
                    <span className="food-calories">{item.calories}</span>
                    <button 
                      className={`action-btn ${addingId === item.id ? 'added' : ''}`}
                      onClick={() => handleAddToCart(item)}
                    >
                      <span className="btn-text">
                        {addingId === item.id ? 'تمت الإضافة' : 'إضافة للسلة'}
                      </span>
                      <FaShoppingCart className="cart-icon" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <style>{`
        /* --- Premium Hero Section --- */
        .premium-menu-hero {
          position: relative;
          height: 55vh;
          min-height: 400px;
          background-image: url('https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80');
          background-size: cover;
          background-position: center;
          background-attachment: fixed; /* Parallax */
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          margin-top: calc(-1 * var(--nav-height));
          padding-top: var(--nav-height);
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(14,14,14,0.7) 0%, rgba(14,14,14,0.95) 100%);
        }

        .hero-content {
          position: relative;
          z-index: 10;
        }

        .hero-title {
          font-size: 4rem;
          font-weight: 900;
          color: #fff;
          margin-bottom: 16px;
          text-shadow: 0 4px 20px rgba(0,0,0,0.5);
        }

        .hero-subtitle {
          font-size: 1.3rem;
          color: #ccc;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* --- Main Section & Layout --- */
        .menu-main-section {
          background-color: var(--bg-darker);
          margin-top: -40px;
          position: relative;
          z-index: 20;
          border-radius: 40px 40px 0 0;
          padding-top: 60px;
          padding-bottom: 100px;
        }

        /* --- Sleek Categories Pill --- */
        .categories-wrapper {
          display: flex;
          justify-content: center;
          margin-bottom: 60px;
        }

        .categories-pill-container {
          display: inline-flex;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          padding: 8px;
          border-radius: 50px;
          gap: 4px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          backdrop-filter: blur(10px);
        }

        .pill-btn {
          position: relative;
          padding: 12px 32px;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-size: 1.1rem;
          font-weight: 700;
          border-radius: 40px;
          cursor: pointer;
          transition: color 0.3s ease;
          z-index: 1;
        }

        .pill-btn:hover {
          color: #fff;
        }

        .pill-btn.active {
          color: var(--bg-darker);
        }

        .active-pill-background {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #f2c94c 0%, #f2994a 100%);
          border-radius: 40px;
          z-index: -1;
          box-shadow: 0 4px 15px rgba(242, 201, 76, 0.4);
        }

        /* --- Premium Menu Grid --- */
        .premium-menu-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
          gap: 40px;
        }

        /* --- Premium Menu Card --- */
        .premium-menu-card {
          background: var(--bg-card);
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.03);
          box-shadow: 0 15px 35px rgba(0,0,0,0.2);
          display: flex;
          flex-direction: column;
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease;
        }

        .premium-menu-card:hover {
          transform: translateY(-12px);
          box-shadow: 0 25px 50px rgba(0,0,0,0.3);
          border-color: rgba(201, 160, 80, 0.2);
        }

        /* Image Box */
        .card-image-box {
          position: relative;
          height: 280px;
          overflow: hidden;
        }

        .food-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s ease;
        }

        .premium-menu-card:hover .food-img {
          transform: scale(1.08);
        }

        .img-gradient {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 50%;
          background: linear-gradient(to top, var(--bg-card) 0%, transparent 100%);
        }

        /* Badges & Tags */
        .premium-badge {
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(14, 14, 14, 0.8);
          backdrop-filter: blur(8px);
          color: #fff;
          padding: 8px 16px;
          border-radius: 30px;
          font-size: 0.85rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 8px;
          z-index: 10;
          border: 1px solid rgba(255,255,255,0.1);
        }

        .fire-icon {
          color: #ff4757;
        }

        .price-tag {
          position: absolute;
          bottom: 16px;
          left: 24px;
          background: var(--gold-primary);
          color: var(--bg-darker);
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 20px rgba(201, 160, 80, 0.4);
          z-index: 10;
          border: 4px solid var(--bg-card);
        }

        .price-tag .amount {
          font-size: 1.4rem;
          font-weight: 900;
          line-height: 1;
        }

        .price-tag .currency {
          font-size: 0.8rem;
          font-weight: 700;
        }

        /* Content Box */
        .card-content-box {
          padding: 35px 24px 24px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .food-title {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 12px;
        }

        .food-desc {
          color: var(--text-secondary);
          line-height: 1.6;
          font-size: 1rem;
          margin-bottom: 24px;
          flex: 1;
        }

        .card-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 20px;
          border-top: 1px dashed rgba(255,255,255,0.08);
        }

        .food-calories {
          font-size: 0.9rem;
          color: #888;
          font-weight: 500;
        }

        /* Action Button */
        .action-btn {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: var(--text-primary);
          padding: 12px 24px;
          border-radius: 12px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
          overflow: hidden;
          position: relative;
        }

        .action-btn:hover {
          background: var(--gold-primary);
          color: var(--bg-darker);
          border-color: var(--gold-primary);
        }

        .action-btn.added {
          background: #2ecc71;
          color: #fff;
          border-color: #2ecc71;
        }

        .cart-icon {
          font-size: 1.1rem;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }
          .premium-menu-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }
          .categories-wrapper {
            overflow-x: auto;
            padding-bottom: 10px; /* Space for scrollbar */
            justify-content: flex-start; /* Allow scroll on small screens */
            -webkit-overflow-scrolling: touch;
          }
          
          /* Hide scrollbar but keep functionality */
          .categories-wrapper::-webkit-scrollbar {
            display: none;
          }
          .categories-wrapper {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          
          .categories-pill-container {
            flex-shrink: 0; /* Prevent squishing on mobile */
          }
        }
      `}</style>
    </motion.div>
  );
};

export default Menu;
