import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaTimes, FaImage, FaStar } from 'react-icons/fa';
import { menuItems as initialProducts, menuCategories } from '../../data/menuData';

const Products = () => {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '', category: 'meat', price: '', desc: '', calories: '', image: '', popular: false
  });

  const filteredProducts = products.filter(p =>
    (categoryFilter === 'all' || p.category === categoryFilter) &&
    (p.name.includes(searchTerm) || p.desc.includes(searchTerm))
  );

  const handleOpenModal = (product: any = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name, category: product.category,
        price: product.price.toString(), desc: product.desc,
        calories: product.calories || '', image: product.image,
        popular: product.popular || false
      });
    } else {
      setEditingProduct(null);
      setFormData({ name: '', category: 'meat', price: '', desc: '', calories: '', image: '', popular: false });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      setProducts(products.map(p =>
        p.id === editingProduct.id
          ? { ...p, ...formData, price: Number(formData.price) }
          : p
      ));
    } else {
      const newProduct = {
        id: Date.now(),
        ...formData,
        longDesc: formData.desc,
        features: ['طعم أصيل', 'مكونات طازجة'],
        price: Number(formData.price)
      };
      setProducts([newProduct as any, ...products]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const getCategoryName = (catId: string) => menuCategories.find(c => c.id === catId)?.name || catId;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Header */}
      <div className="p-page-head">
        <div>
          <h2 className="p-heading">إدارة المنيو</h2>
          <p className="p-subheading">إضافة وتعديل وحذف الأصناف · {filteredProducts.length} منتج</p>
        </div>
        <button className="p-add-btn" onClick={() => handleOpenModal()}>
          <FaPlus /> إضافة منتج
        </button>
      </div>

      {/* Filters */}
      <div className="p-filters">
        <div className="p-search">
          <FaSearch className="p-search-icon" />
          <input
            type="text"
            placeholder="ابحث باسم المنتج أو الوصف..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-search-input"
          />
        </div>
        <select
          className="p-select"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          {menuCategories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      {/* Products Grid */}
      <div className="p-products-grid">
        {filteredProducts.length > 0 ? filteredProducts.map((product) => (
          <motion.div
            key={product.id}
            className="p-product-card"
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-card-img-wrap">
              <img src={product.image} alt={product.name} className="p-card-img" />
              {product.popular && (
                <span className="p-popular-tag"><FaStar /> مميز</span>
              )}
              <div className="p-card-actions">
                <button className="p-action edit" onClick={() => handleOpenModal(product)} title="تعديل">
                  <FaEdit />
                </button>
                <button className="p-action delete" onClick={() => handleDelete(product.id)} title="حذف">
                  <FaTrash />
                </button>
              </div>
            </div>
            <div className="p-card-body">
              <span className="p-card-cat">{getCategoryName(product.category)}</span>
              <h4 className="p-card-name">{product.name}</h4>
              <p className="p-card-desc">{product.desc}</p>
              <div className="p-card-footer">
                <span className="p-card-price">{product.price} ج.م</span>
                {product.calories && <span className="p-card-cal">{product.calories}</span>}
              </div>
            </div>
          </motion.div>
        )) : (
          <div className="p-empty">لا توجد منتجات مطابقة لعملية البحث</div>
        )}
      </div>

      {/* Product Form Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="p-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              className="p-modal"
              initial={{ scale: 0.92, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 30 }}
              transition={{ type: 'spring', duration: 0.4 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="p-modal-head">
                <div>
                  <h3 className="p-modal-title">{editingProduct ? 'تعديل المنتج' : 'إضافة منتج جديد'}</h3>
                  <span className="p-modal-sub">{editingProduct ? 'تحديث بيانات الصنف' : 'أدخل بيانات الصنف الجديد'}</span>
                </div>
                <button className="p-close" onClick={() => setIsModalOpen(false)}>
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={handleSave} className="p-modal-body">
                {/* Image Preview */}
                <div className="p-img-preview-section">
                  {formData.image ? (
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="p-img-preview"
                      onError={(e) => (e.currentTarget.style.display = 'none')}
                    />
                  ) : (
                    <div className="p-img-placeholder">
                      <FaImage />
                      <span>معاينة الصورة</span>
                    </div>
                  )}
                </div>

                <div className="p-form-grid">
                  <div className="p-field">
                    <label>اسم المنتج *</label>
                    <input
                      type="text"
                      className="p-input"
                      required
                      placeholder="مثال: كباب مشكل"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="p-field">
                    <label>السعر (ج.م) *</label>
                    <input
                      type="number"
                      className="p-input"
                      required min="0"
                      placeholder="350"
                      value={formData.price}
                      onChange={e => setFormData({ ...formData, price: e.target.value })}
                    />
                  </div>
                  <div className="p-field">
                    <label>القسم *</label>
                    <select
                      className="p-input"
                      required
                      value={formData.category}
                      onChange={e => setFormData({ ...formData, category: e.target.value })}
                    >
                      {menuCategories.filter(c => c.id !== 'all').map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="p-field">
                    <label>السعرات الحرارية</label>
                    <input
                      type="text"
                      className="p-input"
                      placeholder="850 kcal"
                      value={formData.calories}
                      onChange={e => setFormData({ ...formData, calories: e.target.value })}
                    />
                  </div>
                </div>

                <div className="p-field full">
                  <label>رابط الصورة *</label>
                  <input
                    type="url"
                    className="p-input"
                    required
                    placeholder="https://..."
                    value={formData.image}
                    onChange={e => setFormData({ ...formData, image: e.target.value })}
                  />
                </div>

                <div className="p-field full">
                  <label>وصف قصير *</label>
                  <textarea
                    className="p-input p-textarea"
                    required
                    rows={2}
                    placeholder="اكتب وصف المنتج هنا..."
                    value={formData.desc}
                    onChange={e => setFormData({ ...formData, desc: e.target.value })}
                  ></textarea>
                </div>

                <label className="p-checkbox-wrap">
                  <input
                    type="checkbox"
                    checked={formData.popular}
                    onChange={e => setFormData({ ...formData, popular: e.target.checked })}
                  />
                  <span className="p-check-label">
                    <FaStar style={{ color: '#f59e0b', fontSize: '0.9rem' }} />
                    تحديد كـ "الأكثر مبيعاً"
                  </span>
                </label>

                <div className="p-modal-actions">
                  <button type="button" className="p-btn-ghost" onClick={() => setIsModalOpen(false)}>إلغاء</button>
                  <button type="submit" className="p-btn-gold">حفظ المنتج</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        /* Header */
        .p-page-head {
          display: flex; justify-content: space-between; align-items: flex-start;
          margin-bottom: 24px; flex-wrap: wrap; gap: 14px;
        }
        .p-heading { font-size: 1.8rem; font-weight: 800; color: #f1f5f9; margin: 0 0 6px 0; }
        .p-subheading { color: #64748b; font-size: 0.95rem; margin: 0; }
        .p-add-btn {
          display: flex; align-items: center; gap: 8px;
          background: linear-gradient(135deg, #c9a050, #e8c875);
          color: #1a1d2e; border: none;
          padding: 11px 22px; border-radius: 10px;
          font-weight: 700; font-size: 0.9rem;
          cursor: pointer; font-family: inherit;
          transition: all 0.2s; box-shadow: 0 4px 15px rgba(201,160,80,0.25);
        }
        .p-add-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(201,160,80,0.35); }

        /* Filters */
        .p-filters {
          display: flex; gap: 12px; margin-bottom: 22px; flex-wrap: wrap;
        }
        .p-search { position: relative; flex: 1; min-width: 250px; }
        .p-search-icon {
          position: absolute; right: 14px; top: 50%;
          transform: translateY(-50%); color: #475569; font-size: 0.88rem;
        }
        .p-search-input {
          width: 100%; padding: 11px 40px 11px 14px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px; color: #e2e8f0;
          font-family: inherit; font-size: 0.88rem;
          box-sizing: border-box;
        }
        .p-search-input::placeholder { color: #475569; }
        .p-search-input:focus { outline: none; border-color: rgba(201,160,80,0.4); }
        .p-select {
          padding: 11px 16px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px; color: #e2e8f0;
          font-family: inherit; font-size: 0.88rem; cursor: pointer;
          min-width: 140px;
        }
        .p-select:focus { outline: none; border-color: rgba(201,160,80,0.4); }
        .p-select option { background: #1e2030; color: #e2e8f0; }

        /* Products Grid */
        .p-products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 18px;
        }
        .p-empty {
          grid-column: 1 / -1;
          text-align: center; padding: 60px 20px;
          color: #64748b; font-size: 0.95rem;
        }

        /* Product Card */
        .p-product-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 14px;
          overflow: hidden;
          transition: border-color 0.2s;
        }
        .p-product-card:hover { border-color: rgba(201,160,80,0.2); }
        .p-card-img-wrap {
          position: relative;
          height: 180px;
          overflow: hidden;
          background: rgba(0,0,0,0.2);
        }
        .p-card-img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.3s;
        }
        .p-product-card:hover .p-card-img { transform: scale(1.05); }
        .p-popular-tag {
          position: absolute;
          top: 10px; right: 10px;
          background: linear-gradient(135deg, #c9a050, #e8c875);
          color: #1a1d2e;
          padding: 4px 10px; border-radius: 6px;
          font-size: 0.72rem; font-weight: 800;
          display: flex; align-items: center; gap: 4px;
        }
        .p-card-actions {
          position: absolute;
          bottom: 10px; left: 10px;
          display: flex; gap: 6px;
          opacity: 0; transition: opacity 0.2s;
        }
        .p-product-card:hover .p-card-actions { opacity: 1; }
        .p-action {
          width: 32px; height: 32px;
          border-radius: 8px; border: none;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; font-size: 0.85rem;
          backdrop-filter: blur(10px);
          transition: all 0.2s;
        }
        .p-action.edit { background: rgba(99,102,241,0.8); color: #fff; }
        .p-action.edit:hover { background: #6366f1; }
        .p-action.delete { background: rgba(239,68,68,0.8); color: #fff; }
        .p-action.delete:hover { background: #ef4444; }

        .p-card-body { padding: 16px; }
        .p-card-cat {
          display: inline-block;
          font-size: 0.72rem; font-weight: 700;
          color: #c9a050; text-transform: uppercase;
          margin-bottom: 6px;
        }
        .p-card-name {
          font-size: 1rem; font-weight: 700;
          color: #f1f5f9; margin: 0 0 6px 0;
        }
        .p-card-desc {
          font-size: 0.8rem; color: #64748b;
          margin: 0 0 12px 0; line-height: 1.5;
          display: -webkit-box; -webkit-line-clamp: 2;
          -webkit-box-orient: vertical; overflow: hidden;
        }
        .p-card-footer {
          display: flex; justify-content: space-between; align-items: center;
          padding-top: 10px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .p-card-price { font-weight: 800; color: #c9a050; font-size: 1rem; }
        .p-card-cal { font-size: 0.75rem; color: #64748b; }

        /* Modal */
        .p-modal-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.7); backdrop-filter: blur(6px);
          z-index: 3000;
          display: flex; align-items: center; justify-content: center;
          padding: 20px;
        }
        .p-modal {
          background: #1e2030;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 18px;
          width: 100%; max-width: 560px;
          max-height: 90vh; overflow-y: auto;
          box-shadow: 0 25px 60px rgba(0,0,0,0.4);
        }
        .p-modal::-webkit-scrollbar { width: 4px; }
        .p-modal::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 10px; }

        .p-modal-head {
          display: flex; justify-content: space-between; align-items: center;
          padding: 22px 24px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .p-modal-title { margin: 0; font-size: 1.2rem; font-weight: 800; color: #f1f5f9; }
        .p-modal-sub { font-size: 0.8rem; color: #64748b; }
        .p-close {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          color: #94a3b8; width: 36px; height: 36px;
          border-radius: 10px; display: flex; align-items: center;
          justify-content: center; cursor: pointer; transition: all 0.2s;
          font-size: 1rem;
        }
        .p-close:hover { background: #ef4444; color: #fff; border-color: #ef4444; }
        .p-modal-body { padding: 24px; display: flex; flex-direction: column; gap: 18px; }

        /* Image Preview */
        .p-img-preview-section {
          width: 100%; height: 160px;
          border-radius: 12px; overflow: hidden;
          background: rgba(255,255,255,0.03);
          border: 1px dashed rgba(255,255,255,0.1);
          display: flex; align-items: center; justify-content: center;
        }
        .p-img-preview { width: 100%; height: 100%; object-fit: cover; }
        .p-img-placeholder {
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          color: #475569; font-size: 0.85rem;
        }
        .p-img-placeholder svg { font-size: 2rem; }

        /* Form */
        .p-form-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 14px;
        }
        .p-field { display: flex; flex-direction: column; gap: 6px; }
        .p-field.full { grid-column: 1 / -1; }
        .p-field label {
          font-size: 0.82rem; font-weight: 700; color: #94a3b8;
        }
        .p-input {
          padding: 11px 14px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 8px; color: #e2e8f0;
          font-family: inherit; font-size: 0.88rem;
          transition: border-color 0.2s;
          box-sizing: border-box; width: 100%;
        }
        .p-input::placeholder { color: #475569; }
        .p-input:focus { outline: none; border-color: rgba(201,160,80,0.4); }
        .p-input option { background: #1e2030; color: #e2e8f0; }
        .p-textarea { resize: vertical; min-height: 70px; }

        .p-checkbox-wrap {
          display: flex; align-items: center; gap: 10px;
          padding: 12px 14px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 10px; cursor: pointer;
        }
        .p-checkbox-wrap input[type="checkbox"] {
          width: 18px; height: 18px; cursor: pointer;
          accent-color: #c9a050;
        }
        .p-check-label {
          display: flex; align-items: center; gap: 6px;
          color: #94a3b8; font-weight: 600; font-size: 0.88rem;
        }

        .p-modal-actions {
          display: flex; justify-content: flex-end; gap: 10px;
          padding-top: 18px; border-top: 1px solid rgba(255,255,255,0.06);
        }
        .p-btn-ghost {
          padding: 10px 22px;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.1);
          color: #94a3b8; border-radius: 10px;
          font-weight: 700; cursor: pointer;
          font-family: inherit; font-size: 0.88rem;
          transition: all 0.2s;
        }
        .p-btn-ghost:hover { background: rgba(255,255,255,0.04); }
        .p-btn-gold {
          padding: 10px 22px;
          background: linear-gradient(135deg, #c9a050, #e8c875);
          color: #1a1d2e; border: none; border-radius: 10px;
          font-weight: 700; cursor: pointer;
          font-family: inherit; font-size: 0.88rem;
          transition: all 0.2s;
          box-shadow: 0 4px 12px rgba(201,160,80,0.25);
        }
        .p-btn-gold:hover { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(201,160,80,0.35); }

        @media (max-width: 768px) {
          .p-page-head { flex-direction: column; }
          .p-heading { font-size: 1.4rem; }
          .p-products-grid { grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); }
          .p-form-grid { grid-template-columns: 1fr; }
          .p-modal { max-width: 100%; margin: 0 8px; }
        }
        @media (max-width: 480px) {
          .p-products-grid { grid-template-columns: 1fr; }
          .p-filters { flex-direction: column; }
          .p-search { min-width: auto; }
        }
      `}</style>
    </motion.div>
  );
};

export default Products;
