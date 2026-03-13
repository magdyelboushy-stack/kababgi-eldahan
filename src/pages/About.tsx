import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaFireAlt, FaRegHandshake, FaStar } from 'react-icons/fa';

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax for Hero
  const { scrollYProgress: scrollHero } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const yHeroBg = useTransform(scrollHero, [0, 1], ["0%", "40%"]);
  const yHeroText = useTransform(scrollHero, [0, 1], ["0%", "100%"]);
  const opacityHeroText = useTransform(scrollHero, [0, 0.8], [1, 0]);

  // Core values data
  const coreValues = [
    {
      icon: <FaFireAlt />,
      title: "سر التتبيلة",
      desc: "لسه محافظين على خلطة الدهان السرية بتاعت زمان، اللي بتدي اللحمة طعم أصلي ميتعوضش، مع ريحة الفحم اللي ترد الروح."
    },
    {
      icon: <FaStar />,
      title: "جودة مبنهزرش فيها",
      desc: "بننقي اللحمة البلدي بالحتة، صابحة وفرش كل يوم عشان نضمنلك أكله متتنسيش كل مرة تيجي فيها."
    },
    {
      icon: <FaRegHandshake />,
      title: "ضيافة على أصولها",
      desc: "مقتنعين إن المطعم مش بس أكل، دي تجربة كاملة بتبدأ من أول ما تدخل بابتسامة ترحيب لحد ما تخلص أكلتك وأنت مبسوط."
    }
  ];

  return (
    <div className="about-page" ref={containerRef}>
      
      {/* 1. Parallax Hero Section */}
      <div className="about-hero">
        <motion.div 
          className="about-hero-bg"
          style={{ 
            y: yHeroBg,
            backgroundImage: "url('https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1920&q=80')" 
          }}
        >
          <div className="hero-overlay"></div>
        </motion.div>
        
        <motion.div 
          className="about-hero-content container"
          style={{ y: yHeroText, opacity: opacityHeroText }}
        >
          <motion.h1 
            className="heading-xl text-white mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            عن <span className="text-gold">الدهان</span>
          </motion.h1>
          <motion.div 
            className="hero-divider"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          ></motion.div>
          <motion.p 
            className="hero-subtitle mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            بقالنا أكتر من ٣٠ سنة بنعمل عظمة في عالم المشويات
          </motion.p>
        </motion.div>
      </div>

      {/* 2. The Legacy (Story Card Overlapping) */}
      <section className="legacy-section pb-5">
        <div className="container">
          <div className="legacy-overlap-card">
            <div className="legacy-grid">
              
              <motion.div 
                className="legacy-content"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                <div className="section-badge mb-3">قصتنا</div>
                <h2 className="heading-lg mb-4 text-white">رحلة الطعم <span className="text-gold">الأصيل</span></h2>
                
                <div className="legacy-text">
                  <p>
                    "كبابجي أولاد الدهان" من أقدم وأشهر الأماكن اللي بتفهم في المشويات، خبرتنا معدية الـ ٣٠ سنة في الكار ده. المطعم اتأسس على مبدأ إننا نقدم أنضف وأحلى مشويات مفيش زيها، وده اللي خلانا نعلم مع كل أكيل بيدوق أكلنا.
                  </p>
                  <p>
                    فريقنا هنا معتمد على صنايعية عتاولة عارفين إزاي يطلعوا اللقمة مظبوطة بتتبيلة ملهاش حل ومكونات كلها فرش. بننقي اللحمة على الفرازة، وبنسويها على الطريقة بتاعت زمان اللي بتحافظ على أصل الأكل المصري وتراثه.
                  </p>
                  <p className="legacy-highlight">
                    "إحنا مش بس بنقدم أكل، إحنا بنعملك مزاج وتجربة مليانة بالأصالة والطعم اللي يربي عضم، عشان نرضي الذوق العالي بتاع عشاق المشويات بجد."
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                className="legacy-image-wrap"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80" alt="لحوم طازجة" className="legacy-img" />
                <div className="experience-stamp">
                  <div className="stamp-inner">
                    <span className="stamp-number">+30</span>
                    <span className="stamp-text">عاماً من<br/>الخبرة</span>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Values Grid */}
      <section className="values-section py-5 my-5">
        <div className="container">
          <motion.div 
            className="text-center mb-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="heading-lg">القيم اللي <span className="text-gold">مكملين بيها</span></h2>
            <p className="text-secondary mt-3 max-w-2xl mx-auto">
              نجاح الدهان مجاش من فراغ، ده عشان إحنا متمسكين بأصولنا وعمرنا ما ننزل بمستوانا، عشان نضمن مزاجك دايماً.
            </p>
          </motion.div>

          <div className="values-grid">
            {coreValues.map((val, index) => (
              <motion.div 
                className="value-card"
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="value-icon">{val.icon}</div>
                <h3 className="value-title">{val.title}</h3>
                <p className="value-desc">{val.desc}</p>
                <div className="value-line"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Parallax Quote Divider */}
      <section className="parallax-quote parallax-banner">
        <div className="parallax-banner-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=1920&q=80')" }}></div>
        <div className="parallax-quote-overlay"></div>
        <div className="container position-relative z-10">
          <motion.div 
            className="quote-content text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <FaStar className="quote-icon mb-4" />
            <h2 className="quote-text">
              "سر الصنعة مش بس في اللحمة، <br/>
              <span className="text-gold">سر الصنعة في الإيد اللي بتشويها</span>"
            </h2>
            <div className="quote-author mt-4">— مؤسس أولاد الدهان</div>
          </motion.div>
        </div>
      </section>

      <style>{`
        /* Scoped About Variables & Resets */
        .about-page {
          background-color: var(--bg-dark);
          min-height: 100vh;
        }

        .mb-3 { margin-bottom: 1rem; }
        .mb-4 { margin-bottom: 1.5rem; }
        .mb-5 { margin-bottom: 3rem; }
        .mt-3 { margin-top: 1rem; }
        .mt-4 { margin-top: 1.5rem; }
        .py-5 { padding-top: 5rem; padding-bottom: 5rem; }
        .pb-5 { padding-bottom: 5rem; }
        .my-5 { margin-top: 5rem; margin-bottom: 5rem; }
        .text-center { text-align: center; }
        .max-w-2xl { max-width: 800px; margin-left: auto; margin-right: auto; }
        .text-white { color: #fff !important; }
        .text-gold { color: var(--gold-primary); }
        .text-secondary { color: #aaaaaa; line-height: 1.8; font-size: 1.1rem; }
        .position-relative { position: relative; }
        .z-10 { z-index: 10; }

        /* 1. Parallax Hero */
        .about-hero {
          position: relative;
          height: 70vh;
          min-height: 500px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          margin-top: calc(-1 * var(--nav-height));
          padding-top: var(--nav-height);
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
        }

        .about-hero-bg {
          position: absolute;
          top: -15%;
          left: 0;
          width: 100%;
          height: 130%; /* Extra height for parallax travel */
          background-size: cover;
          background-position: center;
          z-index: 1;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(17,17,17,1) 100%);
        }

        .about-hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hero-subtitle {
          color: #e0e0e0;
          font-size: 1.25rem;
          font-weight: 600;
          letter-spacing: 0.5px;
          text-shadow: 0 2px 10px rgba(0,0,0,0.5);
        }

        .hero-divider {
          width: 80px;
          height: 3px;
          background-color: var(--gold-primary);
          border-radius: 2px;
          transform-origin: center;
        }

        /* 2. Legacy Overlap Card */
        .legacy-section {
          position: relative;
          z-index: 10;
        }

        .legacy-overlap-card {
          margin-top: -120px; /* Pulls it up over the Hero */
          background: #1a1a1a; /* Explicit dark background */
          border-radius: 24px;
          box-shadow: 0 25px 50px rgba(0,0,0,0.8);
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.05);
        }

        .legacy-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }

        .legacy-content {
          padding: 60px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: #1a1a1a; /* Ensure background is dark */
        }

        .section-badge {
          display: inline-block;
          font-size: 0.9rem;
          font-weight: 700;
          letter-spacing: 2px;
          color: var(--gold-primary);
          text-transform: uppercase;
        }

        .legacy-text p {
          color: #cccccc !important; /* Explicit readable light text */
          line-height: 1.8;
          font-size: 1.05rem;
          margin-bottom: 20px;
        }

        .legacy-highlight {
          font-size: 1.25rem !important;
          color: #fff !important;
          font-style: italic;
          border-right: 3px solid var(--gold-primary);
          padding-right: 20px;
          margin-top: 30px;
          font-weight: 600;
          line-height: 1.6 !important;
        }

        .legacy-image-wrap {
          position: relative;
          min-height: 500px;
          height: 100%;
        }

        .legacy-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .experience-stamp {
          position: absolute;
          bottom: 40px;
          left: -40px; /* Overlaps text area slightly */
          width: 160px;
          height: 160px;
          background: var(--gold-primary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 15px 35px rgba(201,160,80,0.3);
          border: 10px solid #1a1a1a; /* Explicit dark border */
        }

        .stamp-inner {
          text-align: center;
          color: #111;
        }

        .stamp-number {
          display: block;
          font-size: 2.5rem;
          font-weight: 900;
          line-height: 1;
          margin-bottom: 5px;
        }

        .stamp-text {
          font-size: 0.9rem;
          font-weight: 800;
          display: block;
          line-height: 1.2;
        }

        /* 3. Core Values Grid */
        .values-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }

        .value-card {
          background: #1a1a1a; /* Explicit dark background */
          padding: 50px 40px;
          border-radius: 20px;
          position: relative;
          overflow: hidden;
          transition: transform 0.4s ease, box-shadow 0.4s ease;
          border: 1px solid rgba(255,255,255,0.03);
          text-align: center;
        }

        .value-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
          border-color: rgba(201,160,80,0.2);
        }

        .value-icon {
          font-size: 3rem;
          color: var(--gold-primary);
          margin-bottom: 25px;
          display: inline-block;
        }

        .value-title {
          font-size: 1.5rem;
          color: #fff;
          margin-bottom: 15px;
          font-weight: 700;
        }

        .value-desc {
          color: #aaa;
          line-height: 1.7;
          font-size: 1.05rem;
          margin: 0;
        }

        .value-line {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, transparent, var(--gold-primary), transparent);
          transform: scaleX(0);
          transition: transform 0.4s ease;
        }

        .value-card:hover .value-line {
          transform: scaleX(1);
        }

        /* 4. Parallax Quote Divider */
        .parallax-quote {
          height: 60vh;
          min-height: 500px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
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
          background-attachment: fixed; /* CSS Parallax */
          z-index: 1;
        }

        .parallax-quote-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.7);
          z-index: 2;
        }

        .quote-icon {
          font-size: 2.5rem;
          color: var(--gold-primary);
        }

        .quote-text {
          font-size: clamp(2rem, 5vw, 3.5rem);
          color: #fff;
          line-height: 1.4;
          font-family: 'Aref Ruqaa', 'Cairo', serif; /* Or keep Cairo if Aref Ruqaa isn't loaded */
          font-style: italic;
          font-weight: 700;
          margin: 0 auto;
          max-width: 900px;
        }

        .quote-author {
          font-size: 1.2rem;
          color: #ccc;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        /* Responsive Breakpoints */
        @media (max-width: 992px) {
          .legacy-grid {
            grid-template-columns: 1fr;
          }
          .legacy-image-wrap {
            min-height: 400px;
          }
          .experience-stamp {
            bottom: auto;
            top: -50px;
            left: 30px;
            width: 120px;
            height: 120px;
            border-width: 5px;
          }
          .stamp-number { font-size: 2rem; }
          .legacy-overlap-card {
            margin-top: -80px;
          }
        }

        @media (max-width: 768px) {
          .values-grid {
            grid-template-columns: 1fr;
          }
          .legacy-content {
            padding: 40px 20px;
          }
          .about-hero {
            height: 50vh;
            min-height: 400px;
          }
          .parallax-banner-bg {
            background-attachment: scroll; /* Disable fixed attachment for smoother mobile scroll */
          }
        }
      `}</style>
    </div>
  );
};

export default About;
