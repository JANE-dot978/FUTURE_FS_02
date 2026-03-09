import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import LeadTable from '../components/LeadTable';
import LeadModal from '../components/LeadModal';
import { getLeads, createLead, updateLead, deleteLead } from '../api';

function Dashboard() {
  const [leads, setLeads] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await getLeads();
      setLeads(res.data);
    } catch (err) {
      console.error('Failed to fetch leads:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (form) => {
    try {
      if (editingLead) {
        await updateLead(editingLead._id, form);
      } else {
        await createLead(form);
      }
      setShowModal(false);
      setEditingLead(null);
      fetchLeads();
    } catch (err) {
      console.error('Failed to save lead:', err);
    }
  };

  const handleEdit = (lead) => {
    setEditingLead(lead);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this lead?')) return;
    try {
      await deleteLead(id);
      fetchLeads();
    } catch (err) {
      console.error('Failed to delete lead:', err);
    }
  };

  const handleAddNew = () => {
    setEditingLead(null);
    setShowModal(true);
  };

  const filteredLeads = filter === 'all'
    ? leads
    : leads.filter((l) => l.status === filter);

  const counts = {
    all: leads.length,
    new: leads.filter((l) => l.status === 'new').length,
    contacted: leads.filter((l) => l.status === 'contacted').length,
    converted: leads.filter((l) => l.status === 'converted').length,
    lost: leads.filter((l) => l.status === 'lost').length,
  };

  return (
    <div style={styles.page}>
      <Navbar />

      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.title}>Client Leads</h2>
          <button style={styles.addBtn} onClick={handleAddNew}>
            + Add Lead
          </button>
        </div>

        {/* Stats */}
        <div style={styles.stats}>
          {Object.entries(counts).map(([key, value]) => (
            <div key={key} style={styles.statCard}>
              <p style={styles.statNumber}>{value}</p>
              <p style={styles.statLabel}>{key.charAt(0).toUpperCase() + key.slice(1)}</p>
            </div>
          ))}
        </div>

        {/* Filter Tabs */}
        <div style={styles.filters}>
          {['all', 'new', 'contacted', 'converted', 'lost'].map((f) => (
            <button
              key={f}
              style={{
                ...styles.filterBtn,
                backgroundColor: filter === f ? '#e8c547' : '#1a1a1a',
                color: filter === f ? '#000' : '#aaa',
              }}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Table */}
        {loading ? (
          <p style={{ color: '#aaa', textAlign: 'center' }}>Loading leads...</p>
        ) : (
          <LeadTable
            leads={filteredLeads}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <LeadModal
          onClose={() => {
            setShowModal(false);
            setEditingLead(null);
          }}
          onSave={handleSave}
          existingLead={editingLead}
        />
      )}
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#0f0f0f',
  },
  container: {
    padding: '32px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  },
  title: {
    color: '#fff',
    margin: 0,
    fontSize: '1.8rem',
  },
  addBtn: {
    padding: '10px 24px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#e8c547',
    color: '#000',
    fontWeight: 'bold',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  stats: {
    display: 'flex',
    gap: '16px',
    marginBottom: '24px',
    flexWrap: 'wrap',
  },
  statCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: '10px',
    padding: '16px 24px',
    textAlign: 'center',
    border: '1px solid #333',
    minWidth: '100px',
  },
  statNumber: {
    color: '#e8c547',
    fontSize: '2rem',
    fontWeight: 'bold',
    margin: 0,
  },
  statLabel: {
    color: '#aaa',
    margin: 0,
    fontSize: '0.85rem',
  },
  filters: {
    display: 'flex',
    gap: '8px',
    marginBottom: '20px',
    flexWrap: 'wrap',
  },
  filterBtn: {
    padding: '8px 18px',
    borderRadius: '20px',
    border: '1px solid #333',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '0.85rem',
  },
};

export default Dashboard;
