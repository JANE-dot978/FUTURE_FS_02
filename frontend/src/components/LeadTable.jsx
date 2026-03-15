import StatusBadge from './StatusBadge';

function LeadTable({ leads, onEdit, onDelete, darkMode }) {
  const cardBg = darkMode ? '#1a1a1a' : '#ffffff';
  const border = darkMode ? '#2a2a2a' : '#e5e5e5';
  const textPrimary = darkMode ? '#cccccc' : '#111111';
  const headerColor = darkMode ? '#e8c547' : '#333333';
  const rowHover = darkMode ? '#1f1f1f' : '#f9f9f9';

  if (leads.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '60px',
        backgroundColor: cardBg,
        borderRadius: '16px',
        border: `1px solid ${border}`,
        color: textPrimary,
      }}>
        <p style={{ fontSize: '2rem' }}>📋</p>
        <p style={{ marginTop: '8px' }}>No leads found. Add your first lead!</p>
      </div>
    );
  }

  return (
    <div style={{
      overflowX: 'auto',
      borderRadius: '12px',
      border: `1px solid ${border}`,
    }}>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        backgroundColor: cardBg,
      }}>
        <thead>
          <tr>
            {['Name', 'Email', 'Phone', 'Source', 'Status', 'Notes', 'Actions'].map((h) => (
              <th key={h} style={{
                padding: '14px 16px',
                textAlign: 'left',
                color: headerColor,
                borderBottom: `1px solid ${border}`,
                fontWeight: '700',
                whiteSpace: 'nowrap',
                fontSize: '0.9rem',
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead._id} style={{
              borderBottom: `1px solid ${border}`,
              backgroundColor: cardBg,
            }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = rowHover}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = cardBg}
            >
              <td style={{ padding: '12px 16px', color: textPrimary, fontSize: '0.9rem', fontWeight: '600' }}>{lead.name}</td>
              <td style={{ padding: '12px 16px', color: textPrimary, fontSize: '0.9rem' }}>{lead.email}</td>
              <td style={{ padding: '12px 16px', color: textPrimary, fontSize: '0.9rem' }}>{lead.phone}</td>
              <td style={{ padding: '12px 16px', color: textPrimary, fontSize: '0.9rem' }}>{lead.source}</td>
              <td style={{ padding: '12px 16px' }}>
                <StatusBadge status={lead.status} />
              </td>
              <td style={{ padding: '12px 16px', color: textPrimary, fontSize: '0.9rem' }}>
                {lead.notes && lead.notes.length > 0
                  ? <span style={{
                      background: 'rgba(232,197,71,0.1)',
                      color: '#e8c547',
                      padding: '3px 10px',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                    }}>
                      📝 {lead.notes.length} note{lead.notes.length > 1 ? 's' : ''}
                    </span>
                  : <span style={{ color: darkMode ? '#444' : '#bbb', fontStyle: 'italic', fontSize: '0.8rem' }}>
                      No notes
                    </span>
                }
              </td>
              <td style={{ padding: '12px 16px' }}>
                <button
                  onClick={() => onEdit(lead)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '6px',
                    border: 'none',
                    backgroundColor: '#4ecca3',
                    color: '#000',
                    fontWeight: '700',
                    cursor: 'pointer',
                    marginRight: '8px',
                    fontSize: '0.85rem',
                  }}
                >Edit</button>
                <button
                  onClick={() => onDelete(lead._id)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '6px',
                    border: 'none',
                    backgroundColor: '#ff4444',
                    color: '#fff',
                    fontWeight: '700',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                  }}
                >Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeadTable;