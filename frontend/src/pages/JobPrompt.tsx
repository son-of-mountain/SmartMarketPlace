import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createJobFromPrompt } from '../services/api';
import type { JobResponseDto } from '../interfaces/ApiResponses';
import { Form, Button } from 'react-bootstrap';

export default function JobPrompt() {
  const [text, setText] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const job: JobResponseDto = await createJobFromPrompt({ text });
      localStorage.setItem('promptJob', JSON.stringify(job));
      navigate('/job-form');
    } catch (error) {
      alert('Error creating job from prompt');
    }
  };

  return (
    <div className="container mt-5">
      <h3>Create Job from Prompt</h3>
      <Form>
        <Form.Group controlId="promptText">
          <Form.Label>Prompt Text</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter prompt..."
          />
        </Form.Group>
        <Button variant="primary" className="mt-3" onClick={handleSubmit}>
          Generate Job
        </Button>
      </Form>
    </div>
  );
}
