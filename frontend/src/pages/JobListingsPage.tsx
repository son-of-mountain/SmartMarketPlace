// src/pages/JobListingsPage.tsx
import React, { useState, useEffect, useCallback } from 'react';
// UPDATED: Import JobResponseDto
// UPDATED: Import JobResponseDto
import type { JobResponseDto } from '../interfaces/ApiResponses';
import { JobTypeLabels, getJobTypeKeyFromValue } from '../interfaces/JobEnums'; // Note: Changed JobEnum to JobEnums here
import { getAllJobs, deleteJob } from '../services/api';
import { format } from 'date-fns';

const JobListingsPage: React.FC = () => {
  const [jobs, setJobs] = useState<JobResponseDto[]>([]); // UPDATED: State type is JobResponseDto[]
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const user = localStorage.getItem('user');
  const isAdmin = user ? JSON.parse(user).role === 0 : false;

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllJobs();
      setJobs(data.sort((a, b) => {
        const dateA = a.postedAt ? new Date(a.postedAt).getTime() : 0; // UPDATED: Access postedAt (camelCase)
        const dateB = b.postedAt ? new Date(b.postedAt).getTime() : 0; // UPDATED: Access postedAt (camelCase)
        return dateB - dateA;
      }));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch jobs.');
      console.error('Fetch jobs error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleDeleteJob = async (jobId: number) => {
    if (!window.confirm('Are you sure you want to delete this job?')) {
      return;
    }
    try {
      await deleteJob(jobId);
      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId)); // UPDATED: Access job.id (camelCase)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete job.');
      console.error('Delete job error:', err);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">All Job Listings</h2>
      {jobs.length === 0 ? (
        <div className="alert alert-info text-center" role="alert">No jobs found.</div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {jobs.map((job) => (
            <div className="col" key={job.id}> {/* UPDATED: Access job.id (camelCase) */}
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-primary">{job.title}</h5> {/* UPDATED: Access job.title (camelCase) */}
                  <h6 className="card-subtitle mb-2 text-muted">{JobTypeLabels[getJobTypeKeyFromValue(job.type)]} | {job.city}</h6> {/* UPDATED: Access job.type and job.city (camelCase) */}
                  {/* FIX for "Cannot read properties of undefined (reading 'substring')" */}
                  <p className="card-text flex-grow-1">
                    {job.description ? `${job.description.substring(0, 150)}${job.description.length > 150 ? '...' : ''}` : 'No description provided.'}
                  </p>
                  <ul className="list-group list-group-flush mt-auto">
                    <li className="list-group-item">
                      <strong>Salary:</strong> ${job.salary.toLocaleString()} {/* UPDATED: Access job.salary (camelCase) */}
                    </li>
                    <li className="list-group-item">
                      <strong>Duration:</strong> {job.duration} {/* UPDATED: Access job.duration (camelCase) */}
                    </li>
                    {job.deadline && (
                      <li className="list-group-item">
                        <strong>Deadline:</strong> {format(new Date(job.deadline), 'PPP')} {/* UPDATED: Access job.deadline (camelCase) */}
                      </li>
                    )}
                    {job.postedAt && (
                      <li className="list-group-item">
                        <small className="text-muted">Posted: {format(new Date(job.postedAt), 'PPP')}</small> {/* UPDATED: Access job.postedAt (camelCase) */}
                      </li>
                    )}
                  </ul>
                  {isAdmin && (
                    <div className="mt-3">
                      <button
                        className="btn btn-danger btn-sm w-100"
                        onClick={() => handleDeleteJob(job.id)}
                      >
                        Delete Job
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobListingsPage;