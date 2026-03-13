import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaYoutube, FaTiktok, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Col */}
          <div className="footer-col brand-col">
            <Link to="/" className="footer-logo">
              <span className="logo-text text-gold">أولاد الدهان</span>
            </Link>
            <p className="footer-desc">
              أصل المشويات في مصر. بنقدملكم أحلى أكل مشوي على الفحم بجودة وطعم ميتوصفش.
            </p>
            <div className="social-links">
              <a href="https://www.facebook.com/Kababgi.eldahan/" target="_blank" rel="noopener noreferrer" className="social-icon"><FaFacebook /></a>
              <a href="https://www.instagram.com/kababgi.eldahan/" target="_blank" rel="noopener noreferrer" className="social-icon"><FaInstagram /></a>
              <a href="https://www.youtube.com/@kababgi-eldahan" target="_blank" rel="noopener noreferrer" className="social-icon"><FaYoutube /></a>
              <a href="https://www.tiktok.com/@kababgi_eldahan" target="_blank" rel="noopener noreferrer" className="social-icon"><FaTiktok /></a>
            </div>
          </div>

          {/* Links Col */}
          <div className="footer-col">
            <h3 className="footer-title">روابط سريعة</h3>
            <ul className="footer-links">
              <li><Link to="/">الرئيسية</Link></li>
              <li><Link to="/menu">المنيو</Link></li>
              <li><Link to="/track">تتبع طلبك</Link></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="footer-col">
            <h3 className="footer-title">تواصل معنا</h3>
            <ul className="footer-contact">
              <li>
                <FaPhoneAlt className="text-gold" />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span dir="ltr">0111 100 1403</span>
                  <span dir="ltr">0111 54 45 333</span>
                </div>
              </li>
              <li>
                <FaMapMarkerAlt className="text-gold" />
                <a href="https://maps.app.goo.gl/cHpRr3LSWJtLw4jT9" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }} className="hover-gold">
                  <span>موقف السهران - الحوامدية - الجيزة</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Map Embed Col */}
          <div className="footer-col">
            <h3 className="footer-title">موقعنا خريطة</h3>
            <div className="map-container" style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
              <a href="https://maps.app.goo.gl/cHpRr3LSWJtLw4jT9" target="_blank" rel="noopener noreferrer" style={{ display: 'block', height: '180px', position: 'relative' }}>
                <iframe 
                  src="https://maps.google.com/maps?q=31.298539,31.291771&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, display: 'block', pointerEvents: 'none' }} 
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Location Map"
                ></iframe>
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   <span className="btn btn-primary btn-sm" style={{ pointerEvents: 'none' }}>افتح الخريطة</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} أولاد الدهان للمشويات. جميع الحقوق محفوظة.</p>
        </div>
      </div>

      <style>{`
        .footer {
          background-color: var(--bg-darker);
          padding: 60px 0 20px;
          border-top: 2px solid rgba(212, 175, 55, 0.2);
          margin-top: 60px;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1.5fr;
          gap: 30px;
          margin-bottom: 40px;
        }

        .footer-logo .logo-text {
          font-family: 'Playfair Display', serif;
          font-size: 2rem;
          font-weight: 800;
          display: block;
          margin-bottom: 20px;
        }

        .footer-desc {
          color: var(--text-secondary);
          margin-bottom: 25px;
          max-width: 400px;
        }

        .social-links {
          display: flex;
          gap: 15px;
        }

        .social-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          color: var(--text-primary);
          transition: all 0.3s ease;
        }

        .social-icon:hover {
          background: var(--gold-primary);
          color: var(--bg-darker);
          transform: translateY(-3px);
          box-shadow: var(--glow-gold);
        }

        .footer-title {
          font-size: 1.5rem;
          margin-bottom: 25px;
          color: var(--text-primary);
        }

        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .footer-links a {
          color: var(--text-secondary);
          transition: color 0.3s ease;
        }

        .footer-links a:hover {
          color: var(--gold-primary);
          padding-right: 5px; /* RTL specific */
        }

        .footer-contact {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .footer-contact li {
          display: flex;
          align-items: center;
          gap: 15px;
          color: var(--text-secondary);
        }

        .footer-bottom {
          text-align: center;
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--text-muted);
          font-size: 0.9rem;
        }

        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
