// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './authContext';
import './Header.css';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="nav-extended green darken-4">
      <div className="nav-wrapper container">
        {isAuthenticated && (
          <>
            <ul id="nav-mobile" className="left">
              <li>
                <i className="material-icons">account_circle</i>
              </li>
              <li>Usuário</li>
            </ul>
            <ul id="nav-mobile" className="right">
              <li>
                <button onClick={() => logout()} className="waves-effect waves-light btn-small green select-button">
                  Log Out
                </button>
              </li>
            </ul>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
