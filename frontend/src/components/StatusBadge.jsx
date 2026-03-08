function StatusBadge({ status }) {
  const colors = {
    new: { bg: '#1a3a5c', text: '#4ecca3' },
    contacted: { bg: '#3a3a1a', text: '#e8c547' },
    converted: { bg: '#1a3a1a', text: '#4caf50' },
    lost: { bg: '#3a1a1a', text: '#ff4444' },
  };

  const style = colors[status] || colors.new;

  return (
    <span style={{
      backgroundColor: style.bg,
      color: style.text,
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '0.8rem',
      fontWeight: 'bold',
      textTransform: 'capitalize',
    }}>
      {status}
    </span>
  );
}

export default StatusBadge;