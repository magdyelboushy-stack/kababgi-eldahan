import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaMinus, FaShoppingCart, FaArrowLeft, FaFire, FaWeight } from 'react-icons/fa';
import { platterItems } from '../data/platterData';
import { Link } from 'react-router-dom';

interface Selection {
  id: string;
  weight: number; // in grams
}

const PlatterBuilder = () => {
  const [selections, setSelections] = useState<Selection[]>([]);

  const addItem = (itemId: string) => {
    const item = platterItems.find(i => i.id === itemId);
    if (!item) return;
    const existing = selections.find(s => s.id === itemId);
    if (existing) {
      if (existing.weight + item.stepWeight <= item.maxWeight) {
        setSelections(selections.map(s =>
          s.id === itemId ? { ...s, weight: s.weight + item.stepWeight } : s
        ));
      }
    } else {
      setSelections([...selections, { id: itemId, weight: item.minWeight }]);
    }
  };

  const removeItem = (itemId: string) => {
    const item = platterItems.find(i => i.id === itemId);
    if (!item) return;
    const existing = selections.find(s => s.id === itemId);
    if (!existing) return;
    if (existing.weight - item.stepWeight < item.minWeight) {
      setSelections(selections.filter(s => s.id !== itemId));
    } else {
      setSelections(selections.map(s =>
        s.id === itemId ? { ...s, weight: s.weight - item.stepWeight } : s
      ));
    }
  };

  const getWeight = (itemId: string) => {
    return selections.find(s => s.id === itemId)?.weight || 0;
  };

  const getItemPrice = (itemId: string) => {
    const item = platterItems.find(i => i.id === itemId);
    const weight = getWeight(itemId);
    if (!item || !weight) return 0;
    return Math.round((weight / 1000) * item.pricePerKg);
  };

  const totalWeight = useMemo(() => selections.reduce((acc, s) => acc + s.weight, 0), [selections]);
  const totalPrice = useMemo(() => selections.reduce((acc, s) => {
    const item = platterItems.find(i => i.id === s.id);
    if (!item) return acc;
    return acc + Math.round((s.weight / 1000) * item.pricePerKg);
  }, 0), [selections]);

  const formatWeight = (grams: number) => {
    if (grams >= 1000) return `${(grams / 1000).toFixed(grams % 1000 === 0 ? 0 : 1)} كيلو`;
    return `${grams} جرام`;
  };

  return (
    <motion.div
      className="platter-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ direction: 'rtl' }}
    >
      {/* Hero Section */}
      <div className="platter-hero">
        <div className="platter-hero-bg"></div>
        <div className="platter-hero-content">
          <Link to="/menu" className="platter-back"><FaArrowLeft /> رجوع للمنيو</Link>
          <motion.h1
            className="platter-title"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            صمّم الصينية بتاعتك 🔥
          </motion.h1>
          <motion.p
            className="platter-subtitle"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.35 }}
          >
            اختار الأصناف اللي تحبها، حدد الكمية، والسعر يتحسب تلقائي
          </motion.p>
        </div>
      </div>

      <div className="platter-layout">
        {/* Items Selection */}
        <div className="platter-items-section">
          <h2 className="section-label">اختار الأصناف</h2>
          <div className="platter-grid">
            {platterItems.map((item) => {
              const weight = getWeight(item.id);
              const isSelected = weight > 0;
              const price = getItemPrice(item.id);

              return (
                <motion.div
                  key={item.id}
                  className={`platter-item-card ${isSelected ? 'selected' : ''}`}
                  layout
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="pi-img-wrap">
                    <img src={item.image} alt={item.name} className="pi-img" />
                    {isSelected && (
                      <motion.div
                        className="pi-selected-badge"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      >
                        ✓
                      </motion.div>
                    )}
                    <span className="pi-price-tag">{item.pricePerKg} ج.م/كيلو</span>
                  </div>

                  <div className="pi-body">
                    <h3 className="pi-name">{item.name}</h3>
                    <p className="pi-desc">{item.description}</p>

                    {/* Weight Controls */}
                    <div className="pi-controls">
                      <button
                        className="pi-btn minus"
                        onClick={() => removeItem(item.id)}
                        disabled={!isSelected}
                      >
                        <FaMinus />
                      </button>

                      <div className="pi-weight-display">
                        {isSelected ? (
                          <>
                            <span className="pi-weight-val">{formatWeight(weight)}</span>
                            <span className="pi-weight-price">{price} ج.م</span>
                          </>
                        ) : (
                          <span className="pi-weight-empty">اضغط + للإضافة</span>
                        )}
                      </div>

                      <button
                        className="pi-btn plus"
                        onClick={() => addItem(item.id)}
                        disabled={weight >= item.maxWeight}
                      >
                        <FaPlus />
                      </button>
                    </div>

                    {/* Weight Progress Bar */}
                    {isSelected && (
                      <motion.div
                        className="pi-progress-wrap"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                      >
                        <div className="pi-progress-bar">
                          <motion.div
                            className="pi-progress-fill"
                            initial={{ width: 0 }}
                            animate={{ width: `${(weight / item.maxWeight) * 100}%` }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                        <div className="pi-progress-labels">
                          <span>{formatWeight(item.minWeight)}</span>
                          <span>{formatWeight(item.maxWeight)}</span>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Summary Sidebar */}
        <div className="platter-summary">
          <div className="summary-card">
            <div className="summary-head">
              <FaFire className="summary-fire" />
              <h3 className="summary-title">ملخص الصينية</h3>
            </div>

            <div className="summary-body">
              <AnimatePresence>
                {selections.length === 0 ? (
                  <motion.div
                    className="summary-empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <span className="summary-empty-icon">🍽️</span>
                    <p>لسا ما اخترت أصناف</p>
                    <span className="summary-empty-hint">اختار من الأصناف على الشمال وابدأ بناء الصينية</span>
                  </motion.div>
                ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="summary-items">
                      {selections.map(sel => {
                        const item = platterItems.find(i => i.id === sel.id);
                        if (!item) return null;
                        const itemPrice = Math.round((sel.weight / 1000) * item.pricePerKg);
                        return (
                          <motion.div
                            key={sel.id}
                            className="summary-row"
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -20, opacity: 0 }}
                            layout
                          >
                            <div className="sr-info">
                              <span className="sr-name">{item.name}</span>
                              <span className="sr-weight">{formatWeight(sel.weight)}</span>
                            </div>
                            <span className="sr-price">{itemPrice} ج.م</span>
                          </motion.div>
                        );
                      })}
                    </div>

                    <div className="summary-divider"></div>

                    <div className="summary-totals">
                      <div className="st-row">
                        <span className="st-label"><FaWeight style={{ marginLeft: 6 }} /> الوزن الكلي</span>
                        <span className="st-value">{formatWeight(totalWeight)}</span>
                      </div>
                      <div className="st-row total">
                        <span className="st-label">الإجمالي</span>
                        <span className="st-value gold">{totalPrice} ج.م</span>
                      </div>
                    </div>

                    <button className="summary-add-btn">
                      <FaShoppingCart style={{ marginLeft: 8 }} />
                      أضف الصينية للسلة
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Floating Summary */}
      {selections.length > 0 && (
        <motion.div
          className="mobile-summary-bar"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
        >
          <div className="msb-info">
            <span className="msb-count">{selections.length} صنف</span>
            <span className="msb-weight">{formatWeight(totalWeight)}</span>
          </div>
          <div className="msb-price">{totalPrice} ج.م</div>
          <button className="msb-btn"><FaShoppingCart /> أضف للسلة</button>
        </motion.div>
      )}

      <style>{`
        .platter-page {
          min-height: 100vh;
          background: var(--bg-darker, #0a0c10);
          color: #e2e8f0;
          font-family: 'Cairo', sans-serif;
        }

        /* Hero */
        .platter-hero {
          position: relative;
          padding: 60px 24px 40px;
          text-align: center;
          overflow: hidden;
        }
        .platter-hero-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(201,160,80,0.08) 0%, transparent 100%);
        }
        .platter-hero-content { position: relative; max-width: 700px; margin: 0 auto; }
        .platter-back {
          display: inline-flex; align-items: center; gap: 8px;
          color: #c9a050; text-decoration: none; font-weight: 700;
          font-size: 0.9rem; margin-bottom: 20px;
          transition: opacity 0.2s;
        }
        .platter-back:hover { opacity: 0.7; }
        .platter-title {
          font-size: 2.2rem;
          font-weight: 900;
          color: #f1f5f9;
          margin: 0 0 12px 0;
          line-height: 1.3;
        }
        .platter-subtitle {
          color: #64748b;
          font-size: 1.05rem;
          margin: 0;
          line-height: 1.6;
        }

        /* Layout */
        .platter-layout {
          max-width: 1300px;
          margin: 0 auto;
          padding: 0 24px 100px;
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 28px;
          align-items: start;
        }

        .section-label {
          font-size: 1.2rem;
          font-weight: 800;
          color: #f1f5f9;
          margin: 0 0 18px 0;
        }

        /* Items Grid */
        .platter-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 16px;
        }

        /* Item Card */
        .platter-item-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          overflow: hidden;
          transition: border-color 0.2s;
        }
        .platter-item-card.selected {
          border-color: rgba(201,160,80,0.35);
          background: rgba(201,160,80,0.03);
        }

        .pi-img-wrap {
          position: relative;
          height: 160px;
          overflow: hidden;
        }
        .pi-img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.3s;
        }
        .platter-item-card:hover .pi-img { transform: scale(1.05); }
        .pi-selected-badge {
          position: absolute; top: 10px; right: 10px;
          width: 28px; height: 28px;
          background: linear-gradient(135deg, #c9a050, #e8c875);
          color: #1a1d2e; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-weight: 800; font-size: 0.85rem;
        }
        .pi-price-tag {
          position: absolute; bottom: 10px; left: 10px;
          background: rgba(0,0,0,0.7);
          backdrop-filter: blur(6px);
          padding: 4px 12px; border-radius: 20px;
          font-size: 0.72rem; font-weight: 700; color: #e8c875;
        }

        .pi-body { padding: 16px; }
        .pi-name { font-size: 1.05rem; font-weight: 700; color: #f1f5f9; margin: 0 0 4px 0; }
        .pi-desc { font-size: 0.78rem; color: #64748b; margin: 0 0 14px 0; }

        /* Controls */
        .pi-controls {
          display: flex; align-items: center; gap: 10px;
        }
        .pi-btn {
          width: 38px; height: 38px;
          border-radius: 10px; border: none;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; font-size: 0.85rem;
          transition: all 0.2s;
        }
        .pi-btn.plus {
          background: linear-gradient(135deg, #c9a050, #e8c875);
          color: #1a1d2e;
        }
        .pi-btn.plus:hover { box-shadow: 0 4px 12px rgba(201,160,80,0.3); }
        .pi-btn.plus:disabled { opacity: 0.3; cursor: default; box-shadow: none; }
        .pi-btn.minus {
          background: rgba(255,255,255,0.06);
          color: #94a3b8;
        }
        .pi-btn.minus:hover:not(:disabled) { background: rgba(239,68,68,0.15); color: #f87171; }
        .pi-btn.minus:disabled { opacity: 0.2; cursor: default; }

        .pi-weight-display {
          flex: 1; text-align: center;
          display: flex; flex-direction: column; gap: 2px;
        }
        .pi-weight-val { font-size: 0.95rem; font-weight: 800; color: #e2e8f0; }
        .pi-weight-price { font-size: 0.75rem; color: #c9a050; font-weight: 700; }
        .pi-weight-empty { font-size: 0.78rem; color: #475569; }

        /* Progress Bar */
        .pi-progress-wrap { margin-top: 12px; }
        .pi-progress-bar {
          height: 4px; background: rgba(255,255,255,0.06);
          border-radius: 10px; overflow: hidden;
        }
        .pi-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #c9a050, #e8c875);
          border-radius: 10px;
        }
        .pi-progress-labels {
          display: flex; justify-content: space-between;
          font-size: 0.65rem; color: #475569; margin-top: 4px;
        }

        /* ======= SUMMARY SIDEBAR ======= */
        .platter-summary {
          position: sticky;
          top: 20px;
        }
        .summary-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          overflow: hidden;
        }
        .summary-head {
          padding: 18px 20px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          display: flex; align-items: center; gap: 10px;
        }
        .summary-fire { color: #c9a050; font-size: 1.2rem; }
        .summary-title { font-size: 1.05rem; font-weight: 800; color: #f1f5f9; margin: 0; }

        .summary-body { padding: 20px; }

        .summary-empty {
          text-align: center; padding: 24px 0;
        }
        .summary-empty-icon { font-size: 2.5rem; display: block; margin-bottom: 10px; }
        .summary-empty p { color: #94a3b8; font-weight: 700; margin: 0 0 5px 0; }
        .summary-empty-hint { font-size: 0.78rem; color: #475569; }

        .summary-items { display: flex; flex-direction: column; gap: 10px; }
        .summary-row {
          display: flex; justify-content: space-between; align-items: center;
          padding: 10px 12px;
          background: rgba(255,255,255,0.02);
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.04);
        }
        .sr-info { display: flex; flex-direction: column; }
        .sr-name { font-weight: 700; font-size: 0.88rem; color: #e2e8f0; }
        .sr-weight { font-size: 0.75rem; color: #64748b; margin-top: 2px; }
        .sr-price { font-weight: 800; color: #c9a050; font-size: 0.9rem; }

        .summary-divider {
          height: 1px; background: rgba(255,255,255,0.06);
          margin: 16px 0;
        }

        .summary-totals { display: flex; flex-direction: column; gap: 10px; margin-bottom: 18px; }
        .st-row {
          display: flex; justify-content: space-between; align-items: center;
        }
        .st-label { color: #94a3b8; font-weight: 600; font-size: 0.88rem; display: flex; align-items: center; }
        .st-value { font-weight: 700; color: #e2e8f0; font-size: 0.95rem; }
        .st-row.total {
          padding: 12px 14px;
          background: rgba(201,160,80,0.06);
          border: 1px solid rgba(201,160,80,0.15);
          border-radius: 10px;
        }
        .st-value.gold { color: #c9a050; font-size: 1.15rem; font-weight: 800; }

        .summary-add-btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #c9a050, #e8c875);
          color: #1a1d2e;
          border: none; border-radius: 12px;
          font-size: 1rem; font-weight: 800;
          cursor: pointer; font-family: inherit;
          transition: all 0.2s;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 15px rgba(201,160,80,0.25);
        }
        .summary-add-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(201,160,80,0.35); }

        /* Mobile Floating Bar */
        .mobile-summary-bar {
          display: none;
          position: fixed; bottom: 0; left: 0; right: 0;
          background: #1e2030;
          border-top: 1px solid rgba(201,160,80,0.2);
          padding: 12px 20px;
          align-items: center; justify-content: space-between;
          z-index: 100;
          box-shadow: 0 -4px 20px rgba(0,0,0,0.3);
        }
        .msb-info { display: flex; flex-direction: column; }
        .msb-count { font-weight: 700; font-size: 0.85rem; color: #e2e8f0; }
        .msb-weight { font-size: 0.72rem; color: #64748b; }
        .msb-price { font-weight: 800; color: #c9a050; font-size: 1.15rem; }
        .msb-btn {
          display: flex; align-items: center; gap: 6px;
          background: linear-gradient(135deg, #c9a050, #e8c875);
          color: #1a1d2e; border: none;
          padding: 10px 20px; border-radius: 10px;
          font-weight: 700; font-size: 0.85rem;
          cursor: pointer; font-family: inherit;
        }

        /* Responsive */
        @media (max-width: 900px) {
          .platter-layout {
            grid-template-columns: 1fr;
          }
          .platter-summary { position: static; display: none; }
          .mobile-summary-bar { display: flex; }
          .platter-title { font-size: 1.6rem; }
        }
        @media (max-width: 600px) {
          .platter-grid { grid-template-columns: 1fr; }
          .platter-hero { padding: 40px 16px 30px; }
          .platter-layout { padding: 0 16px 80px; }
        }
      `}</style>
    </motion.div>
  );
};

export default PlatterBuilder;
