import { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { FaHome, FaListUl, FaUtensils, FaUsers, FaCog, FaSignOutAlt, FaBars, FaTimes, FaBell } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
        setMobileOpen(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    { path: '/admin', name: 'الرئيسية', icon: <FaHome /> },
    { path: '/admin/orders', name: 'الطلبات', icon: <FaListUl /> },
    { path: '/admin/products', name: 'المنيو', icon: <FaUtensils /> },
    { path: '/admin/customers', name: 'العملاء', icon: <FaUsers /> },
    { path: '/admin/settings', name: 'الإعدادات', icon: <FaCog /> },
  ];

  const getPageTitle = () => {
    const current = menuItems.find(item =>
      item.path === '/admin'
        ? location.pathname === '/admin'
        : location.pathname.startsWith(item.path)
    );
    return current?.name || 'لوحة الإدارة';
  };

  return (
    <div className="admin-root" style={{ direction: 'rtl' }}>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="admin-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? '' : 'collapsed'} ${mobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-brand">
          <div className="brand-logo">🔥</div>
          <AnimatePresence>
            {(sidebarOpen || mobileOpen) && (
              <motion.div
                className="brand-text"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
              >
                <span className="brand-title">الدهان</span>
                <span className="brand-sub">لوحة التحكم</span>
              </motion.div>
            )}
          </AnimatePresence>
          <button className="mobile-close" onClick={() => setMobileOpen(false)}>
            <FaTimes />
          </button>
        </div>

        <nav className="sidebar-menu">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/admin'}
              className={({ isActive }) => `menu-link ${isActive ? 'active' : ''}`}
              title={!sidebarOpen && !mobileOpen ? item.name : undefined}
            >
              <span className="menu-icon">{item.icon}</span>
              {(sidebarOpen || mobileOpen) && <span className="menu-text">{item.name}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <button onClick={() => navigate('/')} className="logout-btn" title="تسجيل خروج">
            <span className="menu-icon"><FaSignOutAlt /></span>
            {(sidebarOpen || mobileOpen) && <span className="menu-text">الرجوع للموقع</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="admin-body">
        <header className="admin-topbar">
          <div className="topbar-right">
            <button className="hamburger" onClick={() => {
              if (window.innerWidth <= 768) {
                setMobileOpen(!mobileOpen);
              } else {
                setSidebarOpen(!sidebarOpen);
              }
            }}>
              <FaBars />
            </button>
            <h1 className="topbar-title">{getPageTitle()}</h1>
          </div>
          <div className="topbar-left">
            <button className="notif-btn">
              <FaBell />
              <span className="notif-dot"></span>
            </button>
            <div className="profile-pill">
              <div className="profile-avatar">أ</div>
              <div className="profile-info">
                <span className="profile-name">أدمن النظام</span>
                <span className="profile-role">مدير</span>
              </div>
            </div>
          </div>
        </header>

        <div className="admin-content">
          <Outlet />
        </div>
      </div>

      <style>{`
        /* ============== ADMIN ROOT ============== */
        .admin-root {
          display: flex;
          height: 100vh;
          width: 100vw;
          overflow: hidden;
          background: #0f1117;
          color: #e2e8f0;
          font-family: 'Cairo', 'Segoe UI', sans-serif;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 9999;
        }

        /* ============== SIDEBAR ============== */
        .admin-sidebar {
          width: 260px;
          background: linear-gradient(180deg, #161822 0%, #1a1d2e 100%);
          display: flex;
          flex-direction: column;
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border-left: 1px solid rgba(255,255,255,0.04);
          position: relative;
          z-index: 1001;
          flex-shrink: 0;
        }
        .admin-sidebar.collapsed { width: 78px; }

        .sidebar-brand {
          height: 72px;
          display: flex;
          align-items: center;
          padding: 0 20px;
          gap: 12px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          flex-shrink: 0;
          overflow: hidden;
        }
        .brand-logo {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #c9a050 0%, #e8c875 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem;
          flex-shrink: 0;
        }
        .brand-text { overflow: hidden; white-space: nowrap; }
        .brand-title {
          display: block;
          font-size: 1.2rem;
          font-weight: 800;
          color: #fff;
          line-height: 1.2;
        }
        .brand-sub {
          display: block;
          font-size: 0.7rem;
          color: #64748b;
          font-weight: 500;
        }
        .mobile-close {
          display: none;
          background: none;
          border: none;
          color: #94a3b8;
          font-size: 1.2rem;
          cursor: pointer;
          margin-right: auto;
        }

        /* Nav Menu */
        .sidebar-menu {
          flex: 1;
          padding: 16px 12px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          overflow-y: auto;
          overflow-x: hidden;
        }
        .sidebar-menu::-webkit-scrollbar { width: 3px; }
        .sidebar-menu::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }

        .menu-link {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 16px;
          color: #94a3b8;
          text-decoration: none;
          border-radius: 10px;
          transition: all 0.2s ease;
          white-space: nowrap;
          position: relative;
          overflow: hidden;
        }
        .menu-link:hover {
          background: rgba(255,255,255,0.04);
          color: #e2e8f0;
        }
        .menu-link.active {
          background: linear-gradient(135deg, rgba(201,160,80,0.15) 0%, rgba(201,160,80,0.08) 100%);
          color: #c9a050;
        }
        .menu-link.active::before {
          content: '';
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 3px;
          height: 60%;
          background: #c9a050;
          border-radius: 10px;
        }
        .menu-icon {
          font-size: 1.2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 22px;
        }
        .menu-text { font-weight: 600; font-size: 0.95rem; }

        .sidebar-bottom {
          padding: 16px 12px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .logout-btn {
          display: flex;
          align-items: center;
          gap: 14px;
          width: 100%;
          padding: 12px 16px;
          background: rgba(239, 68, 68, 0.08);
          color: #f87171;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.2s;
          white-space: nowrap;
          overflow: hidden;
          font-family: inherit;
        }
        .logout-btn:hover {
          background: rgba(239, 68, 68, 0.18);
        }

        /* ============== MAIN BODY ============== */
        .admin-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          min-width: 0;
        }

        /* ============== TOPBAR ============== */
        .admin-topbar {
          height: 72px;
          background: #161822;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 28px;
          flex-shrink: 0;
        }
        .topbar-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .hamburger {
          background: rgba(255,255,255,0.05);
          border: none;
          color: #94a3b8;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .hamburger:hover {
          background: rgba(255,255,255,0.1);
          color: #c9a050;
        }
        .topbar-title {
          font-size: 1.4rem;
          font-weight: 800;
          color: #f1f5f9;
          margin: 0;
        }

        .topbar-left {
          display: flex;
          align-items: center;
          gap: 18px;
        }
        .notif-btn {
          position: relative;
          background: rgba(255,255,255,0.05);
          border: none;
          color: #94a3b8;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .notif-btn:hover { background: rgba(255,255,255,0.1); }
        .notif-dot {
          position: absolute;
          top: 10px;
          left: 10px;
          width: 8px;
          height: 8px;
          background: #ef4444;
          border-radius: 50%;
          border: 2px solid #161822;
        }

        .profile-pill {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255,255,255,0.04);
          padding: 6px 14px 6px 8px;
          border-radius: 50px;
        }
        .profile-avatar {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, #c9a050, #e8c875);
          color: #1a1d2e;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          font-weight: 800;
        }
        .profile-info { display: flex; flex-direction: column; line-height: 1.2; }
        .profile-name { font-size: 0.85rem; font-weight: 700; color: #e2e8f0; }
        .profile-role { font-size: 0.7rem; color: #64748b; }

        /* ============== CONTENT ============== */
        .admin-content {
          flex: 1;
          overflow-y: auto;
          padding: 28px;
          background: #0f1117;
        }
        .admin-content::-webkit-scrollbar { width: 6px; }
        .admin-content::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 10px; }

        /* ============== OVERLAY ============== */
        .admin-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(4px);
          z-index: 1000;
        }

        /* ============== RESPONSIVE ============== */
        @media (max-width: 768px) {
          .admin-sidebar {
            position: fixed;
            right: 0;
            top: 0;
            height: 100vh;
            width: 280px !important;
            transform: translateX(110%);
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 1001;
            box-shadow: -10px 0 30px rgba(0,0,0,0.3);
          }
          .admin-sidebar.mobile-open {
            transform: translateX(0);
          }
          .admin-sidebar.collapsed {
            width: 280px !important;
          }
          .mobile-close { display: flex; }
          .topbar-title { font-size: 1.1rem; }
          .admin-content { padding: 16px; }
          .profile-info { display: none; }
          .admin-topbar { padding: 0 16px; }
        }
        @media (max-width: 480px) {
          .admin-sidebar { width: 100vw !important; }
          .admin-content { padding: 12px; }
        }
      `}</style>
    </div>
  );
};

export default AdminLayout;
