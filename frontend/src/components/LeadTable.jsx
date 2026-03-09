import StatusBadge from './StatusBadge';

function LeadTable({ leads, onEdit, onDelete }) {
  if (leads.length === 0) {
    return (
      <div style={styles.empty}>
        <p>No leads found. Add your first lead!</p>
      </div>
    );
  }

  return (
    <div style={styles.tableWrapper}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Phone</th>
            <th style={styles.th}>Source</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Notes</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead._id} style={styles.tr}>
              <td style={styles.td}>{lead.name}</td>
              <td style={styles.td}>{lead.email}</td>
              <td style={styles.td}>{lead.phone}</td>
              <td style={styles.td}>{lead.source}</td>
              <td style={styles.td}>
                <StatusBadge status={lead.status} />
              </td>
              <td style={styles.td}>{lead.notes}</td>
              <td style={styles.td}>
                <button
                  style={styles.editBtn}
                  onClick={() => onEdit(lead)}
                >
                  Edit
                </button>
                <button
                  style={styles.deleteBtn}
                  onClick={() => onDelete(lead._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  tableWrapper: {
    overflowX: 'auto',
    borderRadius: '12px',
    border: '1px solid #333',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#1a1a1a',
  },
  th: {
    padding: '14px 16px',
    textAlign: 'left',
    color: '#e8c547',
    borderBottom: '1px solid #333',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
  },
  tr: {
    borderBottom: '1px solid #222',
  },
  td: {
    padding: '12px 16px',
    color: '#ccc',
    fontSize: '0.9rem',
  },
  editBtn: {
    padding: '6px 14px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#4ecca3',
    color: '#000',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginRight: '8px',
  },
  deleteBtn: {
    padding: '6px 14px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#ff4444',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  empty: {
    textAlign: 'center',
    padding: '40px',
    color: '#aaa',
  },
};

export default LeadTable;