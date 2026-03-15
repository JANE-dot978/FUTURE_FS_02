import { useState } from 'react';
import { createLead } from '../api';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createLead({ ...form, source: 'Website Form', status: 'new' });
      setStatus('success');
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch {
      setStatus('error');
    }
    setLoading(false);
  };

  const styles = {
    page: { minHeight: '100vh', background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', fontFamily: 'Segoe UI, sans-serif' },
    card: { background: '#1a1a1a', border: '1px solid #333', borderRadius: '16px', padding: '3rem', width: '100%', maxWidth: '500px' },
    logo: { textAlign: 'center', marginBottom: '2rem' },
    logoText: { fontSize: '1.8rem', fontWeight: '700', color: '#e8c547' },
    tagline: { color: '#888', fontSize: '0.9rem', marginTop: '0.3rem' },
    title: { fontSize: '1.5rem', fontWeight: '600', color: '#fff', marginBottom: '0.5rem' },
    subtitle: { color: '#888', fontSize: '0.85rem', marginBottom: '2rem', lineHeight: '1.6' },
    label: { display: 'block', fontSize: '0.75rem', color: '#aaa', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' },
    input: { width: '100%', background: '#111', border: '1px solid #333', borderRadius: '8px', padding: '0.8rem 1rem', color: '#fff', fontSize: '0.9rem', outline: 'none', marginBottom: '1.2rem', boxSizing: 'border-box', fontFamily: 'inherit' },
    textarea: { width: '100%', background: '#111', border: '1px solid #333', borderRadius: '8px', padding: '0.8rem 1rem', color: '#fff', fontSize: '0.9rem', outline: 'none', marginBottom: '1.2rem', boxSizing: 'border-box', fontFamily: 'inherit', resize: 'vertical', minHeight: '120px' },
    btn: { width: '100%', background: '#e8c547', color: '#111', border: 'none', borderRadius: '8px', padding: '0.9rem', fontSize: '0.9rem', fontWeight: '600', cursor: 'pointer' },
    success: { background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '8px', padding: '1rem', color: '#22c55e', textAlign: 'center', marginBottom: '1rem', fontSize: '0.9rem' },
    error: { background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', padding: '1rem', color: '#ef4444', textAlign: 'center', marginBottom: '1rem', fontSize: '0.9rem' },
    adminLink: { textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: '#888' },
adminAnchor: { color: '#e8c547', fontWeight: '700', textDecoration: 'none', fontSize: '0.9rem' },
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.logo}>
          <div style={styles.logoText}>Mini CRM</div>
          <div style={styles.tagline}>Client Lead Management System</div>
        </div>
        <h2 style={styles.title}>Get In Touch</h2>
        <p style={styles.subtitle}>Fill in your details and we'll get back to you as soon as possible.</p>

        {status === 'success' && (
          <div style={styles.success}>✅ Message sent! We'll be in touch soon.</div>
        )}
        {status === 'error' && (
          <div style={styles.error}>❌ Something went wrong. Please try again.</div>
        )}

        <form onSubmit={handleSubmit}>
          <label style={styles.label}>Full Name *</label>
          <input style={styles.input} name="name" value={form.name} onChange={handleChange} placeholder="Jane Doe" required />

          <label style={styles.label}>Email Address *</label>
          <input style={styles.input} type="email" name="email" value={form.email} onChange={handleChange} placeholder="jane@example.com" required />

          <label style={styles.label}>Phone Number</label>
          <input style={styles.input} name="phone" value={form.phone} onChange={handleChange} placeholder="+254 7XX XXX XXX" />

          <label style={styles.label}>Message</label>
          <textarea style={styles.textarea} name="message" value={form.message} onChange={handleChange} placeholder="Tell us about your inquiry..." />

          <button style={styles.btn} type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send Message →'}
          </button>
        </form>

        <p style={styles.adminLink}>
          Are you the admin?{' '}
          <a href="/login" style={styles.adminAnchor}>Login here →</a>
        </p>
      </div>
    </div>
  );
}