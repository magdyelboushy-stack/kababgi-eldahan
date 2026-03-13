import { useRef } from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import { Link } from 'react-router-dom';
import { FaPhoneAlt, FaMapMarkerAlt, FaWhatsapp, FaFire, FaCrown, FaCheckCircle } from 'react-icons/fa';

const Home = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Signature categories data
  const categories = [
    { title: 'مشاوي على الفحم', icon: <FaFire />, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80', delay: 0.1 },
    { title: 'طواجن الدهان', icon: <FaCrown />, image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=600&q=80', delay: 0.3 },
    { title: 'وجبات التوفير', icon: <FaCheckCircle />, image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=600&q=80', delay: 0.5 }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ minHeight: '100vh', backgroundColor: 'var(--bg-dark)' }}
      ref={scrollRef}
    >
      <Hero />

      {/* Floating Section - Quality Story */}
      <section className="story-section parallax-overlap">
        <div className="container">
          <div className="story-card">
            <motion.div 
              className="story-content"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="heading-lg mb-4 text-gold">سر الصنعة</h2>
              <h3 className="heading-md mb-6">اللحمة البلدي هي سر الطعم اللي مكمل معانا</h3>
              <p className="text-secondary mb-8">
                احنا مبنهزرش في الجودة. بننقي اللحمة بالحتة، صابحة كل يوم من مزارعنا، تاخد تتبيلتنا السرية وتتشوي على نار هادية عشان تدوق طعم ملوش مثيل.
              </p>
              <div className="features-grid">
                <div className="feature-item">
                  <div className="feature-icon">100%</div>
                  <span>لحمة بلدي صابحة</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">+30</div>
                  <span>سنة بنعمل عظمة</span>
                </div>
              </div>
            </motion.div>
            <motion.div 
              className="story-image-wrap"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80" alt="لحوم طازجة" className="story-img" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pure Parallax Divider 1 */}
      <section className="parallax-banner">
        <div className="parallax-banner-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=1920&q=80')" }}></div>
        <div className="parallax-overlay"></div>
        <div className="container parallax-banner-content text-center">
          <motion.h2 
            className="heading-xl text-white mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            نار الفحم <span className="text-gold">بتظبط المزاج</span>
          </motion.h2>
          <motion.p
            className="text-white text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            ريحة الشوي على أصولها، وطعم بياخدك لأيام زمان وحلاوة أكلنا المصري اللي كبرنا عليه.
          </motion.p>
        </div>
      </section>

      {/* Categories Section on Solid BG */}
      <section className="categories-section section-padding bg-darker">
        <div className="container">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-gold font-bold text-lg d-block mb-2">منيو يفتح النفس</span>
            <h2 className="heading-lg">الدهان يعني تشكيلة تاكل صوابعك وراها وطعم حكاية</h2>
          </motion.div>
          
          <div className="categories-grid">
            {categories.map((cat, idx) => (
              <motion.div 
                key={idx}
                className="category-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: cat.delay }}
              >
                <div className="cat-img-wrapper">
                  <img src={cat.image} alt={cat.title} />
                  <div className="cat-overlay"></div>
                </div>
                <div className="cat-content">
                  <div className="cat-icon text-gold">{cat.icon}</div>
                  <h3 className="heading-md text-white m-0">{cat.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/menu" className="btn btn-outline btn-lg">شاهد المنيو الكامل</Link>
          </div>
        </div>
      </section>

      {/* Parallax Banner 2 - CTA */}
      <section className="parallax-banner cta-banner">
        <div className="parallax-banner-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560717845-968823efbee1?auto=format&fit=crop&w=1920&q=80')" }}></div>
        <div className="parallax-overlay"></div>
        <div className="container parallax-banner-content text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="heading-xl text-white mb-6">جرب بنفسك واحكم</h2>
            <p className="text-white text-lg max-w-2xl mx-auto mb-8">
              سيبك من الصور وتعالى دوق الطعم اللي بجد، احجز ترابيزتك دلوقتي أو اطلب دليفري لحد باب البيت.
            </p>
            <div className="d-flex justify-center gap-4 flex-wrap">
              <Link to="/booking" className="btn btn-primary btn-lg">احجز طاولتك</Link>
              <Link to="/menu" className="btn btn-outline-white btn-lg">اطلب أونلاين</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Contact Section */}
      <section className="quick-contact-section bg-darker pb-0 pt-0">
        <div className="container">
          <div className="contact-box-overlap">
            <div className="contact-info text-center">
              <h3 className="heading-md mb-6">موجودين دايماً في خدمتك</h3>
              <div className="contact-icons-row">
                <div className="contact-pill">
                  <FaPhoneAlt className="text-gold" />
                  <span dir="ltr">0111 100 1403</span>
                </div>
                <div className="contact-pill">
                  <FaWhatsapp className="text-green" />
                  <span dir="ltr">0111 54 45 333</span>
                </div>
                <div className="contact-pill">
                  <FaMapMarkerAlt className="text-red" />
                  <a href="https://maps.app.goo.gl/cHpRr3LSWJtLw4jT9" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }} className="hover-gold">
                    <span>موقف السهران - الحوامدية - الجيزة</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        /* Typography and Basics */
        .mb-2 { margin-bottom: 8px; }
        .mb-4 { margin-bottom: 16px; }
        .mb-6 { margin-bottom: 24px; }
        .mb-8 { margin-bottom: 32px; }
        .mb-12 { margin-bottom: 48px; }
        .mt-12 { margin-top: 48px; }
        .pb-0 { padding-bottom: 0 !important; }
        .pt-0 { padding-top: 0 !important; }
        .text-lg { font-size: 1.25rem; line-height: 1.8; opacity: 0.9; }
        .max-w-2xl { max-width: 800px; }
        .mx-auto { margin-left: auto; margin-right: auto; }
        .text-white { color: white !important; }
        .bg-darker { background-color: var(--bg-card); }
        .font-bold { font-weight: 700; }
        .d-block { display: block; }
        .d-flex { display: flex; }
        .justify-center { justify-content: center; }
        .gap-4 { gap: 16px; }
        .flex-wrap { flex-wrap: wrap; }
        .text-green { color: #2ecc71; }
        .text-red { color: #e74c3c; }

        /* Story Overlay Section */
        .parallax-overlap {
          position: relative;
          z-index: 20;
          margin-top: -100px; /* Pull it up over the Hero */
          padding-bottom: 100px;
        }

        .story-card {
          background: var(--bg-card);
          border-radius: 20px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          box-shadow: 0 20px 50px rgba(0,0,0,0.1);
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.05);
        }

        .story-content {
          padding: 60px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .story-image-wrap {
          height: 100%;
          min-height: 400px;
        }

        .story-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .features-grid {
          display: flex;
          gap: 30px;
          border-top: 1px solid rgba(0,0,0,0.05);
          padding-top: 30px;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .feature-icon {
          font-size: 1.5rem;
          font-weight: 900;
          color: var(--gold-primary);
          background: rgba(201,160,80,0.1);
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }

        /* Fixed Parallax Banners (CSS-based) */
        .parallax-banner {
          position: relative;
          min-height: 600px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          /* Key for CSS Parallax on desktop */
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
        }

        .parallax-banner-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          background-attachment: fixed; /* Pure CSS Parallax */
          z-index: -2;
        }

        .parallax-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.6);
          z-index: -1;
        }

        .parallax-banner-content {
          position: relative;
          z-index: 10;
        }

        /* Category Cards Overlay */
        .categories-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }

        .category-card {
          position: relative;
          height: 350px;
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        }

        .cat-img-wrapper {
          position: absolute;
          inset: 0;
          transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .category-card:hover .cat-img-wrapper {
          transform: scale(1.1);
        }

        .cat-img-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .cat-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 100%);
        }

        .cat-content {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 30px;
          display: flex;
          align-items: center;
          gap: 15px;
          z-index: 2;
        }

        .cat-icon {
          font-size: 2rem;
        }

        /* CTA Banner Adjustments */
        .cta-banner {
          min-height: 500px;
        }

        .btn-outline-white {
          background: transparent;
          color: #fff;
          border: 2px solid #fff;
          padding: 16px 40px;
          font-size: 1.15rem;
          border-radius: 8px;
          font-weight: 700;
          transition: all 0.3s ease;
        }
        
        .btn-outline-white:hover {
          background: #fff;
          color: #000;
          transform: translateY(-2px);
        }

        /* Contact Overlap */
        .contact-box-overlap {
          background: var(--bg-dark);
          position: relative;
          z-index: 20;
          margin-top: -60px;
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 15px 40px rgba(0,0,0,0.08);
          border: 1px solid rgba(0,0,0,0.05);
          margin-bottom: 60px;
        }

        .contact-icons-row {
          display: flex;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        .contact-pill {
          display: flex;
          align-items: center;
          gap: 12px;
          background: var(--bg-card);
          padding: 15px 25px;
          border-radius: 30px;
          font-size: 1.1rem;
          font-weight: 600;
          border: 1px solid rgba(0,0,0,0.05);
          box-shadow: 0 5px 15px rgba(0,0,0,0.02);
        }

        /* Mobile Adjustments */
        @media (max-width: 968px) {
          .story-card {
            grid-template-columns: 1fr;
          }
          .story-content {
            padding: 40px 20px;
          }
          .parallax-overlap {
            margin-top: -50px;
          }
          .categories-grid {
            grid-template-columns: 1fr;
          }
          /* Disable CSS parallax attachment on mobile due to poor browser support */
          .parallax-banner-bg {
            background-attachment: scroll;
          }
          .hero-title {
            font-size: 2.5rem;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default Home;
