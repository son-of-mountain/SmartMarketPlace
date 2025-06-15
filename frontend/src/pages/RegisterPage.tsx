// src/pages/RegisterPage.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterCard from '../components/RegisterCard';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // If user is already logged in, redirect them away from the register page
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/jobs');
    }
  }, [navigate]);

  return (
    <div className="container">
      <RegisterCard />
    </div>
  );
};

export default RegisterPage;