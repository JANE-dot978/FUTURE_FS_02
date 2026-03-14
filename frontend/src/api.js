import axios from 'axios';

const api = axios.create({
  baseURL: 'https://janegathu-crm-api.onrender.com/api'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const loginAdmin = (data) => api.post('/auth/login', data);
export const getLeads = () => api.get('/leads');
export const createLead = (data) => api.post('/leads', data);
export const updateLead = (id, data) => api.put(`/leads/${id}`, data);
export const deleteLead = (id) => api.delete(`/leads/${id}`);
export const addNote = (id, text) => api.post(`/leads/${id}/notes`, { text });

export default api;