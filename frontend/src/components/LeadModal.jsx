import { useState } from 'react';
import { addNote } from '../api';

export default function LeadModal({ lead, onClose, onSave, darkMode }) {
  const [form, setForm] = useState({
    name: lead?.name || '',
    email: lead?.email || '',
    phone: lead?.phone || '',
    source: lead?.source || 'Website Form',
    status: lead?.status || 'new',
  });
  const [noteText, setNoteText] = useState('');
  const [notes, setNotes] = useState(lead?.notes || []);
  const [addingNote, setAddingNote] = useState(false);

  const bg = darkMode ? '#1a1a1a' : '#ffffff';
  const cardBg = darkMode ? '#222' : '#f9f9f9';
  const border = darkMode ? '#333' : '#e0e0e0';
  const text = darkMode ? '#ffffff' : '#111111';
  const textSecondary = darkMode ? '#aaaaaa' : '#555555';
  const inputBg = darkMode ? '#111' : '#f0f0f0';

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = () => onSave(form);

  const handleAddNote = async () => {
    if (!noteText.trim() || !lead?._id) return;
    setAddingNote(true);
    try {
      const res = await addNote(lead._id, noteText);
      setNotes(res.data.notes);
      setNoteText('');
    } catch (err) {
      console.error(err);
    }
    setAddingNote(false);
  };

  const styles = {
    overlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' },
    modal: { background: bg, border: `1px solid ${border}`, borderRadius: '16px', padding: '2rem', width: '100%', maxWidth: '580px', maxHeight: '90vh', overflowY: 'auto', fontFamily: 'Segoe UI, sans-serif' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' },
    title: { fontSize: '1.2rem', fontWeight: '700', color: text },
    closeBtn: { background: 'none', border: 'none', color: textSecondary, fontSize: '1.5rem', cursor: 'pointer' },
    label: { display: 'block', fontSize: '0.75rem', color: textSecondary, marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' },
    input: { width: '100%', background: inputBg, border: `1px solid ${border}`, borderRadius: '8px', padding: '0.7rem 1rem', color: text, fontSize: '0.9rem', outline: 'none', marginBottom: '1rem', boxSizing: 'border-box', fontFamily: 'inherit' },
    select: { width: '100%', background: inputBg, border: `1px solid ${border}`, borderRadius: '8px', padding: '0.7rem 1rem', color: text, fontSize: '0.9rem', outline: 'none', marginBottom: '1rem', boxSizing: 'border-box', fontFamily: 'inherit' },
    row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' },
    divider: { borderTop: `1px solid ${border}`, margin: '1.5rem 0' },
    sectionTitle: { fontSize: '0.85rem', fontWeight: '600', color: text, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' },
    noteItem: { background: cardBg, border: `1px solid ${border}`, borderRadius: '8px', padding: '0.8rem 1rem', marginBottom: '0.75rem' },
    noteText: { fontSize: '0.85rem', color: text, marginBottom: '0.3rem', lineHeight: '1.5' },
    noteDate: { fontSize: '0.7rem', color: textSecondary },
    noteInput: { width: '100%', background: inputBg, border: `1px solid ${border}`, borderRadius: '8px', padding: '0.7rem 1rem', color: text, fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit', resize: 'vertical', minHeight: '80px' },
    noteBtn: { marginTop: '0.75rem', background: '#e8c547', color: '#111', border: 'none', borderRadius: '8px', padding: '0.6rem 1.2rem', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer' },
    footer: { display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' },
    cancelBtn: { background: 'transparent', border: `1px solid ${border}`, borderRadius: '8px', padding: '0.7rem 1.5rem', color: textSecondary, cursor: 'pointer', fontSize: '0.85rem' },
    saveBtn: { background: '#e8c547', color: '#111', border: 'none', borderRadius: '8px', padding: '0.7rem 1.5rem', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer' },
    emptyNotes: { color: textSecondary, fontSize: '0.8rem', fontStyle: 'italic', textAlign: 'center', padding: '1rem' },
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={e => e.stopPropagation()}>
        <div style={styles.header}>
          <h3 style={styles.title}>{lead?._id ? 'Edit Lead' : 'Add New Lead'}</h3>
          <button style={styles.closeBtn} onClick={onClose}>×</button>
        </div>

        {/* LEAD DETAILS */}
        <div style={styles.row}>
          <div>
            <label style={styles.label}>Full Name</label>
            <input style={styles.input} name="name" value={form.name} onChange={handleChange} placeholder="Jane Doe" />
          </div>
          <div>
            <label style={styles.label}>Email</label>
            <input style={styles.input} name="email" value={form.email} onChange={handleChange} placeholder="jane@example.com" />
          </div>
        </div>
        <div style={styles.row}>
          <div>
            <label style={styles.label}>Phone</label>
            <input style={styles.input} name="phone" value={form.phone} onChange={handleChange} placeholder="+254 7XX XXX XXX" />
          </div>
          <div>
            <label style={styles.label}>Source</label>
            <select style={styles.select} name="source" value={form.source} onChange={handleChange}>
              <option>Website Form</option>
              <option>Referral</option>
              <option>Social Media</option>
              <option>Walk-in</option>
              <option>Other</option>
            </select>
          </div>
        </div>
        <div>
          <label style={styles.label}>Status</label>
          <select style={styles.select} name="status" value={form.status} onChange={handleChange}>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="converted">Converted</option>
            <option value="lost">Lost</option>
          </select>
        </div>

        {/* FOLLOW-UP NOTES — only show when editing existing lead */}
        {lead?._id && (
          <>
            <div style={styles.divider} />
            <div style={styles.sectionTitle}>
              📝 Follow-up Notes
              <span style={{ fontSize: '0.7rem', color: textSecondary, fontWeight: '400' }}>
                ({notes.length} note{notes.length !== 1 ? 's' : ''})
              </span>
            </div>

            {/* Existing notes */}
            {notes.length === 0 ? (
              <div style={styles.emptyNotes}>No follow-up notes yet. Add one below.</div>
            ) : (
              [...notes].reverse().map((note, i) => (
                <div key={i} style={styles.noteItem}>
                  <div style={styles.noteText}>{note.text}</div>
                  <div style={styles.noteDate}>
                    🕐 {new Date(note.createdAt).toLocaleString('en-KE', {
                      dateStyle: 'medium', timeStyle: 'short'
                    })}
                  </div>
                </div>
              ))
            )}

            {/* Add new note */}
            <textarea
              style={styles.noteInput}
              value={noteText}
              onChange={e => setNoteText(e.target.value)}
              placeholder="Add a follow-up note... e.g. Called client, will follow up on Friday"
            />
            <button style={styles.noteBtn} onClick={handleAddNote} disabled={addingNote}>
              {addingNote ? 'Adding...' : '+ Add Note'}
            </button>
          </>
        )}

        <div style={styles.footer}>
          <button style={styles.cancelBtn} onClick={onClose}>Cancel</button>
          <button style={styles.saveBtn} onClick={handleSave}>
            {lead?._id ? 'Save Changes' : 'Add Lead'}
          </button>
        </div>
      </div>
    </div>
  );
}