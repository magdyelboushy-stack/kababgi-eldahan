import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaStar } from 'react-icons/fa';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Dramatic parallax movements
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scaleImage = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  
  return (
    <div ref={containerRef} className="hero-container">
      {/* Background Image moving at a different speed (Parallax) */}
      <motion.div 
        className="hero-parallax-bg"
        style={{ y: yBg, scale: scaleImage }}
      >
        <div className="hero-overlay"></div>
      </motion.div>

      <div className="container hero-content-wrapper">
        <motion.div 
          className="hero-content"
          style={{ y: yText, opacity: opacityText }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="hero-badge"
          >
            <FaStar className="text-gold" />
            <span>الطعم الأصلي في كل قطمة</span>
          </motion.div>

          <motion.h1 
            className="heading-xl hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            أصل المشويات <br/>
            <span className="text-gold">على أصولها</span>
          </motion.h1>

          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            بقالنا أكتر من 30 سنة بنقدملكم أحلى مشويات، معمولة بمزاج من أجود اللحوم البلدي وتتبيلتنا السرية اللي ملهاش زي.
          </motion.p>

          <motion.div 
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <Link to="/menu" className="btn btn-primary btn-hero">
              تصفح المنيو
              <FaChevronLeft className="btn-icon" />
            </Link>
            <Link to="/booking" className="btn btn-outline-white btn-hero">
              احجز طاولة
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        .hero-container {
          position: relative;
          height: 100vh;
          min-height: 800px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          margin-top: calc(-1 * var(--nav-height));
          padding-top: var(--nav-height);
          /* Clip to prevent overflow messing with page scroll */
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
        }

        .hero-parallax-bg {
          position: absolute;
          top: -10%; /* Exceed height slightly for parallax room */
          left: 0;
          width: 100%;
          height: 120%; /* Taller than container so it can move */
          background-color: #000;
          background-image: url('https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1920&q=80');
          background-size: cover;
          background-position: center;
          z-index: -2;
          transform-origin: center top;
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to bottom, 
            rgba(0, 0, 0, 0.4) 0%, 
            rgba(0, 0, 0, 0.7) 50%,
            var(--bg-dark) 100%
          );
          z-index: -1;
        }

        .hero-content-wrapper {
          position: relative;
          z-index: 10;
          width: 100%;
        }

        .hero-content {
          max-width: 800px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin: 0 auto;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          padding: 10px 24px;
          border-radius: 30px;
          border: 1px solid rgba(201, 160, 80, 0.5);
          color: white;
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 30px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }

        .hero-title {
          margin-bottom: 30px;
          color: white;
          line-height: 1.15;
          font-size: clamp(3.5rem, 8vw, 6rem);
          text-shadow: 0 4px 20px rgba(0,0,0,0.5);
          font-weight: 900;
        }

        .hero-subtitle {
          font-size: clamp(1.2rem, 3vw, 1.5rem);
          color: #f0f0f0;
          margin-bottom: 50px;
          line-height: 1.8;
          font-weight: 500;
          text-shadow: 0 2px 10px rgba(0,0,0,0.8);
          max-width: 700px;
        }

        .hero-actions {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
        }

        .btn-hero {
          padding: 18px 45px;
          font-size: 1.25rem;
          border-radius: 40px;
        }

        .btn-outline-white {
          background: transparent;
          color: #fff;
          border: 2px solid #fff;
          padding: 18px 45px;
          font-size: 1.25rem;
          border-radius: 40px;
          font-weight: 700;
          transition: all 0.3s ease;
        }
        
        .btn-outline-white:hover {
          background: #fff;
          color: #000;
          transform: translateY(-2px);
        }
        
        .btn-icon {
          font-size: 0.9rem;
          margin-top: 2px;
        }

        @media (max-width: 768px) {
          .hero-overlay {
            background: linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.8) 70%, var(--bg-dark) 100%);
          }
          .hero-actions {
            flex-direction: column;
            width: 100%;
          }
          .btn-hero, .btn-outline-white {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default Hero;
