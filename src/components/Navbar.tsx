import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'الرئيسية', path: '/' },
    { name: 'المنيو', path: '/menu' },
    { name: 'عن الدهان', path: '/about' },
    { name: 'تتبع طلبك', path: '/track' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : 'navbar--transparent'}`}>
      <div className="container nav-container">
        
        {/* Right: Logo */}
        <Link to="/" className="nav-brand">
          <img src="/logo.jpg" alt="أولاد الدهان" className="nav-brand__logo" />
          <div className="nav-brand__text">
            <span className="nav-brand__name">أولاد <span className="gold">الدهان</span></span>
            <span className="nav-brand__tagline">منذ ١٩٩٠</span>
          </div>
        </Link>

        {/* Center: Nav Links */}
        <ul className="nav-links desktop-only">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link 
                to={link.path} 
                className={`nav-links__item ${location.pathname === link.path ? 'nav-links__item--active' : ''}`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Left: Actions */}
        <div className="nav-actions">
          <Link to="/booking" className="nav-actions__book desktop-only">
            احجز طاولتك
          </Link>
          <Link to="/cart" className="nav-actions__cart">
            <FaShoppingCart />
            {cartCount > 0 && <span className="nav-actions__badge">{cartCount}</span>}
          </Link>
          
          <button 
            className="nav-actions__toggle"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="mobile-drawer"
          >
            <ul>
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className={`mobile-drawer__link ${location.pathname === link.path ? 'mobile-drawer__link--active' : ''}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/booking" className="mobile-drawer__book">
                  احجز طاولتك الآن
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        /* ========== BASE NAVBAR ========== */
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: var(--nav-height);
          z-index: 1000;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* TRANSPARENT STATE (at top of page, blends with Hero) */
        .navbar--transparent {
          background: transparent;
          box-shadow: none;
        }

        /* SCROLLED STATE (elegant dark bar) */
        .navbar--scrolled {
          background: rgba(17, 17, 17, 0.95);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
        }

        /* ========== CONTAINER ========== */
        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 100%;
        }

        /* ========== BRAND / LOGO ========== */
        .nav-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          transition: transform 0.3s ease;
        }

        .nav-brand:hover {
          transform: scale(1.03);
        }

        .nav-brand__logo {
          height: 50px;
          width: 50px;
          border-radius: 8px;
          object-fit: cover;
          border: 2px solid rgba(201, 160, 80, 0.4);
          transition: border-color 0.3s;
        }

        .nav-brand:hover .nav-brand__logo {
          border-color: var(--gold-primary);
        }

        .nav-brand__text {
          display: flex;
          flex-direction: column;
        }

        .nav-brand__name {
          font-family: 'Cairo', sans-serif;
          font-size: 1.5rem;
          font-weight: 800;
          color: #fff;
          line-height: 1.2;
        }

        .nav-brand__tagline {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.5);
          font-weight: 600;
          letter-spacing: 1px;
        }

        .gold { color: var(--gold-primary); }

        /* ========== NAV LINKS ========== */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 8px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-links__item {
          color: rgba(255, 255, 255, 0.75);
          font-family: 'Cairo', sans-serif;
          font-weight: 600;
          font-size: 1rem;
          text-decoration: none;
          padding: 8px 18px;
          border-radius: 8px;
          transition: all 0.3s ease;
          position: relative;
        }

        .nav-links__item:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.08);
        }

        .nav-links__item--active {
          color: var(--gold-primary) !important;
          background: rgba(201, 160, 80, 0.1);
        }

        /* ========== ACTIONS ========== */
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .nav-actions__book {
          background: var(--gold-primary);
          color: #111;
          padding: 10px 28px;
          border-radius: 30px;
          font-weight: 800;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          text-decoration: none;
          letter-spacing: -0.3px;
          box-shadow: 0 4px 15px rgba(201, 160, 80, 0.3);
        }

        .nav-actions__book:hover {
          background: #fff;
          color: #111;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(201, 160, 80, 0.4);
        }

        .nav-actions__cart {
          position: relative;
          color: rgba(255, 255, 255, 0.8);
          font-size: 1.2rem;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          text-decoration: none;
        }

        .nav-actions__cart:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.15);
          transform: translateY(-2px);
        }

        .nav-actions__badge {
          position: absolute;
          top: -2px;
          right: -2px;
          background: var(--gold-primary);
          color: #111;
          font-size: 0.7rem;
          font-weight: 800;
          min-width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 4px;
        }

        .nav-actions__toggle {
          display: none;
          font-size: 1.3rem;
          color: #fff;
          padding: 10px;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.2s;
        }

        .nav-actions__toggle:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        /* ========== MOBILE DRAWER ========== */
        .mobile-drawer {
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          background: rgba(17, 17, 17, 0.98);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
        }

        .mobile-drawer ul {
          padding: 15px 0;
          margin: 0;
          list-style: none;
          display: flex;
          flex-direction: column;
        }

        .mobile-drawer__link {
          display: block;
          padding: 16px 24px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 1.15rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s ease;
          border-bottom: 1px solid rgba(255, 255, 255, 0.03);
        }

        .mobile-drawer__link:hover,
        .mobile-drawer__link--active {
          color: var(--gold-primary);
          background: rgba(201, 160, 80, 0.05);
          padding-right: 32px;
        }

        .mobile-drawer__book {
          display: block;
          margin: 15px 24px;
          padding: 14px;
          text-align: center;
          background: var(--gold-primary);
          color: #111;
          font-weight: 800;
          font-size: 1.1rem;
          border-radius: 10px;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .mobile-drawer__book:hover {
          background: #fff;
        }

        /* ========== RESPONSIVE ========== */
        @media (max-width: 968px) {
          .desktop-only {
            display: none !important;
          }
          .nav-actions__toggle {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .nav-brand__name {
            font-size: 1.25rem;
          }
          .nav-brand__tagline {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
