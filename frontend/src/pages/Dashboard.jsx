import { useState, useEffect } from 'react';
import Sidebar from '../components/Navbar';
import LeadTable from '../components/LeadTable';
import LeadModal from '../components/LeadModal';
import { getLeads, createLead, updateLead, deleteLead } from '../api';

function Dashboard({ darkMode, setDarkMode }) {
  const [leads, setLeads] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  // Colors based on mode
  const bg = darkMode ? '#0a0a0a' : '#f4f4f4';
  const cardBg = darkMode ? '#111' : '#ffffff';
  const border = darkMode ? '#1e1e1e' : '#e5e5e5';
  const textPrimary = darkMode ? '#ffffff' : '#111111';
  const textSecondary = darkMode ? '#aaaaaa' : '#555555'; // FIXED — now visible in both modes

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

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = async (form) => {
    try {
      if (editingLead) {
        await updateLead(editingLead._id, form);
        showToast('Lead updated successfully!');
      } else {
        await createLead(form);
        showToast('New lead added!');
      }
      setShowModal(false);
      setEditingLead(null);
      fetchLeads();
    } catch (err) {
      showToast('Something went wrong.', 'error');
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
      showToast('Lead deleted.');
      fetchLeads();
    } catch (err) {
      showToast('Failed to delete lead.', 'error');
    }
  };

  const counts = {
    all: leads.length,
    new: leads.filter((l) => l.status === 'new').length,
    contacted: leads.filter((l) => l.status === 'contacted').length,
    converted: leads.filter((l) => l.status === 'converted').length,
    lost: leads.filter((l) => l.status === 'lost').length,
  };

  const getFilteredLeads = () => {
    let filtered = leads;
    if (activeTab !== 'dashboard' && activeTab !== 'leads') {
      filtered = leads.filter((l) => l.status === activeTab);
    }
    if (search) {
      filtered = filtered.filter((l) =>
        l.name.toLowerCase().includes(search.toLowerCase()) ||
        l.email.toLowerCase().includes(search.toLowerCase())
      );
    }
    return filtered;
  };

  const recentLeads = [...leads]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: bg }}>

      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        leadsCount={leads.length}
        darkMode={darkMode}
      />

      {/* Main Content */}
      <div style={{ marginLeft: '260px', flex: 1, padding: '32px', minHeight: '100vh' }}>

        {/* Top Bar */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginBottom: '32px', paddingBottom: '24px',
          borderBottom: `1px solid ${border}`,
        }}>
          <div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: '700', color: textPrimary, margin: 0 }}>
              {activeTab === 'dashboard' ? 'Dashboard Overview' : 'Client Leads'}
            </h2>
            <p style={{ color: textSecondary, fontSize: '0.9rem', marginTop: '4px' }}>
              {activeTab === 'dashboard' ? 'Welcome back, Jane!' : `${getFilteredLeads().length} leads found`}
            </p>
          </div>

          {/* Right side buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>

            {/* Dark/Light Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              style={{
                padding: '10px 16px',
                borderRadius: '10px',
                border: `1px solid ${border}`,
                backgroundColor: cardBg,
                color: textPrimary,
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>

            {/* Add Lead Button */}
            <button
              onClick={() => { setEditingLead(null); setShowModal(true); }}
              style={{
                padding: '12px 24px',
                borderRadius: '10px',
                border: 'none',
                background: 'linear-gradient(135deg, #e8c547, #f0d060)',
                color: '#000',
                fontWeight: '700',
                fontSize: '0.95rem',
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(232,197,71,0.2)',
              }}
            >
              + Add Lead
            </button>
          </div>
        </div>

        {/* Dashboard Overview */}
        {activeTab === 'dashboard' && (
          <div className="fade-in">

            {/* Stat Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '16px',
              marginBottom: '32px',
            }}>
              {[
                { label: 'Total Leads', value: counts.all, color: '#e8c547', icon: '◈' },
                { label: 'New Leads', value: counts.new, color: '#4ecca3', icon: '◉' },
                { label: 'Contacted', value: counts.contacted, color: '#f0a500', icon: '◉' },
                { label: 'Converted', value: counts.converted, color: '#4caf50', icon: '◉' },
                { label: 'Lost', value: counts.lost, color: '#ff4444', icon: '◉' },
              ].map((stat, i) => (
                <div key={i} style={{
                  backgroundColor: cardBg,
                  border: `1px solid ${border}`,
                  borderRadius: '14px',
                  padding: '20px',
                }} className="fade-in">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ color: stat.color, fontSize: '1rem' }}>{stat.icon}</span>
                    <span style={{ fontSize: '2rem', fontWeight: '800', color: stat.color }}>{stat.value}</span>
                  </div>
                  <p style={{ color: textSecondary, fontSize: '0.95rem', fontWeight: '600', marginBottom: '12px' }}>{stat.label}</p>
                  <div style={{ height: '3px', borderRadius: '2px', backgroundColor: darkMode ? '#1a1a1a' : '#eee', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', borderRadius: '2px',
                      backgroundColor: stat.color,
                      width: counts.all > 0 ? `${(stat.value / counts.all) * 100}%` : '0%',
                      transition: 'width 0.5s ease',
                    }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Leads */}
            <div style={{
              backgroundColor: cardBg,
              borderRadius: '16px',
              padding: '24px',
              border: `1px solid ${border}`,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ color: textPrimary, fontSize: '1rem', fontWeight: '600', margin: 0 }}>Recent Leads</h3>
                <button
                  onClick={() => setActiveTab('leads')}
                  style={{ backgroundColor: 'transparent', border: 'none', color: '#e8c547', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600' }}
                >
                  View All →
                </button>
              </div>

              {recentLeads.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                  <p style={{ fontSize: '2rem' }}>📋</p>
                  <p style={{ color: textSecondary, marginTop: '8px' }}>No leads yet. Add your first lead!</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {recentLeads.map((lead) => (
                    <div key={lead._id} style={{
                      display: 'flex', alignItems: 'center', gap: '14px',
                      padding: '14px',
                      backgroundColor: darkMode ? '#161616' : '#f9f9f9',
                      borderRadius: '10px',
                      border: `1px solid ${border}`,
                    }} className="slide-in">
                      <div style={{
                        width: '38px', height: '38px', borderRadius: '50%',
                        background: 'linear-gradient(135deg, #e8c547, #4ecca3)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: '700', color: '#000', fontSize: '0.95rem', flexShrink: 0,
                      }}>
                        {lead.name.charAt(0).toUpperCase()}
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ color: textPrimary, fontWeight: '600', fontSize: '0.9rem', margin: 0 }}>{lead.name}</p>
                        <p style={{ color: textSecondary, fontSize: '0.8rem', margin: 0 }}>{lead.email}</p>
                      </div>
                      <div style={{
                        padding: '4px 12px', borderRadius: '20px',
                        fontSize: '0.8rem', fontWeight: '600', textTransform: 'capitalize',
                        backgroundColor: {
                          new: 'rgba(78,204,163,0.1)',
                          contacted: 'rgba(232,197,71,0.1)',
                          converted: 'rgba(76,175,80,0.1)',
                          lost: 'rgba(255,68,68,0.1)',
                        }[lead.status],
                        color: {
                          new: '#4ecca3',
                          contacted: '#e8c547',
                          converted: '#4caf50',
                          lost: '#ff4444',
                        }[lead.status],
                      }}>
                        {lead.status}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Leads Table View */}
        {activeTab !== 'dashboard' && (
          <div className="fade-in">
            <div style={{
              display: 'flex', alignItems: 'center',
              backgroundColor: cardBg,
              border: `1px solid ${border}`,
              borderRadius: '10px',
              padding: '0 16px',
              marginBottom: '20px',
              gap: '10px',
            }}>
              <span>🔍</span>
              <input
                style={{
                  flex: 1, padding: '14px 0',
                  backgroundColor: 'transparent',
                  border: 'none', color: textPrimary,
                  fontSize: '0.95rem', outline: 'none',
                }}
                type="text"
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  style={{ backgroundColor: 'transparent', border: 'none', color: textSecondary, cursor: 'pointer' }}
                >✕</button>
              )}
            </div>

            {loading ? (
              <p style={{ color: textSecondary, textAlign: 'center', padding: '40px' }}>Loading leads...</p>
            ) : (
              <LeadTable
                leads={getFilteredLeads()}
                onEdit={handleEdit}
                onDelete={handleDelete}
                darkMode={darkMode}
              />
            )}
          </div>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: '24px', right: '24px',
          padding: '14px 20px', borderRadius: '10px',
          border: '1px solid',
          backgroundColor: toast.type === 'error' ? '#1a0a0a' : '#0a1a0f',
          borderColor: toast.type === 'error' ? '#ff4444' : '#4ecca3',
          color: toast.type === 'error' ? '#ff6666' : '#4ecca3',
          fontSize: '0.9rem', fontWeight: '600',
          zIndex: 9999,
          boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
        }} className="pop-in">
          {toast.type === 'error' ? '⚠️' : '✅'} {toast.message}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <LeadModal
          onClose={() => { setShowModal(false); setEditingLead(null); }}
          onSave={handleSave}
          existingLead={editingLead}
          darkMode={darkMode}
        />
      )}
    </div>
  );
}

export default Dashboard;