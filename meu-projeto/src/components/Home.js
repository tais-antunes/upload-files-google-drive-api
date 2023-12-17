// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './authContext';
import './Home.css';

function Home() {
  const { isAuthenticated, isLoading, loginWithRedirect, logout, user } = useAuth();

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="home-container">
      <h1 className="h1-home">Selecione o projeto para a prestação de contas.</h1>

      {/* Lista de projetos */}
      <div className="project-list">
        <div className="collection-item avatar project-item scale-transition scale-in">
          <div className="project-card">
            <i className="material-icons circle">folder</i>
            <span className="span">Projeto Um</span>
            <Link to="/projeto-um" className="waves-effect waves-light btn-small green select-button">
              Selecionar
            </Link>
          </div>
        </div>

        <div className="collection-item avatar project-item scale-transition scale-in">
          <div className="project-card">
            <i className="material-icons circle">folder</i>
            <span className="span">Projeto Dois</span>
            <Link to="/projeto-dois" className="waves-effect waves-light btn-small green select-button">
              Selecionar
            </Link>
          </div>
        </div>
      </div>

      {/* Verifica se o usuário está autenticado no contexto
      {isAuthenticated && (
        <div className="logout-button-container">
          <button onClick={() => logout()} className="waves-effect waves-light btn-small red">
            Log Out
          </button>
        </div>
      )} */}

      {/* Adiciona o botão de login se o usuário não estiver autenticado */}
      {!isAuthenticated && user === null && (
        <div className="login-button-container">
          <button onClick={() => loginWithRedirect()} className="waves-effect waves-light btn-small green">
            Log In
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
