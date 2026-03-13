import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMoneyBillWave, FaShoppingBag, FaUsers, FaArrowUp, FaClock, FaCheckCircle, FaUtensils, FaChartLine, FaBrain, FaFire, FaExclamationTriangle, FaLightbulb } from 'react-icons/fa';

const Dashboard = () => {
  const stats = [
    { title: 'أرباح اليوم', value: '14,500', unit: 'ج.م', icon: <FaMoneyBillWave />, color: '#10b981', bg: 'rgba(16,185,129,0.1)', trend: '+15%' },
    { title: 'الطلبات الجديدة', value: '45', unit: 'طلب', icon: <FaShoppingBag />, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', trend: '+5%' },
    { title: 'إجمالي العملاء', value: '1,240', unit: 'عميل', icon: <FaUsers />, color: '#6366f1', bg: 'rgba(99,102,241,0.1)', trend: '+8%' },
    { title: 'معدل الرضا', value: '96', unit: '%', icon: <FaChartLine />, color: '#ec4899', bg: 'rgba(236,72,153,0.1)', trend: '+2%' },
  ];

  // Smart Predictions Mock Data
  const dayName = new Date().toLocaleDateString('ar-EG', { weekday: 'long' });
  const predictions = [
    {
      type: 'alert',
      icon: <FaExclamationTriangle />,
      color: '#f59e0b',
      title: `ضغط متوقع على الكفتة والكباب`,
      desc: `بناءً على بيانات ${dayName} الماضي، توقع ضغط عالي من 4:00 لـ 6:30 مساءً. جهز ~18 كيلو كفتة و 12 كيلو كباب.`,
    },
    {
      type: 'insight',
      icon: <FaLightbulb />,
      color: '#6366f1',
      title: 'الفراخ المشوية طلبها زاد 25%',
      desc: 'في آخر 3 أيام، طلبات الفراخ المشوية زادت بشكل ملحوظ. تأكد من توفير كمية كافية.',
    },
    {
      type: 'tip',
      icon: <FaFire />,
      color: '#ec4899',
      title: 'وجبة الميكس جريل بتحقق أعلى هامش ربح',
      desc: 'هامش الربح على الميكس جريل 45%. خليها في العروض المميزة.',
    },
  ];

  const peakHours = [
    { hour: '12 م', level: 30 },
    { hour: '1 م', level: 55 },
    { hour: '2 م', level: 70 },
    { hour: '3 م', level: 45 },
    { hour: '4 م', level: 85 },
    { hour: '5 م', level: 95 },
    { hour: '6 م', level: 90 },
    { hour: '7 م', level: 75 },
    { hour: '8 م', level: 60 },
    { hour: '9 م', level: 40 },
    { hour: '10 م', level: 20 },
  ];

  const [activePrediction, setActivePrediction] = useState(0);

  const recentOrders = [
    { id: '#1024', customer: 'أحمد محمود', items: 'كباب وكفتة (x2)', total: '700 ج.م', status: 'pending', time: 'منذ 5 دقائق' },
    { id: '#1023', customer: 'سارة خالد', items: 'وجبة ميكس جريل', total: '450 ج.م', status: 'cooking', time: 'منذ 15 دقيقة' },
    { id: '#1022', customer: 'محمد علي', items: 'نص فرخة مشوية (x3)', total: '330 ج.م', status: 'delivered', time: 'منذ 45 دقيقة' },
    { id: '#1021', customer: 'نور الدين', items: 'طرب ضاني', total: '380 ج.م', status: 'delivered', time: 'منذ ساعة' },
  ];

  const popularItems = [
    { name: 'كباب وكفتة مشكل', sales: 12, revenue: '4,200 ج.م' },
    { name: 'وجبة ميكس جريل', sales: 8, revenue: '3,600 ج.م' },
    { name: 'فراخ مشوية', sales: 15, revenue: '3,300 ج.م' },
  ];

  const getStatusBadge = (status: string) => {
    const map: Record<string, { label: string; icon: React.ReactElement; cls: string }> = {
      pending: { label: 'قيد المراجعة', icon: <FaClock />, cls: 'badge-warning' },
      cooking: { label: 'جاري التجهيز', icon: <FaUtensils />, cls: 'badge-info' },
      delivered: { label: 'تم التسليم', icon: <FaCheckCircle />, cls: 'badge-success' },
    };
    const s = map[status] || { label: 'غير معروف', icon: null, cls: 'badge-default' };
    return <span className={`d-badge ${s.cls}`}>{s.icon} {s.label}</span>;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show">
      {/* Page Header */}
      <motion.div variants={itemVariants} className="d-page-head">
        <div>
          <h2 className="d-heading">نظرة عامة</h2>
          <p className="d-subheading">ملخص نشاط المطعم اليوم · {new Date().toLocaleDateString('ar-EG', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
        </div>
      </motion.div>

      {/* ========== SMART PREDICTIONS ========== */}
      <motion.div variants={itemVariants} className="ai-section">
        <div className="ai-header">
          <div className="ai-header-right">
            <div className="ai-icon-wrap">
              <FaBrain />
            </div>
            <div>
              <h3 className="ai-title">التوقعات الذكية</h3>
              <p className="ai-sub">تحليل مبني على بيانات الأيام السابقة</p>
            </div>
          </div>
          <span className="ai-live-badge">
            <span className="ai-live-dot"></span> تحليل مباشر
          </span>
        </div>

        <div className="ai-body">
          {/* Predictions Cards */}
          <div className="ai-predictions">
            {predictions.map((pred, idx) => (
              <motion.div
                key={idx}
                className={`ai-pred-card ${activePrediction === idx ? 'active' : ''}`}
                onClick={() => setActivePrediction(idx)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="ai-pred-icon" style={{ background: pred.color + '18', color: pred.color }}>
                  {pred.icon}
                </div>
                <div className="ai-pred-content">
                  <h4 className="ai-pred-title">{pred.title}</h4>
                  <p className="ai-pred-desc">{pred.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Peak Hours Timeline */}
          <div className="ai-peak">
            <h4 className="ai-peak-title">أوقات الذروة المتوقعة اليوم</h4>
            <div className="ai-peak-chart">
              {peakHours.map((h, idx) => (
                <div className="ai-bar-col" key={idx}>
                  <div className="ai-bar-wrap">
                    <motion.div
                      className="ai-bar"
                      initial={{ height: 0 }}
                      animate={{ height: `${h.level}%` }}
                      transition={{ duration: 0.6, delay: idx * 0.05 }}
                      style={{
                        background: h.level >= 80
                          ? 'linear-gradient(180deg, #ef4444, #f87171)'
                          : h.level >= 60
                            ? 'linear-gradient(180deg, #f59e0b, #fbbf24)'
                            : 'linear-gradient(180deg, #c9a050, #e8c875)',
                      }}
                    />
                  </div>
                  <span className="ai-bar-label">{h.hour}</span>
                </div>
              ))}
            </div>
            <div className="ai-legend">
              <span className="ai-legend-item"><span className="ai-legend-dot" style={{ background: '#ef4444' }}></span> ذروة عالية</span>
              <span className="ai-legend-item"><span className="ai-legend-dot" style={{ background: '#f59e0b' }}></span> ذروة متوسطة</span>
              <span className="ai-legend-item"><span className="ai-legend-dot" style={{ background: '#c9a050' }}></span> عادي</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={itemVariants} className="d-stats-grid">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            className="d-stat-card"
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <div className="d-stat-icon" style={{ background: stat.bg, color: stat.color }}>
              {stat.icon}
            </div>
            <div className="d-stat-body">
              <span className="d-stat-label">{stat.title}</span>
              <div className="d-stat-row">
                <span className="d-stat-value">{stat.value}</span>
                <span className="d-stat-unit">{stat.unit}</span>
              </div>
            </div>
            <div className="d-stat-trend" style={{ color: stat.color }}>
              <FaArrowUp style={{ fontSize: '0.7rem' }} /> {stat.trend}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Grid: Recent Orders + Popular Items */}
      <div className="d-grid-2">
        <motion.div variants={itemVariants} className="d-card">
          <div className="d-card-head">
            <h3 className="d-card-title">أحدث الطلبات</h3>
            <button className="d-link-btn">عرض الكل</button>
          </div>
          <div className="d-card-body no-pad">
            <div className="d-table-wrap">
              <table className="d-table">
                <thead>
                  <tr>
                    <th>رقم الطلب</th>
                    <th>العميل</th>
                    <th>العناصر</th>
                    <th>المبلغ</th>
                    <th>الحالة</th>
                    <th>الوقت</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((o, idx) => (
                    <tr key={idx}>
                      <td className="d-bold d-gold">{o.id}</td>
                      <td className="d-bold">{o.customer}</td>
                      <td className="d-muted">{o.items}</td>
                      <td className="d-bold">{o.total}</td>
                      <td>{getStatusBadge(o.status)}</td>
                      <td className="d-muted d-sm">{o.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="d-card">
          <div className="d-card-head">
            <h3 className="d-card-title">الأكثر مبيعاً 🔥</h3>
          </div>
          <div className="d-card-body">
            <div className="d-pop-list">
              {popularItems.map((item, idx) => (
                <div className="d-pop-item" key={idx}>
                  <div className="d-pop-left">
                    <span className="d-pop-rank" style={{
                      background: idx === 0 ? 'linear-gradient(135deg, #c9a050, #e8c875)' : 'rgba(255,255,255,0.06)',
                      color: idx === 0 ? '#1a1d2e' : '#94a3b8'
                    }}>{idx + 1}</span>
                    <div>
                      <span className="d-pop-name">{item.name}</span>
                      <span className="d-pop-sales">{item.sales} طلب</span>
                    </div>
                  </div>
                  <span className="d-pop-rev">{item.revenue}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .d-page-head { margin-bottom: 28px; }
        .d-heading { font-size: 1.8rem; font-weight: 800; color: #f1f5f9; margin: 0 0 6px 0; }
        .d-subheading { color: #64748b; font-size: 0.95rem; margin: 0; }

        /* ========= AI PREDICTIONS SECTION ========= */
        .ai-section {
          background: linear-gradient(135deg, rgba(99,102,241,0.06) 0%, rgba(201,160,80,0.04) 100%);
          border: 1px solid rgba(99,102,241,0.15);
          border-radius: 16px;
          margin-bottom: 24px;
          overflow: hidden;
        }
        .ai-header {
          padding: 20px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .ai-header-right { display: flex; align-items: center; gap: 14px; }
        .ai-icon-wrap {
          width: 44px; height: 44px;
          background: linear-gradient(135deg, #6366f1, #818cf8);
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          color: #fff; font-size: 1.2rem;
        }
        .ai-title { font-size: 1.15rem; font-weight: 800; color: #f1f5f9; margin: 0; }
        .ai-sub { font-size: 0.78rem; color: #64748b; margin: 2px 0 0 0; }
        .ai-live-badge {
          display: flex; align-items: center; gap: 6px;
          background: rgba(16,185,129,0.1);
          color: #34d399; padding: 5px 14px;
          border-radius: 20px; font-size: 0.75rem; font-weight: 700;
        }
        .ai-live-dot {
          width: 7px; height: 7px; background: #34d399; border-radius: 50%;
          animation: aiPulse 1.5s ease-in-out infinite;
        }
        @keyframes aiPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }

        .ai-body { padding: 20px 24px; display: flex; gap: 20px; }

        /* Prediction Cards */
        .ai-predictions { flex: 1; display: flex; flex-direction: column; gap: 10px; min-width: 0; }
        .ai-pred-card {
          display: flex; align-items: flex-start; gap: 14px;
          padding: 14px 16px; border-radius: 12px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          cursor: pointer; transition: all 0.2s;
        }
        .ai-pred-card:hover { background: rgba(255,255,255,0.04); }
        .ai-pred-card.active {
          background: rgba(255,255,255,0.05);
          border-color: rgba(201,160,80,0.2);
        }
        .ai-pred-icon {
          width: 38px; height: 38px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem; flex-shrink: 0;
        }
        .ai-pred-content { flex: 1; min-width: 0; }
        .ai-pred-title { font-size: 0.88rem; font-weight: 700; color: #e2e8f0; margin: 0 0 4px 0; }
        .ai-pred-desc { font-size: 0.78rem; color: #64748b; margin: 0; line-height: 1.6; }

        /* Peak Hours Chart */
        .ai-peak {
          width: 320px; flex-shrink: 0;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 12px; padding: 16px;
        }
        .ai-peak-title { font-size: 0.85rem; font-weight: 700; color: #94a3b8; margin: 0 0 14px 0; }
        .ai-peak-chart {
          display: flex; align-items: flex-end; gap: 4px;
          height: 120px; margin-bottom: 10px;
        }
        .ai-bar-col { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 6px; }
        .ai-bar-wrap { width: 100%; height: 100px; display: flex; align-items: flex-end; }
        .ai-bar {
          width: 100%; border-radius: 4px 4px 0 0;
          min-height: 4px;
        }
        .ai-bar-label { font-size: 0.6rem; color: #64748b; white-space: nowrap; }
        .ai-legend { display: flex; gap: 14px; flex-wrap: wrap; }
        .ai-legend-item { display: flex; align-items: center; gap: 5px; font-size: 0.7rem; color: #64748b; }
        .ai-legend-dot { width: 8px; height: 8px; border-radius: 2px; }

        /* Stats Grid */
        .d-stats-grid {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 18px; margin-bottom: 28px;
        }
        .d-stat-card {
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06);
          border-radius: 14px; padding: 20px; display: flex; align-items: flex-start;
          gap: 14px; position: relative; backdrop-filter: blur(10px); cursor: default;
        }
        .d-stat-icon {
          width: 48px; height: 48px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.3rem; flex-shrink: 0;
        }
        .d-stat-body { flex: 1; min-width: 0; }
        .d-stat-label { display: block; color: #64748b; font-size: 0.85rem; font-weight: 600; margin-bottom: 6px; }
        .d-stat-row { display: flex; align-items: baseline; gap: 6px; }
        .d-stat-value { font-size: 1.6rem; font-weight: 800; color: #f1f5f9; line-height: 1; }
        .d-stat-unit { color: #64748b; font-size: 0.8rem; font-weight: 600; }
        .d-stat-trend {
          position: absolute; top: 16px; left: 16px;
          font-size: 0.78rem; font-weight: 700; display: flex; align-items: center; gap: 3px;
          background: rgba(255,255,255,0.04); padding: 4px 10px; border-radius: 20px;
        }

        .d-grid-2 { display: grid; grid-template-columns: 1.8fr 1fr; gap: 18px; }
        .d-card {
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06);
          border-radius: 14px; overflow: hidden;
        }
        .d-card-head {
          padding: 18px 22px; border-bottom: 1px solid rgba(255,255,255,0.06);
          display: flex; justify-content: space-between; align-items: center;
        }
        .d-card-title { font-size: 1.1rem; font-weight: 700; color: #f1f5f9; margin: 0; }
        .d-link-btn {
          background: none; border: none; color: #c9a050; font-weight: 700;
          cursor: pointer; font-size: 0.85rem; font-family: inherit; transition: opacity 0.2s;
        }
        .d-link-btn:hover { opacity: 0.7; }
        .d-card-body { padding: 18px 22px; }
        .d-card-body.no-pad { padding: 0; }

        .d-table-wrap { overflow-x: auto; }
        .d-table { width: 100%; border-collapse: collapse; text-align: right; }
        .d-table th {
          padding: 14px 20px; color: #64748b; font-weight: 600; font-size: 0.85rem;
          border-bottom: 1px solid rgba(255,255,255,0.06); white-space: nowrap;
        }
        .d-table td {
          padding: 14px 20px; border-bottom: 1px solid rgba(255,255,255,0.04);
          color: #cbd5e1; font-size: 0.9rem; white-space: nowrap;
        }
        .d-table tbody tr:hover { background: rgba(255,255,255,0.02); }
        .d-table tbody tr:last-child td { border-bottom: none; }
        .d-bold { font-weight: 700; color: #e2e8f0; }
        .d-gold { color: #c9a050 !important; }
        .d-muted { color: #64748b; }
        .d-sm { font-size: 0.8rem; }

        .d-badge {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 5px 12px; border-radius: 8px; font-size: 0.78rem;
          font-weight: 700; white-space: nowrap;
        }
        .badge-warning { background: rgba(245,158,11,0.15); color: #f59e0b; }
        .badge-info { background: rgba(99,102,241,0.15); color: #818cf8; }
        .badge-success { background: rgba(16,185,129,0.15); color: #34d399; }
        .badge-default { background: rgba(255,255,255,0.06); color: #94a3b8; }

        .d-pop-list { display: flex; flex-direction: column; gap: 16px; }
        .d-pop-item {
          display: flex; align-items: center; justify-content: space-between;
          padding: 12px 14px; background: rgba(255,255,255,0.02);
          border-radius: 10px; border: 1px solid rgba(255,255,255,0.04);
          transition: background 0.2s;
        }
        .d-pop-item:hover { background: rgba(255,255,255,0.04); }
        .d-pop-left { display: flex; align-items: center; gap: 12px; }
        .d-pop-rank {
          width: 32px; height: 32px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-weight: 800; font-size: 0.9rem; flex-shrink: 0;
        }
        .d-pop-name { display: block; font-weight: 700; color: #e2e8f0; font-size: 0.9rem; }
        .d-pop-sales { display: block; font-size: 0.78rem; color: #64748b; margin-top: 2px; }
        .d-pop-rev { font-weight: 800; color: #c9a050; font-size: 0.9rem; }

        @media (max-width: 1200px) {
          .d-stats-grid { grid-template-columns: repeat(2, 1fr); }
          .d-grid-2 { grid-template-columns: 1fr; }
          .ai-body { flex-direction: column; }
          .ai-peak { width: 100%; }
        }
        @media (max-width: 640px) {
          .d-stats-grid { grid-template-columns: 1fr; }
          .d-heading { font-size: 1.4rem; }
          .d-stat-value { font-size: 1.3rem; }
          .d-table th, .d-table td { padding: 10px 14px; font-size: 0.82rem; }
          .ai-header { flex-direction: column; gap: 10px; align-items: flex-start; }
        }
      `}</style>
    </motion.div>
  );
};

export default Dashboard;
