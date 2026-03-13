import { motion } from 'framer-motion';
import { FaMoneyBillWave, FaShoppingBag, FaUsers, FaArrowUp, FaClock, FaCheckCircle, FaUtensils, FaChartLine } from 'react-icons/fa';

const Dashboard = () => {
  const stats = [
    { title: 'أرباح اليوم', value: '14,500', unit: 'ج.م', icon: <FaMoneyBillWave />, color: '#10b981', bg: 'rgba(16,185,129,0.1)', trend: '+15%' },
    { title: 'الطلبات الجديدة', value: '45', unit: 'طلب', icon: <FaShoppingBag />, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', trend: '+5%' },
    { title: 'إجمالي العملاء', value: '1,240', unit: 'عميل', icon: <FaUsers />, color: '#6366f1', bg: 'rgba(99,102,241,0.1)', trend: '+8%' },
    { title: 'معدل الرضا', value: '96', unit: '%', icon: <FaChartLine />, color: '#ec4899', bg: 'rgba(236,72,153,0.1)', trend: '+2%' },
  ];

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
    const map: Record<string, { label: string; icon: JSX.Element; cls: string }> = {
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
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
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
        /* Page Header */
        .d-page-head {
          margin-bottom: 28px;
        }
        .d-heading {
          font-size: 1.8rem;
          font-weight: 800;
          color: #f1f5f9;
          margin: 0 0 6px 0;
        }
        .d-subheading {
          color: #64748b;
          font-size: 0.95rem;
          margin: 0;
        }

        /* Stats Grid */
        .d-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
          margin-bottom: 28px;
        }
        .d-stat-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 14px;
          padding: 20px;
          display: flex;
          align-items: flex-start;
          gap: 14px;
          position: relative;
          backdrop-filter: blur(10px);
          cursor: default;
        }
        .d-stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3rem;
          flex-shrink: 0;
        }
        .d-stat-body { flex: 1; min-width: 0; }
        .d-stat-label {
          display: block;
          color: #64748b;
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 6px;
        }
        .d-stat-row { display: flex; align-items: baseline; gap: 6px; }
        .d-stat-value {
          font-size: 1.6rem;
          font-weight: 800;
          color: #f1f5f9;
          line-height: 1;
        }
        .d-stat-unit { color: #64748b; font-size: 0.8rem; font-weight: 600; }
        .d-stat-trend {
          position: absolute;
          top: 16px;
          left: 16px;
          font-size: 0.78rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 3px;
          background: rgba(255,255,255,0.04);
          padding: 4px 10px;
          border-radius: 20px;
        }

        /* Grid Layout */
        .d-grid-2 {
          display: grid;
          grid-template-columns: 1.8fr 1fr;
          gap: 18px;
        }

        /* Cards */
        .d-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 14px;
          overflow: hidden;
        }
        .d-card-head {
          padding: 18px 22px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .d-card-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: #f1f5f9;
          margin: 0;
        }
        .d-link-btn {
          background: none;
          border: none;
          color: #c9a050;
          font-weight: 700;
          cursor: pointer;
          font-size: 0.85rem;
          font-family: inherit;
          transition: opacity 0.2s;
        }
        .d-link-btn:hover { opacity: 0.7; }
        .d-card-body { padding: 18px 22px; }
        .d-card-body.no-pad { padding: 0; }

        /* Table */
        .d-table-wrap { overflow-x: auto; }
        .d-table {
          width: 100%;
          border-collapse: collapse;
          text-align: right;
        }
        .d-table th {
          padding: 14px 20px;
          color: #64748b;
          font-weight: 600;
          font-size: 0.85rem;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          white-space: nowrap;
        }
        .d-table td {
          padding: 14px 20px;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          color: #cbd5e1;
          font-size: 0.9rem;
          white-space: nowrap;
        }
        .d-table tbody tr:hover { background: rgba(255,255,255,0.02); }
        .d-table tbody tr:last-child td { border-bottom: none; }
        .d-bold { font-weight: 700; color: #e2e8f0; }
        .d-gold { color: #c9a050 !important; }
        .d-muted { color: #64748b; }
        .d-sm { font-size: 0.8rem; }

        /* Badges */
        .d-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 5px 12px;
          border-radius: 8px;
          font-size: 0.78rem;
          font-weight: 700;
          white-space: nowrap;
        }
        .badge-warning { background: rgba(245,158,11,0.15); color: #f59e0b; }
        .badge-info { background: rgba(99,102,241,0.15); color: #818cf8; }
        .badge-success { background: rgba(16,185,129,0.15); color: #34d399; }
        .badge-default { background: rgba(255,255,255,0.06); color: #94a3b8; }

        /* Popular List */
        .d-pop-list { display: flex; flex-direction: column; gap: 16px; }
        .d-pop-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 14px;
          background: rgba(255,255,255,0.02);
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.04);
          transition: background 0.2s;
        }
        .d-pop-item:hover { background: rgba(255,255,255,0.04); }
        .d-pop-left { display: flex; align-items: center; gap: 12px; }
        .d-pop-rank {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 0.9rem;
          flex-shrink: 0;
        }
        .d-pop-name { display: block; font-weight: 700; color: #e2e8f0; font-size: 0.9rem; }
        .d-pop-sales { display: block; font-size: 0.78rem; color: #64748b; margin-top: 2px; }
        .d-pop-rev { font-weight: 800; color: #c9a050; font-size: 0.9rem; }

        /* Responsive */
        @media (max-width: 1200px) {
          .d-stats-grid { grid-template-columns: repeat(2, 1fr); }
          .d-grid-2 { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .d-stats-grid { grid-template-columns: 1fr; }
          .d-heading { font-size: 1.4rem; }
          .d-stat-value { font-size: 1.3rem; }
          .d-table th, .d-table td { padding: 10px 14px; font-size: 0.82rem; }
        }
      `}</style>
    </motion.div>
  );
};

export default Dashboard;
