// src/components/LoginCard.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { LoginRequest } from '../interfaces/ILogin'; // Changed ILogin to LoginRequest
 // Changed ILogin to LoginRequest
import { submitLogin } from '../services/api';

const LoginCard: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const loginData: LoginRequest = { email, password }; // Changed ILogin to LoginRequest

    try {
      const response = await submitLogin(loginData);
      if (response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        navigate('/jobs');
      } else {
        setError(response.errorMessage || 'Login failed. Please check your credentials.');
      }
    } catch (err: any) {
      setError(err.response?.data?.errorMessage || 'An unexpected error occurred during login.');
      console.error(err);
    }
  };

  return (
    <div className="card shadow-lg p-4 mx-auto mt-5" style={{ maxWidth: '400px' }}>
      <div className="card-body">
        <h2 className="card-title text-center mb-4">Login</h2>
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="emailInput" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="emailInput"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="passwordInput" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="passwordInput"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">Login</button>
          </div>
        </form>
         <div className="text-center mt-3">
          <small>Don't have an account? <Link to="/register">Register here</Link></small>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;