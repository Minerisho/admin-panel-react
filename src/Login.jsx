// src/Login.jsx
import React from 'react';
import './Login.css'; // Crearemos este archivo CSS para estilos básicos

function Login({ onLogin }) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí podrías añadir una validación simple si quieres,
    // pero para la simulación, simplemente llamamos a onLogin.
    // Ejemplo: if (username === 'admin' && password === 'password')
    onLogin(); // Llama a la función pasada desde App.jsx
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Iniciar Sesión</h2>
        <div className="form-group">
          <label htmlFor="username">Usuario:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="admin"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="password"
          />
        </div>
        <button type="submit" className="login-btn">Entrar</button>
        <p className="login-hint">
          (Simulación: cualquier usuario/contraseña funcionará)
        </p>
      </form>
    </div>
  );
}

export default Login;