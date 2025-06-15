// src/interfaces/ApiResponses.ts
import type { JobNumericType, JobType } from "./JobEnums"; // Import JobType (the string literal)

// This interface describes the response from GET /jobs
export interface JobResponseDto {
  id: number;
  title: string;
  description: string;
  type: JobNumericType;
  salary: number;
  duration: string;
  city: string;
  deliverables: string | null;
  deadline: string | null;
  postedAt: string | null;
}

// NEW: This interface describes the inconsistent response from POST /jobs/create-from-prompt
export interface PromptJobResponse {
  Id: number;
  Title: string;
  Description: string;
  Type: JobType; // Note: The type is the string "Remote", "Hybrid", etc.
  Salary: number;
  Duration: string;
  City: string;
  Deliverables: string | null;
  Deadline: string | null;
  PostedAt: string | null;
}