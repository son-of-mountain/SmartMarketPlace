// src/components/JobForm.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// UPDATED: Import JobCreateRequest (for payload) and JobResponseDto (for initialData)
// UPDATED: Import JobCreateRequest (for payload) and JobResponseDto (for initialData)
import type { JobCreateRequest } from '../interfaces/ApiRequests';
import type { JobResponseDto } from '../interfaces/ApiResponses';
import { type JobType, JobTypeMap, JobTypeLabels, getJobTypeKeyFromValue } from '../interfaces/JobEnums';
import { createJob } from '../services/api';

interface JobFormProps {
  initialData?: JobResponseDto; // UPDATED: Prop type is now JobResponseDto
}

const JobForm: React.FC<JobFormProps> = ({ initialData }) => {
  const navigate = useNavigate();
  // State for JobType is the string literal type, and other fields match JobCreateRequest's PascalCase
  const [jobData, setJobData] = useState<Omit<JobCreateRequest, 'Type'> & { Type: JobType }>({
    Title: '',
    Description: '',
    Type: "Remote",
    Salary: 0,
    Duration: '',
    City: '',
    Deliverables: '',
    Deadline: '',
  });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setJobData({
        Title: initialData.title || '', // UPDATED: Access initialData.title (camelCase)
        Description: initialData.description || '', // UPDATED: Access initialData.description (camelCase)
        Type: getJobTypeKeyFromValue(initialData.type), // UPDATED: Access initialData.type (camelCase)
        Salary: initialData.salary || 0, // UPDATED: Access initialData.salary (camelCase)
        Duration: initialData.duration || '', // UPDATED: Access initialData.duration (camelCase)
        City: initialData.city || '', // UPDATED: Access initialData.city (camelCase)
        Deliverables: initialData.deliverables || '', // UPDATED: Access initialData.deliverables (camelCase)
        Deadline: initialData.deadline ? new Date(initialData.deadline).toISOString().split('T')[0] : '', // UPDATED: Access initialData.deadline (camelCase)
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setJobData((prevData) => ({
      ...prevData,
      [name]: name === 'Salary' ? parseFloat(value) : value,
    }));
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setJobData((prevData) => ({
      ...prevData,
      Type: e.target.value as JobType,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    const deadlineValue = jobData.Deadline ? new Date(jobData.Deadline).toISOString() : null;

    try {
      // payload type is JobCreateRequest, which has PascalCase properties
      const payload: JobCreateRequest = {
        ...jobData,
        Type: JobTypeMap[jobData.Type],
        Deadline: deadlineValue,
        Deliverables: jobData.Deliverables === '' ? null : jobData.Deliverables
      };
      await createJob(payload);
      setSuccessMessage('Job published successfully!');
      setJobData({
        Title: '', Description: '', Type: "Remote", Salary: 0, Duration: '', City: '', Deliverables: '', Deadline: '',
      });
      setTimeout(() => navigate('/jobs'), 2000);
    } catch (err: any) {
      setErrorMessage(err.response?.data?.message || 'Failed to publish job.');
      console.error('Publish job error:', err);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-lg p-4 mx-auto" style={{ maxWidth: '800px' }}>
        <div className="card-body">
          <h2 className="card-title text-center mb-4">{initialData ? 'Review & Publish Job' : 'Create New Job'}</h2>
          {successMessage && <div className="alert alert-success" role="alert">{successMessage}</div>}
          {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input type="text" className="form-control" id="title" name="Title" value={jobData.Title} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea className="form-control" id="description" name="Description" rows={5} value={jobData.Description} onChange={handleChange} required></textarea>
            </div>
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label htmlFor="type" className="form-label">Job Type</label>
                <select className="form-select" id="type" name="Type" value={jobData.Type} onChange={handleTypeChange} required>
                  {Object.keys(JobTypeMap).map((key) => (
                    <option key={key} value={key}>{JobTypeLabels[key as JobType]}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <label htmlFor="salary" className="form-label">Salary</label>
                <input type="number" className="form-control" id="salary" name="Salary" value={jobData.Salary} onChange={handleChange} required />
              </div>
            </div>
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label htmlFor="duration" className="form-label">Duration</label>
                <input type="text" className="form-control" id="duration" name="Duration" value={jobData.Duration} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label htmlFor="city" className="form-label">City</label>
                <input type="text" className="form-control" id="city" name="City" value={jobData.City} onChange={handleChange} required />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="deliverables" className="form-label">Deliverables (Optional)</label>
              <textarea className="form-control" id="deliverables" name="Deliverables" rows={3} value={jobData.Deliverables || ''} onChange={handleChange}></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="deadline" className="form-label">Deadline (Optional)</label>
              <input type="date" className="form-control" id="deadline" name="Deadline" value={jobData.Deadline || ''} onChange={handleChange} />
            </div>
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-success btn-lg">Publish Job</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobForm;