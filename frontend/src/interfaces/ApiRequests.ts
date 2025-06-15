// src/interfaces/ApiRequests.ts
import { type JobNumericType } from "./JobEnums";

export interface PromptRequest {
  text: string;
}

// Renamed from CreateJobRequest to JobCreateRequest
// Properties remain PascalCase as per your backend C# DTO example for POST requests
export interface JobCreateRequest {
  Title: string;
  Description: string;
  Type: JobNumericType;
  Salary: number;
  Duration: string;
  City: string;
  Deliverables?: string | null;
  Deadline?: string | null; // ISO 8601 string (e.g., "YYYY-MM-DDTHH:mm:ssZ")
}

export interface UserEditRequest {
  firstName: string;
  lastName: string;
  email: string;
  role: number; // 0 for Admin, > 0 for User
}