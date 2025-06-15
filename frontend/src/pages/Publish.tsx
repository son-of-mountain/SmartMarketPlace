import React, { useEffect, useState } from 'react';
import { getAllJobs } from '../services/api';
import type { JobResponseDto } from '../interfaces/ApiResponses';
import { Card, Container, Row, Col } from 'react-bootstrap';

export default function Publish() {
  const [jobs, setJobs] = useState<JobResponseDto[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getAllJobs();
        setJobs(data);
      } catch (error) {
        alert('Failed to fetch jobs');
      }
    };
    fetchJobs();
  }, []);

  return (
    <Container className="mt-5">
      <h3>Published Jobs</h3>
      <Row>
        {jobs.map(job => (
          <Col md={4} key={job.id} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{job.title}</Card.Title>
                <Card.Text>{job.description.substring(0, 100)}...</Card.Text>
                <Card.Text><strong>Type:</strong> {job.type}</Card.Text>
                <Card.Text><strong>Salary:</strong> ${job.salary}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
