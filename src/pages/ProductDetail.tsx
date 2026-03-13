import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { menuItems } from '../data/menuData';
import { useCart } from '../context/CartContext';
import { FaShoppingCart, FaChevronRight, FaFireAlt, FaCheck, FaMinus, FaPlus } from 'react-icons/fa';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    // Find product by id from URL
    if (id) {
      const foundProduct = menuItems.find(item => item.id === parseInt(id));
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        // Redirect to menu if not found
        navigate('/menu');
      }
    }
  }, [id, navigate]);

  if (!product) return null;

  // Find related items (same category, excluding current)
  const relatedItems = menuItems
    .filter(item => item.category === product.category && item.id !== product.id)
    .slice(0, 3);

  const handleQuantity = (type: 'inc' | 'dec') => {
    if (type === 'inc') setQuantity(prev => prev + 1);
    else if (type === 'dec' && quantity > 1) setQuantity(prev => prev - 1);
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    for (let i = 0; i < quantity; i++) {
        addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          category: product.category
        });
    }
    
    setTimeout(() => {
      setIsAdding(false);
      setQuantity(1);
    }, 800);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ backgroundColor: 'var(--bg-dark)', minHeight: '100vh', paddingBottom: '80px' }}
    >
      {/* Dynamic Hero based on Product Image */}
      <div className="product-hero">
        <div 
          className="product-hero-bg" 
          style={{ backgroundImage: `url('${product.image}')` }}
        ></div>
        <div className="product-hero-overlay"></div>
        <div className="container product-hero-content">
          <Link to="/menu" className="back-btn">
            <FaChevronRight /> العودة للمنيو
          </Link>
        </div>
      </div>

      <div className="container product-main-container">
        <div className="product-details-overlap">
          <div className="product-layout-grid">
            
            {/* Image Gallery Side */}
            <motion.div 
              className="product-gallery-side"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="main-image-container">
                {product.popular && (
                  <div className="product-badge">
                    <FaFireAlt className="text-red" /> الأكثر مبيعاً
                  </div>
                )}
                <img src={product.image} alt={product.name} className="product-main-img" />
              </div>
              {/* If we had extra gallery images, they would map here. Using identical for mock premium feel */}
              <div className="gallery-thumbnails">
                <img src={product.image} alt={product.name} className="thumbnail active" />
                <img src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80" alt="Meat" className="thumbnail" />
                <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=400&q=80" alt="Fresh" className="thumbnail" />
              </div>
            </motion.div>

            {/* Content & Ordering Side */}
            <motion.div 
              className="product-info-side"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <h1 className="product-title">{product.name}</h1>
              <div className="price-calories-row">
                <div className="product-price">
                  <span className="price-num">{product.price}</span>
                  <span className="price-currency">ج.م</span>
                </div>
                <div className="product-calories">{product.calories}</div>
              </div>

              <div className="product-divider"></div>

              <div className="product-description">
                <h3 className="section-subtitle">عن الطبق</h3>
                <p>{product.longDesc}</p>
              </div>

              {product.features && product.features.length > 0 && (
                <div className="product-features">
                  <h3 className="section-subtitle">المميزات وبنقدمه إزاي؟</h3>
                  <ul className="features-list">
                    {product.features.map((feature: string, idx: number) => (
                      <li key={idx}><FaCheck className="text-gold feature-icon" /> {feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="product-divider"></div>

              <div className="purchase-section">
                <div className="quantity-selector">
                  <button onClick={() => handleQuantity('dec')} className="qty-btn" disabled={quantity <= 1}>
                    <FaMinus />
                  </button>
                  <span className="qty-number">{quantity}</span>
                  <button onClick={() => handleQuantity('inc')} className="qty-btn">
                    <FaPlus />
                  </button>
                </div>

                <button 
                  className={`add-to-cart-big ${isAdding ? 'added' : ''}`}
                  onClick={handleAddToCart}
                  disabled={isAdding}
                >
                  {isAdding ? (
                    <>
                      <FaCheck className="action-icon" /> أضفنا {quantity} للسلة
                    </>
                  ) : (
                    <>
                      <FaShoppingCart className="action-icon" /> أضف للسلة - {product.price * quantity} ج.م
                    </>
                  )}
                </button>
              </div>

            </motion.div>
          </div>
        </div>

        {/* Related Items Section */}
        {relatedItems.length > 0 && (
          <motion.div 
            className="related-items-section mt-5"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="heading-md mb-4 text-center">جرب كمان مع الأكلة دي</h2>
            <div className="related-grid">
              {relatedItems.map((item: any) => (
                <Link to={`/menu/${item.id}`} key={item.id} className="related-card">
                  <div className="related-img-wrap">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="related-content">
                    <h4 className="related-title">{item.name}</h4>
                    <span className="related-price text-gold">{item.price} ج.م</span>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <style>{`
        /* Hero Setup */
        .product-hero {
          position: relative;
          height: 45vh;
          min-height: 350px;
          margin-top: calc(-1 * var(--nav-height));
          padding-top: var(--nav-height);
          overflow: hidden;
        }

        .product-hero-bg {
          position: absolute;
          inset: -10%;
          background-size: cover;
          background-position: center;
          filter: blur(8px);
          transform: scale(1.1);
          z-index: 1;
        }

        .product-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(14,14,14,0.4) 0%, var(--bg-dark) 100%);
          z-index: 2;
        }

        .product-hero-content {
          position: relative;
          z-index: 10;
          height: 100%;
          display: flex;
          align-items: flex-start;
          padding-top: 40px;
        }

        .back-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: #fff;
          font-weight: 700;
          font-size: 1.1rem;
          background: rgba(255,255,255,0.1);
          padding: 10px 24px;
          border-radius: 30px;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
          border: 1px solid rgba(255,255,255,0.1);
        }

        .back-btn:hover {
          background: var(--gold-primary);
          color: var(--bg-darker);
          border-color: var(--gold-primary);
        }

        /* Main Details Overlap */
        .product-main-container {
          position: relative;
          z-index: 20;
        }

        .product-details-overlap {
          background: var(--bg-card);
          border-radius: 30px;
          margin-top: -150px;
          padding: 40px;
          box-shadow: 0 25px 50px rgba(0,0,0,0.15); /* lighter shadow */
          border: 1px solid rgba(0,0,0,0.05); /* dark border for light bg */
        }

        .product-layout-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 60px;
        }

        /* Gallery Side */
        .product-gallery-side {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .main-image-container {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 15px 30px rgba(0,0,0,0.2);
          aspect-ratio: 4/3;
        }

        .product-main-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .product-badge {
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(14, 14, 14, 0.8);
          backdrop-filter: blur(10px);
          padding: 10px 20px;
          border-radius: 30px;
          font-weight: 700;
          color: #fff;
          border: 1px solid rgba(255,255,255,0.1);
          z-index: 5;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .gallery-thumbnails {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
        }

        .thumbnail {
          width: 100%;
          aspect-ratio: 1;
          object-fit: cover;
          border-radius: 12px;
          cursor: pointer;
          border: 2px solid transparent;
          opacity: 0.6;
          transition: all 0.3s ease;
        }

        .thumbnail.active, .thumbnail:hover {
          opacity: 1;
          border-color: var(--gold-primary);
        }

        /* Info Side */
        .product-info-side {
          display: flex;
          flex-direction: column;
        }

        .product-title {
          font-size: 2.8rem;
          color: var(--text-primary);
          font-weight: 900;
          margin-bottom: 20px;
          line-height: 1.2;
        }

        .price-calories-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 30px;
        }

        .product-price {
          color: var(--gold-primary);
          display: flex;
          align-items: flex-end;
          gap: 5px;
        }

        .price-num {
          font-size: 3rem;
          font-weight: 900;
          line-height: 0.8;
        }

        .price-currency {
          font-size: 1.2rem;
          font-weight: 700;
          padding-bottom: 5px;
        }

        .product-calories {
          background: rgba(0,0,0,0.05); /* updated for light theme */
          padding: 8px 16px;
          border-radius: 8px;
          color: var(--text-secondary);
          font-weight: 600;
          font-size: 1.1rem;
        }

        .product-divider {
          height: 1px;
          background: rgba(0,0,0,0.08); /* changed from light to dark for light bg */
          margin: 30px 0;
        }

        .section-subtitle {
          color: var(--text-primary);
          font-size: 1.4rem;
          font-weight: 700;
          margin-bottom: 15px;
        }

        .product-description p {
          color: var(--text-secondary);
          line-height: 1.9;
          font-size: 1.15rem;
        }

        .features-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          gap: 12px;
        }

        .features-list li {
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--text-secondary);
          font-size: 1.1rem;
        }

        .feature-icon {
          background: rgba(201,160,80,0.1);
          padding: 6px;
          border-radius: 50%;
          font-size: 1.5rem;
        }

        /* Purchase Section */
        .purchase-section {
          background: rgba(0,0,0,0.02); /* updated */
          padding: 30px;
          border-radius: 20px;
          border: 1px solid rgba(0,0,0,0.05); /* updated */
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .quantity-selector {
          display: flex;
          align-items: center;
          background: var(--bg-card);
          border: 1px solid rgba(0,0,0,0.1); /* updated border for light theme */
          border-radius: 12px;
          overflow: hidden;
        }

        .qty-btn {
          background: transparent;
          border: none;
          color: var(--text-primary);
          padding: 15px 20px;
          cursor: pointer;
          font-size: 1rem;
          transition: background 0.2s;
        }

        .qty-btn:hover:not(:disabled) {
          background: rgba(0,0,0,0.05); /* slightly dark for hover */
        }

        .qty-btn:disabled {
          color: #555;
          cursor: not-allowed;
        }

        .qty-number {
          padding: 0 25px;
          font-weight: 800;
          font-size: 1.3rem;
          color: var(--text-primary);
        }

        .add-to-cart-big {
          flex: 1;
          background: var(--gold-primary);
          color: var(--bg-darker);
          border: none;
          border-radius: 12px;
          padding: 20px;
          font-size: 1.3rem;
          font-weight: 800;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          transition: all 0.3s ease;
        }

        .add-to-cart-big:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(201, 160, 80, 0.4);
        }

        .add-to-cart-big.added {
          background: #2ecc71;
          color: #fff;
        }

        /* Related Items */
        .mt-5 { margin-top: 80px; }
        .mb-4 { margin-bottom: 24px; }
        .text-center { text-align: center; }
        
        .related-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }

        .related-card {
          background: var(--bg-card);
          border-radius: 16px;
          overflow: hidden;
          text-decoration: none;
          border: 1px solid rgba(0,0,0,0.05); /* dark border */
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .related-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.3);
          border-color: rgba(201,160,80,0.3);
        }

        .related-img-wrap {
          height: 180px;
          overflow: hidden;
        }

        .related-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .related-card:hover .related-img-wrap img {
          transform: scale(1.1);
        }

        .related-content {
          padding: 20px;
          text-align: center;
        }

        .related-title {
          color: var(--text-primary);
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 10px;
        }

        .related-price {
          font-weight: 800;
          font-size: 1.1rem;
        }

        @media (max-width: 992px) {
          .product-layout-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .product-details-overlap {
            padding: 30px 20px;
            margin-top: -100px;
          }
          .purchase-section {
            flex-direction: column;
            align-items: stretch;
          }
          .quantity-selector {
            justify-content: space-between;
          }
          .related-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default ProductDetail;
