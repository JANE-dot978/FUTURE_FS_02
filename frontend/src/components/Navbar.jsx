import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <h1 style={styles.logo}>Mini CRM</h1>
      <button style={styles.button} onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 32px',
    backgroundColor: '#1a1a1a',
    borderBottom: '1px solid #333',
  },
  logo: {
    color: '#e8c547',
    margin: 0,
    fontSize: '1.5rem',
  },
  button: {
    padding: '8px 20px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#ff4444',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};

export default Navbar;