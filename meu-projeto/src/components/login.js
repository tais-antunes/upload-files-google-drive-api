// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './authContext';
import './Login.css'; // Importe o CSS

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login(username, password);

      
      navigate('/home');
    } catch (error) {
      console.error('Erro ao fazer login:', error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className='h1-login'>Login</h2>
        <input
          type="text"
          placeholder="Nome de Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="waves-effect waves-light btn-small green" onClick={handleLogin}>Entrar</button>
      </div>
    </div>
  );
};

export default Login;
