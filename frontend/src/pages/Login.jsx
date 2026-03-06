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

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Mini CRM</h1>
        <p style={styles.subtitle}>Admin Login</p>

        {error && <p style={styles.error}>{error}</p>}

        <input
          style={styles.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          style={styles.button}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0f0f0f',
  },
  card: {
    backgroundColor: '#1a1a1a',
    padding: '40px',
    borderRadius: '12px',
    width: '100%',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    boxShadow: '0 0 30px rgba(0,0,0,0.5)',
  },
  title: {
    color: '#e8c547',
    textAlign: 'center',
    fontSize: '2rem',
    margin: 0,
  },
  subtitle: {
    color: '#aaa',
    textAlign: 'center',
    margin: 0,
  },
  input: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #333',
    backgroundColor: '#111',
    color: '#fff',
    fontSize: '1rem',
  },
  button: {
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#e8c547',
    color: '#000',
    fontWeight: 'bold',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  error: {
    color: '#ff4444',
    textAlign: 'center',
    margin: 0,
  },
};

export default Login;