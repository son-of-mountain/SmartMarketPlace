// src/components/RegisterCard.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { RegisterRequest } from '../interfaces/IRegister';
import { submitRegister } from '../services/api';

const RegisterCard: React.FC = () => {
  const [formData, setFormData] = useState<RegisterRequest & { confirmPassword: string }>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const registerData: RegisterRequest = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    };

    try {
      await submitRegister(registerData);
      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => navigate('/login'), 2000);
    } catch (err: any) {
      const apiError = err.response?.data?.message || err.response?.data?.title || 'An unexpected error occurred during registration.';
      setError(apiError);
      console.error(err);
    }
  };

  return (
    <div className="card shadow-lg p-4 mx-auto mt-5" style={{ maxWidth: '450px' }}>
      <div className="card-body">
        <h2 className="card-title text-center mb-4">Register</h2>
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        {success && <div className="alert alert-success" role="alert">{success}</div>}
        <form onSubmit={handleRegister}>
          <div className="row g-2 mb-3">
            <div className="col-md">
              <div className="form-floating">
                <input type="text" className="form-control" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required placeholder="John" />
                <label htmlFor="firstName">First Name</label>
              </div>
            </div>
            <div className="col-md">
              <div className="form-floating">
                <input type="text" className="form-control" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required placeholder="Doe" />
                <label htmlFor="lastName">Last Name</label>
              </div>
            </div>
          </div>
          <div className="form-floating mb-3">
            <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder="name@example.com" />
            <label htmlFor="email">Email address</label>
          </div>
          <div className="form-floating mb-3">
            <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} required placeholder="Password" />
            <label htmlFor="password">Password</label>
          </div>
          <div className="form-floating mb-3">
            <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required placeholder="Confirm Password" />
            <label htmlFor="confirmPassword">Confirm Password</label>
          </div>
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">Register</button>
          </div>
        </form>
        <div className="text-center mt-3">
          <small>Already have an account? <Link to="/login">Login here</Link></small>
        </div>
      </div>
    </div>
  );
};

export default RegisterCard;