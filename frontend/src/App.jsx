import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ContactForm from './pages/ContactForm';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

export default function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/login" element={<Login darkMode={darkMode} />} />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard darkMode={darkMode} setDarkMode={setDarkMode} />
          </PrivateRoute>
        } />
        <Route path="*" element={<Navigate to="/contact" />} />
      </Routes>
    </BrowserRouter>
  );
}
