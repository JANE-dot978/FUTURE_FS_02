import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login darkMode={darkMode} />} />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard darkMode={darkMode} setDarkMode={setDarkMode} />
          </PrivateRoute>
        } />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;