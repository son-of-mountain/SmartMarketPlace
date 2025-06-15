// src/pages/LoginPage.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginCard from '../components/LoginCard';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/jobs'); // Redirect if already logged in
    }
  }, [navigate]);

  return (
    <div className="container">
      <LoginCard />
    </div>
  );
};

export default LoginPage;