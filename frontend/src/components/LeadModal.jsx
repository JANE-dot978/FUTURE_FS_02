import { useState, useEffect } from 'react';

function LeadModal({ onClose, onSave, existingLead, darkMode }) {
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

  const cardBg = darkMode ? '#1a1a1a' : '#ffffff';
  const border = darkMode ? '#2a2a2a' : '#e0e0e0';
  const textPrimary = darkMode ? '#ffffff' : '#111111';
  const textSecondary = darkMode ? '#888' : '#555';
  const inputBg = darkMode ? '#111' : '#f5f5f5';
  const inputText = darkMode ? '#ffffff' : '#111111';

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        backgroundColor: cardBg,
        padding: '32px',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '480px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
        border: `1px solid ${border}`,
      }} className="pop-in">

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ color: textPrimary, margin: 0, fontSize: '1.3rem', fontWeight: '700' }}>
            {existingLead ? 'Edit Lead' : 'Add New Lead'}
          </h2>
          <button
            onClick={onClose}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: textSecondary,
              fontSize: '1.2rem',
              cursor: 'pointer',
            }}
          >✕</button>
        </div>

        {/* Fields */}
        {[
          { name: 'name', placeholder: 'Full Name', type: 'text' },
          { name: 'email', placeholder: 'Email Address', type: 'email' },
          { name: 'phone', placeholder: 'Phone Number', type: 'text' },
          { name: 'source', placeholder: 'Lead Source', type: 'text' },
        ].map((field) => (
          <div key={field.name}>
            <label style={{ color: textSecondary, fontSize: '0.8rem', fontWeight: '600', display: 'block', marginBottom: '6px' }}>
              {field.placeholder}
            </label>
            <input
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={form[field.name]}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                border: `1px solid ${border}`,
                backgroundColor: inputBg,
                color: inputText,
                fontSize: '0.95rem',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>
        ))}

        {/* Status */}
        <div>
          <label style={{ color: textSecondary, fontSize: '0.8rem', fontWeight: '600', display: 'block', marginBottom: '6px' }}>
            Status
          </label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: '8px',
              border: `1px solid ${border}`,
              backgroundColor: inputBg,
              color: inputText,
              fontSize: '0.95rem',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          >
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="converted">Converted</option>
            <option value="lost">Lost</option>
          </select>
        </div>

        {/* Notes */}
        <div>
          <label style={{ color: textSecondary, fontSize: '0.8rem', fontWeight: '600', display: 'block', marginBottom: '6px' }}>
            Notes
          </label>
          <textarea
            name="notes"
            placeholder="Add notes about this lead..."
            value={form.notes}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: '8px',
              border: `1px solid ${border}`,
              backgroundColor: inputBg,
              color: inputText,
              fontSize: '0.95rem',
              outline: 'none',
              height: '80px',
              resize: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '4px' }}>
          <button
            onClick={onClose}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: `1px solid ${border}`,
              backgroundColor: 'transparent',
              color: textSecondary,
              cursor: 'pointer',
              fontWeight: '600',
            }}
          >Cancel</button>
          <button
            onClick={handleSave}
            style={{
              padding: '10px 24px',
              borderRadius: '8px',
              border: 'none',
              background: 'linear-gradient(135deg, #e8c547, #f0d060)',
              color: '#000',
              fontWeight: '700',
              cursor: 'pointer',
              fontSize: '0.95rem',
            }}
          >{existingLead ? 'Update Lead' : 'Add Lead'}</button>
        </div>
      </div>
    </div>
  );
}

export default LeadModal;