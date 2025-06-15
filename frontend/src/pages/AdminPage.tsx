// src/pages/AdminPage.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { getUsers, deleteUser, getAllJobs, deleteJob } from '../services/api';
import type { IUser } from '../interfaces/IUser';
import type { JobResponseDto } from '../interfaces/ApiResponses';
import { JobTypeLabels, getJobTypeKeyFromValue } from '../interfaces/JobEnums';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const AdminPage: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [jobs, setJobs] = useState<JobResponseDto[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [errorUsers, setErrorUsers] = useState<string | null>(null);
  const [errorJobs, setErrorJobs] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoadingUsers(true);
    setErrorUsers(null);
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err: any) {
      setErrorUsers(err.response?.data?.message || 'Failed to fetch users.');
      console.error('Fetch users error:', err);
    } finally {
      setLoadingUsers(false);
    }
  }, []);

  const fetchJobs = useCallback(async () => {
    setLoadingJobs(true);
    setErrorJobs(null);
    try {
      const data = await getAllJobs();
      setJobs(data);
    } catch (err: any)  {
        setErrorJobs(err.response?.data?.message || 'Failed to fetch jobs.');
      console.error('Fetch jobs error:', err);
    }finally    {
      setLoadingJobs(false);
    }
  }, []);

  useEffect(() => {
    const user = localStorage.getItem('user');
    // This is a crucial security check. If the user is not an admin, we don't even try to fetch data.
    if (!user || JSON.parse(user).role !== 0) {
      setLoadingUsers(false);
      setLoadingJobs(false);
      setErrorUsers("Access Denied. You must be an administrator to view this page.");
      return;
    }
    fetchUsers();
    fetchJobs();
  }, [fetchUsers, fetchJobs]);

  const handleDeleteUser = async (userId: number) => {
    if (!window.confirm(`Are you sure you want to delete user with ID: ${userId}?`)) {
      return;
    }
    try {
      await deleteUser(userId);
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    } catch (err: any) {
      setErrorUsers(err.response?.data?.message || 'Failed to delete user.');
      console.error('Delete user error:', err);
    }
  };

  const handleDeleteJob = async (jobId: number) => {
    if (!window.confirm(`Are you sure you want to delete job with ID: ${jobId}?`)) {
      return;
    }
    try {
      await deleteJob(jobId);
      setJobs(prevJobs => prevJobs.filter(job => job.id !== jobId));
    } catch (err: any) {
        setErrorJobs(err.response?.data?.message || 'Failed to delete job.');
        console.error('Delete job error:', err);
    }  
    
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">Admin Dashboard</h1>

      {/* User Management Card */}
      <div className="card mb-5 shadow">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">Manage Users</h3>
        </div>
        <div className="card-body">
          {errorUsers && <div className="alert alert-danger" role="alert">{errorUsers}</div>}
          {loadingUsers ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading users...</span></div>
            </div>
          ) : !errorUsers && users.length === 0 ? (
            <div className="alert alert-info text-center">No users found.</div>
          ) : !errorUsers && (
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.email}</td>
                      <td>{user.role === 0 ? 'Admin' : 'User'}</td>
                      <td>
                        <Link to={`/edit-user/${user.id}`} className="btn btn-warning btn-sm me-2">Edit</Link>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDeleteUser(user.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Job Management Card */}
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">Manage Jobs</h3>
        </div>
        <div className="card-body">
          {errorJobs && <div className="alert alert-danger" role="alert">{errorJobs}</div>}
          {loadingJobs ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading jobs...</span></div>
            </div>
          ) : !errorJobs && jobs.length === 0 ? (
            <div className="alert alert-info text-center">No jobs found.</div>
          ) : !errorJobs && (
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Type</th>
                    <th>City</th>
                    <th>Salary</th>
                    <th>Posted At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job) => (
                    <tr key={job.id}>
                      <td>{job.id}</td>
                      <td>{job.title}</td>
                      <td>{JobTypeLabels[getJobTypeKeyFromValue(job.type)]}</td>
                      <td>{job.city}</td>
                      <td>${job.salary.toLocaleString()}</td>
                      <td>{job.postedAt ? format(new Date(job.postedAt), 'PPP') : 'N/A'}</td>
                      <td>
                        
                        <button className="btn btn-danger btn-sm" onClick={() => handleDeleteJob(job.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;