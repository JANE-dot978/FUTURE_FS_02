import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await loginAdmin({ email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleLogin();
  };

  return (
    <div style={styles.container}>
      {/* Left Panel */}
      <div style={styles.leftPanel}>
        <div style={styles.brandWrapper}>
          <div style={styles.logoCircle}>
            <span style={styles.logoText}>CRM</span>
          </div>
          <h1 style={styles.brandName}>Mini CRM</h1>
          <p style={styles.brandTagline}>Manage your client leads with ease</p>
        </div>
        <div style={styles.features}>
          {['Track client leads', 'Update lead status', 'Add notes & follow-ups', 'Secure admin access'].map((f, i) => (
            <div key={i} style={styles.featureItem}>
              <span style={styles.featureDot}>✦</span>
              <span>{f}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div style={styles.rightPanel}>
        <div style={styles.card} className="pop-in">
          <h2 style={styles.title}>Welcome back</h2>
          <p style={styles.subtitle}>Sign in to your admin account</p>

          {error && (
            <div style={styles.errorBox}>
              ⚠️ {error}
            </div>
          )}

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              style={styles.input}
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              style={styles.input}
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          <button
            style={{
              ...styles.button,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <span>Signing in...</span>
            ) : (
              <span>Sign In →</span>
            )}
          </button>

          <p style={styles.hint}>
            Use your registered admin credentials to access the dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#0a0a0a',
  },
  leftPanel: {
    flex: 1,
    background: 'linear-gradient(135deg, #1a1400 0%, #0a0a0a 50%, #001a15 100%)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '60px',
    borderRight: '1px solid #222',
  },
  brandWrapper: {
    marginBottom: '48px',
  },
  logoCircle: {
    width: '64px',
    height: '64px',
    borderRadius: '16px',
    background: 'linear-gradient(135deg, #e8c547, #f0d060)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
    boxShadow: '0 0 30px rgba(232, 197, 71, 0.3)',
  },
  logoText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: '1.1rem',
    letterSpacing: '1px',
  },
  brandName: {
    fontSize: '2.5rem',
    fontWeight: '800',
    color: '#fff',
    marginBottom: '12px',
    letterSpacing: '-1px',
  },
  brandTagline: {
    color: '#666',
    fontSize: '1rem',
    lineHeight: '1.6',
  },
  features: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    color: '#888',
    fontSize: '0.95rem',
  },
  featureDot: {
    color: '#e8c547',
    fontSize: '0.7rem',
  },
  rightPanel: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    backgroundColor: '#0a0a0a',
  },
  card: {
    backgroundColor: '#111',
    padding: '48px',
    borderRadius: '20px',
    width: '100%',
    maxWidth: '420px',
    border: '1px solid #222',
    boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
  },
  title: {
    fontSize: '1.8rem',
    fontWeight: '700',
    color: '#fff',
    marginBottom: '8px',
  },
  subtitle: {
    color: '#555',
    marginBottom: '32px',
    fontSize: '0.95rem',
  },
  errorBox: {
    backgroundColor: '#2a1010',
    border: '1px solid #ff4444',
    color: '#ff6666',
    padding: '12px 16px',
    borderRadius: '8px',
    marginBottom: '20px',
    fontSize: '0.9rem',
  },
  inputGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    color: '#888',
    fontSize: '0.85rem',
    marginBottom: '8px',
    fontWeight: '500',
  },
  input: {
    width: '100%',
    padding: '14px 16px',
    borderRadius: '10px',
    border: '1px solid #2a2a2a',
    backgroundColor: '#0a0a0a',
    color: '#fff',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '14px',
    borderRadius: '10px',
    border: 'none',
    background: 'linear-gradient(135deg, #e8c547, #f0d060)',
    color: '#000',
    fontWeight: '700',
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '8px',
    marginBottom: '20px',
    transition: 'transform 0.2s',
  },
  hint: {
    color: '#333',
    fontSize: '0.8rem',
    textAlign: 'center',
    lineHeight: '1.5',
  },
};

export default Login;