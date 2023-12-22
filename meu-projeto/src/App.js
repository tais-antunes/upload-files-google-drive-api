// App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import ItemList from './components/ItemList';
import Upload from './components/Upload';
import AdminDashboard from './components/AdminDashboard';
import MultiStepForm from './components/MultiStepForm';
import AdminLogin from './components/AdminLogin';
import Login from './components/login'; 
import LogoutButton from './components/LogoutButton';
import { AuthProvider, useAuth } from './components/authContext';

const ProtectedRoute = ({ element }) => {
  const auth = useAuth();
  const isAuthenticated = auth ? auth.isAuthenticated : false;

  return isAuthenticated ? (
    <>
      <Header />
      {element}
    </>
  ) : (
    <Navigate to="/" />
  );
};

const AdminProtectedRoute = ({ element }) => {
  const auth = useAuth();
  const isAuthenticated = auth ? auth.isAuthenticated : false;

  return isAuthenticated ? (
    <>
      <Header />
      {element}
    </>
  ) : (
    <Navigate to="/admin/login" />
  );
};

const App = () => {
  const auth = useAuth();
  const isAuthenticated = auth ? auth.isAuthenticated : false;

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin/login" element={<AdminLogin />} /> {/* Nova rota de login para admin */}
          <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
          <Route path="/projeto-um" element={<ProtectedRoute element={<ItemList />} />} />
          <Route path="/projeto-dois" element={<ProtectedRoute element={<Upload />} />} />
          <Route
            path="/multistepform/:itemId"
            element={<ProtectedRoute element={<MultiStepForm />} />}
          />
          <Route
            path="/admin"
            element={<AdminProtectedRoute element={<AdminDashboard />} />} // Rota protegida para admin
          />
        </Routes>
        {isAuthenticated && <LogoutButton />}
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
