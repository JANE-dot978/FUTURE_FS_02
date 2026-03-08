import { useState, useEffect } from 'react';

function LeadModal({ onClose, onSave, existingLead }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    source: 'Portfolio contact form',
    status: 'new',
    notes: '',
  });

  useEffect(() => {
    if (existingLead) setForm(existingLead);
  }, [existingLead]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!form.name || !form.email) {
      alert('Name and email are required.');
      return;
    }
    onSave(form);
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.title}>
          {existingLead ? 'Edit Lead' : 'Add New Lead'}
        </h2>

        <input
          style={styles.input}
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          style={styles.input}
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          style={styles.input}
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />
        <input
          style={styles.input}
          name="source"
          placeholder="Source"
          value={form.source}
          onChange={handleChange}
        />
        <select
          style={styles.input}
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="converted">Converted</option>
          <option value="lost">Lost</option>
        </select>
        <textarea
          style={{ ...styles.input, height: '80px', resize: 'none' }}
          name="notes"
          placeholder="Notes"
          value={form.notes}
          onChange={handleChange}
        />

        <div style={styles.buttons}>
          <button style={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>
          <button style={styles.saveBtn} onClick={handleSave}>
            {existingLead ? 'Update' : 'Add Lead'}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#1a1a1a',
    padding: '32px',
    borderRadius: '12px',
    width: '100%',
    maxWidth: '480px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    boxShadow: '0 0 40px rgba(0,0,0,0.6)',
  },
  title: {
    color: '#e8c547',
    margin: 0,
  },
  input: {
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #333',
    backgroundColor: '#111',
    color: '#fff',
    fontSize: '0.95rem',
    width: '100%',
    boxSizing: 'border-box',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    marginTop: '8px',
  },
  cancelBtn: {
    padding: '10px 20px',
    borderRadius: '8px',
    border: '1px solid #555',
    backgroundColor: 'transparent',
    color: '#aaa',
    cursor: 'pointer',
  },
  saveBtn: {
    padding: '10px 20px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#e8c547',
    color: '#000',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};

export default LeadModal;