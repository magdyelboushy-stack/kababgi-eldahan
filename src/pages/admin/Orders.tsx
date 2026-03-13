import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEye, FaCheckCircle, FaClock, FaMotorcycle, FaTimesCircle, FaSearch, FaUtensils, FaTimes } from 'react-icons/fa';

const initialOrders = [
  { id: 'ORD-1024', customer: 'أحمد محمود', phone: '01012345678', items: ['كباب وكفتة (x2)', 'سلطة طحينة (x2)'], total: 720, status: 'pending', time: '14:30', address: 'التجمع الخامس, شارع التسعين' },
  { id: 'ORD-1023', customer: 'سارة خالد', phone: '01198765432', items: ['وجبة ميكس جريل (x1)'], total: 450, status: 'cooking', time: '14:15', address: 'مدينة نصر, مكرم عبيد' },
  { id: 'ORD-1022', customer: 'محمد علي', phone: '01234567890', items: ['نص فرخة مشوية (x3)', 'أرز بسمتي (x3)'], total: 390, status: 'on_way', time: '13:45', address: 'المعادي, شارع 9' },
  { id: 'ORD-1021', customer: 'نور الدين', phone: '01555555555', items: ['طرب ضاني (x1)'], total: 380, status: 'delivered', time: '13:00', address: 'الرحاب, بوابة 6' },
  { id: 'ORD-1020', customer: 'ياسين أحمد', phone: '01011122233', items: ['شيش طاووق (x2)'], total: 360, status: 'cancelled', time: '12:30', address: 'مصر الجديدة' },
];

const statusFilters = [
  { value: 'all', label: 'الكل', color: '#94a3b8' },
  { value: 'pending', label: 'قيد المراجعة', color: '#f59e0b' },
  { value: 'cooking', label: 'جاري التجهيز', color: '#818cf8' },
  { value: 'on_way', label: 'في الطريق', color: '#38bdf8' },
  { value: 'delivered', label: 'تم التسليم', color: '#34d399' },
  { value: 'cancelled', label: 'ملغي', color: '#f87171' },
];

const Orders = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const filteredOrders = orders.filter(o =>
    (filter === 'all' || o.status === filter) &&
    (o.customer.includes(searchTerm) || o.id.includes(searchTerm) || o.phone.includes(searchTerm))
  );

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const getStatusBadge = (status: string) => {
    const map: Record<string, { label: string; icon: React.ReactElement; cls: string }> = {
      pending: { label: 'قيد المراجعة', icon: <FaClock />, cls: 'o-badge-warning' },
      cooking: { label: 'جاري التجهيز', icon: <FaUtensils />, cls: 'o-badge-info' },
      on_way: { label: 'في الطريق', icon: <FaMotorcycle />, cls: 'o-badge-primary' },
      delivered: { label: 'تم التسليم', icon: <FaCheckCircle />, cls: 'o-badge-success' },
      cancelled: { label: 'ملغي', icon: <FaTimesCircle />, cls: 'o-badge-danger' },
    };
    const s = map[status] || { label: 'غير معروف', icon: null, cls: '' };
    return <span className={`o-badge ${s.cls}`}>{s.icon} {s.label}</span>;
  };

  const getOrderCount = (status: string) => {
    if (status === 'all') return orders.length;
    return orders.filter(o => o.status === status).length;
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Page Header */}
      <div className="o-page-head">
        <div>
          <h2 className="o-heading">إدارة الطلبات</h2>
          <p className="o-subheading">متابعة وتحديث حالة الطلبات · {filteredOrders.length} طلب</p>
        </div>
      </div>

      {/* Filters */}
      <div className="o-filters-bar">
        <div className="o-search">
          <FaSearch className="o-search-icon" />
          <input
            type="text"
            placeholder="ابحث بالاسم، رقم الطلب، أو التليفون..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="o-search-input"
          />
        </div>
        <div className="o-filter-pills">
          {statusFilters.map(sf => (
            <button
              key={sf.value}
              className={`o-pill ${filter === sf.value ? 'active' : ''}`}
              onClick={() => setFilter(sf.value)}
              style={filter === sf.value ? { background: sf.color + '20', color: sf.color, borderColor: sf.color + '40' } : {}}
            >
              {sf.label}
              <span className="o-pill-count">{getOrderCount(sf.value)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="o-card">
        <div className="o-table-wrap">
          <table className="o-table">
            <thead>
              <tr>
                <th>رقم الطلب</th>
                <th>العميل</th>
                <th>التليفون</th>
                <th>الإجمالي</th>
                <th>الحالة</th>
                <th>الوقت</th>
                <th>إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td className="o-bold o-gold">{order.id}</td>
                  <td className="o-bold">{order.customer}</td>
                  <td className="o-muted" dir="ltr" style={{ textAlign: 'right' }}>{order.phone}</td>
                  <td className="o-bold">{order.total} ج.م</td>
                  <td>{getStatusBadge(order.status)}</td>
                  <td className="o-muted o-sm">{order.time}</td>
                  <td>
                    <button
                      className="o-eye-btn"
                      onClick={() => setSelectedOrder(order)}
                      title="عرض التفاصيل"
                    >
                      <FaEye />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={7} className="o-empty">لا توجد طلبات مطابقة للبحث</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <motion.div
            className="o-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedOrder(null)}
          >
            <motion.div
              className="o-modal"
              initial={{ scale: 0.92, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 30 }}
              transition={{ type: 'spring', duration: 0.4 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="o-modal-head">
                <div>
                  <h3 className="o-modal-title">تفاصيل الطلب</h3>
                  <span className="o-modal-id">{selectedOrder.id}</span>
                </div>
                <button className="o-close" onClick={() => setSelectedOrder(null)}>
                  <FaTimes />
                </button>
              </div>

              <div className="o-modal-body">
                {/* Customer Info */}
                <div className="o-info-grid">
                  <div className="o-info-box">
                    <label>العميل</label>
                    <p>{selectedOrder.customer}</p>
                  </div>
                  <div className="o-info-box">
                    <label>التليفون</label>
                    <p dir="ltr" style={{ textAlign: 'right' }}>{selectedOrder.phone}</p>
                  </div>
                  <div className="o-info-box full">
                    <label>عنوان التوصيل</label>
                    <p>{selectedOrder.address}</p>
                  </div>
                </div>

                {/* Items */}
                <div className="o-section">
                  <h4 className="o-section-title">الأصناف المطلوبة</h4>
                  <div className="o-items-list">
                    {selectedOrder.items.map((item: string, idx: number) => (
                      <div className="o-item-row" key={idx}>
                        <span className="o-item-dot"></span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="o-total-row">
                    <span>الإجمالي</span>
                    <span className="o-total-val">{selectedOrder.total} ج.م</span>
                  </div>
                </div>

                {/* Status Update */}
                <div className="o-section">
                  <h4 className="o-section-title">تحديث الحالة</h4>
                  <div className="o-status-grid">
                    {[
                      { key: 'pending', label: 'قيد المراجعة', color: '#f59e0b' },
                      { key: 'cooking', label: 'جاري التجهيز', color: '#818cf8' },
                      { key: 'on_way', label: 'في الطريق', color: '#38bdf8' },
                      { key: 'delivered', label: 'تم التسليم', color: '#34d399' },
                      { key: 'cancelled', label: 'إلغاء', color: '#f87171' },
                    ].map(s => (
                      <button
                        key={s.key}
                        className={`o-status-btn ${selectedOrder.status === s.key ? 'active' : ''}`}
                        style={selectedOrder.status === s.key ? { background: s.color, borderColor: s.color, color: '#0f1117' } : {}}
                        onClick={() => handleStatusChange(selectedOrder.id, s.key)}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .o-page-head { margin-bottom: 24px; }
        .o-heading {
          font-size: 1.8rem; font-weight: 800; color: #f1f5f9; margin: 0 0 6px 0;
        }
        .o-subheading { color: #64748b; font-size: 0.95rem; margin: 0; }

        /* Filters Bar */
        .o-filters-bar {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 14px;
          padding: 18px;
          margin-bottom: 18px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .o-search {
          position: relative;
          width: 100%;
        }
        .o-search-icon {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #475569;
          font-size: 0.9rem;
        }
        .o-search-input {
          width: 100%;
          padding: 12px 40px 12px 14px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          color: #e2e8f0;
          font-family: inherit;
          font-size: 0.9rem;
          transition: border-color 0.2s;
          box-sizing: border-box;
        }
        .o-search-input::placeholder { color: #475569; }
        .o-search-input:focus {
          outline: none;
          border-color: rgba(201,160,80,0.4);
        }

        .o-filter-pills {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .o-pill {
          padding: 6px 14px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          color: #94a3b8;
          font-family: inherit;
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .o-pill:hover { background: rgba(255,255,255,0.06); }
        .o-pill-count {
          background: rgba(255,255,255,0.06);
          padding: 1px 7px;
          border-radius: 10px;
          font-size: 0.72rem;
          font-weight: 800;
        }

        /* Card & Table */
        .o-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 14px;
          overflow: hidden;
        }
        .o-table-wrap { overflow-x: auto; }
        .o-table {
          width: 100%; border-collapse: collapse; text-align: right;
        }
        .o-table th {
          padding: 14px 20px; color: #64748b; font-weight: 600;
          font-size: 0.82rem; border-bottom: 1px solid rgba(255,255,255,0.06);
          white-space: nowrap; background: rgba(255,255,255,0.01);
        }
        .o-table td {
          padding: 14px 20px; border-bottom: 1px solid rgba(255,255,255,0.04);
          color: #cbd5e1; font-size: 0.88rem; white-space: nowrap;
        }
        .o-table tbody tr { transition: background 0.15s; }
        .o-table tbody tr:hover { background: rgba(255,255,255,0.02); }
        .o-table tbody tr:last-child td { border-bottom: none; }
        .o-bold { font-weight: 700; color: #e2e8f0; }
        .o-gold { color: #c9a050 !important; }
        .o-muted { color: #64748b; }
        .o-sm { font-size: 0.8rem; }

        .o-eye-btn {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          color: #94a3b8;
          width: 34px; height: 34px;
          border-radius: 8px;
          display: inline-flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.2s;
        }
        .o-eye-btn:hover { background: #c9a050; color: #0f1117; border-color: #c9a050; }

        .o-empty {
          text-align: center; padding: 40px 20px !important;
          color: #64748b; font-size: 0.95rem;
        }

        /* Badges */
        .o-badge {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 5px 12px; border-radius: 8px;
          font-size: 0.76rem; font-weight: 700; white-space: nowrap;
        }
        .o-badge-warning { background: rgba(245,158,11,0.12); color: #f59e0b; }
        .o-badge-info { background: rgba(129,140,248,0.12); color: #818cf8; }
        .o-badge-primary { background: rgba(56,189,248,0.12); color: #38bdf8; }
        .o-badge-success { background: rgba(52,211,153,0.12); color: #34d399; }
        .o-badge-danger { background: rgba(248,113,113,0.12); color: #f87171; }

        /* Modal */
        .o-modal-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.7);
          backdrop-filter: blur(6px);
          z-index: 3000;
          display: flex; align-items: center; justify-content: center;
          padding: 20px;
        }
        .o-modal {
          background: #1e2030;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 18px;
          width: 100%; max-width: 580px;
          max-height: 85vh; overflow-y: auto;
          box-shadow: 0 25px 60px rgba(0,0,0,0.4);
        }
        .o-modal::-webkit-scrollbar { width: 4px; }
        .o-modal::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 10px; }

        .o-modal-head {
          display: flex; justify-content: space-between; align-items: center;
          padding: 22px 24px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .o-modal-title { margin: 0; font-size: 1.2rem; font-weight: 800; color: #f1f5f9; }
        .o-modal-id { font-size: 0.8rem; color: #c9a050; font-weight: 700; }
        .o-close {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          color: #94a3b8; width: 36px; height: 36px;
          border-radius: 10px; display: flex; align-items: center;
          justify-content: center; cursor: pointer; transition: all 0.2s;
          font-size: 1rem;
        }
        .o-close:hover { background: #ef4444; color: #fff; border-color: #ef4444; }
        .o-modal-body { padding: 24px; }

        .o-info-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 12px; margin-bottom: 24px;
        }
        .o-info-box {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          padding: 14px; border-radius: 10px;
        }
        .o-info-box.full { grid-column: 1 / -1; }
        .o-info-box label { display: block; font-size: 0.78rem; color: #64748b; margin-bottom: 4px; font-weight: 600; }
        .o-info-box p { margin: 0; font-weight: 700; color: #e2e8f0; font-size: 0.95rem; }

        .o-section { margin-bottom: 24px; }
        .o-section:last-child { margin-bottom: 0; }
        .o-section-title {
          font-size: 0.95rem; font-weight: 700; color: #c9a050;
          margin: 0 0 14px 0; padding-bottom: 8px;
          border-bottom: 1px solid rgba(201,160,80,0.2);
        }

        .o-items-list { display: flex; flex-direction: column; gap: 8px; margin-bottom: 14px; }
        .o-item-row {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 14px;
          background: rgba(255,255,255,0.02);
          border-radius: 8px; font-weight: 600; color: #cbd5e1;
        }
        .o-item-dot {
          width: 6px; height: 6px;
          background: #c9a050; border-radius: 50%;
          flex-shrink: 0;
        }

        .o-total-row {
          display: flex; justify-content: space-between;
          padding: 14px 16px;
          background: rgba(201,160,80,0.08);
          border: 1px solid rgba(201,160,80,0.15);
          border-radius: 10px; font-size: 1.05rem;
          color: #e2e8f0;
        }
        .o-total-val { font-weight: 800; color: #c9a050; }

        .o-status-grid {
          display: flex; flex-wrap: wrap; gap: 8px;
        }
        .o-status-btn {
          padding: 9px 16px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 8px; cursor: pointer;
          font-weight: 700; color: #94a3b8;
          font-family: inherit; font-size: 0.85rem;
          transition: all 0.2s;
        }
        .o-status-btn:hover { background: rgba(255,255,255,0.08); }
        .o-status-btn.active { font-weight: 800; }

        @media (max-width: 768px) {
          .o-heading { font-size: 1.4rem; }
          .o-table th, .o-table td { padding: 10px 14px; font-size: 0.8rem; }
          .o-info-grid { grid-template-columns: 1fr; }
          .o-modal { max-width: 100%; margin: 0 8px; }
        }
        @media (max-width: 480px) {
          .o-filter-pills { gap: 6px; }
          .o-pill { padding: 5px 10px; font-size: 0.75rem; }
        }
      `}</style>
    </motion.div>
  );
};

export default Orders;
