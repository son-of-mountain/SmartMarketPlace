// src/components/EditUserForm.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import type { UserEditRequest } from '../interfaces/ApiRequests';
import { editUser, getUser } from '../services/api';

const EditUserForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<UserEditRequest>({
    firstName: '',
    lastName: '',
    email: '',
    role: 1, // Default to 'User'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchUserData = useCallback(async (userId: number) => {
    try {
      const userData = await getUser(userId);
      setFormData({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        role: userData.role,
      });
    } catch (err: any) {
      setError("Failed to load user data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (id) {
      fetchUserData(parseInt(id, 10));
    }
  }, [id, fetchUserData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'role' ? parseInt(value, 10) : value });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    setError(null);
    setSuccess(null);
    try {
      await editUser(parseInt(id, 10), formData);
      setSuccess("User updated successfully! Redirecting...");
      setTimeout(() => navigate('/admin'), 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update user.");
    }
  };

  if (loading) {
    return <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div>;
  }

  return (
    <div className="card shadow-lg p-4 mx-auto mt-5" style={{ maxWidth: '500px' }}>
      <div className="card-body">
        <h2 className="card-title text-center mb-4">Edit User (ID: {id})</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <form onSubmit={handleUpdate}>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">First Name</label>
            <input type="text" className="form-control" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">Last Name</label>
            <input type="text" className="form-control" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="role" className="form-label">Role</label>
            <select className="form-select" id="role" name="role" value={formData.role} onChange={handleChange}>
              <option value={1}>User</option>
              <option value={0}>Admin</option>
            </select>
          </div>
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-success">Save Changes</button>
            <Link to="/admin" className="btn btn-secondary">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserForm;