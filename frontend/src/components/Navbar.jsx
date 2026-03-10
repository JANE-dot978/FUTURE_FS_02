function Sidebar({ activeTab, setActiveTab, leadsCount, darkMode }) {
  const menuItems = [
    { id: 'dashboard', icon: '▦', label: 'Dashboard' },
    { id: 'leads', icon: '◈', label: 'All Leads', count: leadsCount },
    { id: 'new', icon: '◉', label: 'New' },
    { id: 'contacted', icon: '◉', label: 'Contacted' },
    { id: 'converted', icon: '◉', label: 'Converted' },
    { id: 'lost', icon: '◉', label: 'Lost' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const s = getStyles(darkMode);

  return (
    <div style={s.sidebar}>

      {/* Logo */}
      <div style={s.logoSection}>
        <div style={s.logoCircle}>
          <span style={s.logoText}>CRM</span>
        </div>
        <div>
          <p style={s.logoTitle}>Mini CRM</p>
          <p style={s.logoSub}>Lead Management</p>
        </div>
      </div>

      {/* Menu Items */}
      <div style={s.menu}>
        <p style={s.menuLabel}>MAIN MENU</p>
        {menuItems.map((item) => (
          <button
            key={item.id}
            style={{
              ...s.menuItem,
              backgroundColor: activeTab === item.id
                ? 'rgba(232,197,71,0.08)' : 'transparent',
              borderLeft: activeTab === item.id
                ? '3px solid #e8c547' : '3px solid transparent',
              // THIS IS THE FIX — clear colors for both modes
              color: activeTab === item.id
                ? '#e8c547'
                : darkMode ? '#cccccc' : '#333333',
            }}
            onClick={() => setActiveTab(item.id)}
          >
            <span style={s.menuIcon}>{item.icon}</span>
            <span style={s.menuItemLabel}>{item.label}</span>
            {item.count !== undefined && (
              <span style={s.badge}>{item.count}</span>
            )}
          </button>
        ))}
      </div>

      {/* Bottom Section */}
      <div style={s.bottom}>

        {/* Admin Info Card */}
        <div style={s.adminCard}>
          <div style={s.adminAvatar}>J</div>
          <div>
            <p style={s.adminName}>Jane Gathu</p>
            <p style={s.adminRole}>Administrator</p>
          </div>
        </div>

        {/* Logout Button */}
        <button style={s.logoutBtn} onClick={handleLogout}>
          ⎋ Logout
        </button>
      </div>
    </div>
  );
}

const getStyles = (darkMode) => ({
  sidebar: {
    width: '260px',
    minHeight: '100vh',
    backgroundColor: darkMode ? '#0d0d0d' : '#ffffff',
    borderRight: darkMode ? '1px solid #1a1a1a' : '1px solid #e5e5e5',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    zIndex: 100,
  },
  logoSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '24px 20px',
    borderBottom: darkMode ? '1px solid #1a1a1a' : '1px solid #e5e5e5',
  },
  logoCircle: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    background: 'linear-gradient(135deg, #e8c547, #f0d060)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    boxShadow: '0 0 20px rgba(232,197,71,0.15)',
  },
  logoText: {
    color: '#000',
    fontWeight: '800',
    fontSize: '0.75rem',
    letterSpacing: '1px',
  },
  logoTitle: {
    color: darkMode ? '#fff' : '#111',
    fontWeight: '700',
    fontSize: '0.95rem',
    margin: 0,
  },
  logoSub: {
    color: darkMode ? '#444' : '#aaa',
    fontSize: '0.75rem',
    margin: 0,
  },
  menu: {
    flex: 1,
    padding: '20px 12px',
    overflowY: 'auto',
  },
  menuLabel: {
    color: darkMode ? '#444' : '#bbb',
    fontSize: '0.7rem',
    fontWeight: '600',
    letterSpacing: '1.5px',
    padding: '0 8px',
    marginBottom: '8px',
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    width: '100%',
    padding: '10px 12px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    marginBottom: '2px',
    textAlign: 'left',
    fontSize: '1rem',
    fontWeight: '600',
    transition: 'all 0.2s',
  },
  menuIcon: {
    fontSize: '0.8rem',
    width: '20px',
    textAlign: 'center',
    opacity: 0.7,
  },
  menuItemLabel: {
    flex: 1,
  },
  badge: {
    backgroundColor: '#e8c547',
    color: '#000',
    borderRadius: '10px',
    padding: '2px 8px',
    fontSize: '0.75rem',
    fontWeight: '700',
  },
  bottom: {
    padding: '16px',
    borderTop: darkMode ? '1px solid #1a1a1a' : '1px solid #e5e5e5',
  },
  adminCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px',
    backgroundColor: darkMode ? '#141414' : '#f5f5f5',
    borderRadius: '10px',
    marginBottom: '10px',
  },
  adminAvatar: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #e8c547, #4ecca3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    color: '#000',
    fontSize: '1rem',
    flexShrink: 0,
  },
  adminName: {
    color: darkMode ? '#fff' : '#111',
    fontSize: '0.85rem',
    fontWeight: '600',
    margin: 0,
  },
  adminRole: {
    color: darkMode ? '#444' : '#aaa',
    fontSize: '0.75rem',
    margin: 0,
  },
  logoutBtn: {
    width: '100%',
    padding: '10px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#ff4444',
    color: '#ffffff',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '700',
    letterSpacing: '0.5px',
  },
});

export default Sidebar;