// src/pages/PromptPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createJobFromPrompt } from '../services/api';
import type { PromptRequest } from '../interfaces/ApiRequests';
import type { JobResponseDto } from '../interfaces/ApiResponses';

const PromptPage: React.FC = () => {
  const [promptText, setPromptText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const request: PromptRequest = { text: promptText };

    try {
      const jobResponse: JobResponseDto = await createJobFromPrompt(request);
      // Navigate to /create-job and pass the generated job data as state
      navigate('/create-job', { state: { initialJobData: jobResponse } });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to generate job from prompt.');
      console.error('Prompt error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-lg p-4 mx-auto" style={{ maxWidth: '600px' }}>
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Generate Job from Prompt</h2>
          {error && <div className="alert alert-danger" role="alert">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="promptInput" className="form-label">Enter Job Description Prompt</label>
              <textarea
                className="form-control"
                id="promptInput"
                rows={5}
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                placeholder="e.g., 'Develop a coffee shop website' or 'Build a mobile app for a fitness tracker'"
                required
              ></textarea>
            </div>
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Generating...
                  </>
                ) : (
                  'Generate Job Details'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PromptPage;