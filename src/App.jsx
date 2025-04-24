// src/App.jsx
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import logoImage from './assets/logo.svg';
import Login from './Login'; 

// --- Componentes de las Vistas ---
const Clientes = () => <div className="content-container"><h1>Gestión de Clientes</h1><p>Aquí podrás administrar la información de los clientes.</p></div>;
const Proveedor = () => <div className="content-container"><h1>Gestión de Proveedores</h1><p>Aquí podrás administrar la información de los proveedores.</p></div>;
const Usuarios = () => <div className="content-container"><h1>Gestión de Usuarios</h1><p>Aquí podrás administrar los usuarios del sistema.</p></div>;

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('isLoggedIn') === 'true');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn'); 
  };


  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div className="admin-layout">
        {/* --- Sidebar --- */}
        <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
          <div className="sidebar-header">
            <img src={logoImage} alt="Logo" className="logo" />
            {sidebarOpen && <h2>Admin Panel</h2>}
          </div>
          <nav className="sidebar-nav">
            <ul>
              <li>
                <NavLink to="/clientes" className={({ isActive }) => isActive ? 'active' : ''}>
                  <i className="icon">👥</i>
                  {sidebarOpen && <span>Clientes</span>}
                </NavLink>
              </li>
              <li>
                <NavLink to="/proveedor" className={({ isActive }) => isActive ? 'active' : ''}>
                  <i className="icon">🏭</i>
                  {sidebarOpen && <span>Proveedor</span>}
                </NavLink>
              </li>
              <li>
                <NavLink to="/usuarios" className={({ isActive }) => isActive ? 'active' : ''}>
                  <i className="icon">👤</i>
                  {sidebarOpen && <span>Usuarios</span>}
                </NavLink>
              </li>
              <li>
                {/* El enlace de Logout llama directamente a handleLogout */}
                <NavLink to="/login" onClick={handleLogout}>
                  <i className="icon">🚪</i>
                  {sidebarOpen && <span>Logout</span>}
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>

        {/* --- Contenido Principal --- */}
        <div className="main-content">
          <header className="top-navbar">
            <button className="toggle-btn" onClick={toggleSidebar}>
              ☰
            </button>
            <div className="header-right">
              <span className="user-info">Admin User</span>
              <span className="user-avatar">👨‍💼</span>
            </div>
          </header>
          <main>
            {/* --- Rutas del Panel --- */}
            <Routes>
              <Route path="/" element={<Navigate to="/clientes" replace />} />
              <Route path="/clientes" element={<Clientes />} />
              <Route path="/proveedor" element={<Proveedor />} />
              <Route path="/usuarios" element={<Usuarios />} />
              <Route path="/login" element={<Navigate to="/clientes" replace />} />
              {/* Cualquier otra ruta podría redirigir a clientes o mostrar un 404 */}
              <Route path="*" element={<Navigate to="/clientes" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;