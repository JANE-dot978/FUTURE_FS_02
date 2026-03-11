import axios from 'axios';

const API = axios.create({
  baseURL: 'https://janegathu-crm-api.onrender.com/api',
});

// Attach token to every request automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const loginAdmin = (data) => API.post('/auth/login', data);
export const getLeads = () => API.get('/leads');
export const createLead = (data) => API.post('/leads', data);
export const updateLead = (id, data) => API.put(`/leads/${id}`, data);
export const deleteLead = (id) => API.delete(`/leads/${id}`);