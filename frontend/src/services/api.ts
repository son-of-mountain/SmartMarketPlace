// src/services/api.ts
import type { LoginRequest, LoginResponse } from './../interfaces/ILogin';
// UPDATED: Import RegisterRequest and RegisterResponse from IRegister.ts
import type { RegisterRequest, RegisterResponse } from './../interfaces/IRegister';
import type { IUser } from '../interfaces/IUser'; // IUser is still used for generic user data
import type { PromptRequest,JobCreateRequest, UserEditRequest } from '../interfaces/ApiRequests';
import type { JobResponseDto, PromptJobResponse } from '../interfaces/ApiResponses';
import api from "./axios";
import { JobTypeMap } from '../interfaces/JobEnums';

// Authentication Service Calls
export async function submitLogin(data: LoginRequest): Promise<LoginResponse> {
  try {
    const response = await api.post('/auth/login', data);
    return response.data;
  } catch (error: any) {
    console.error('Login failed:', error.response?.data || error.message);
    throw error;
  }
}

// UPDATED: Register Function - now uses RegisterRequest for input and RegisterResponse for output
export async function submitRegister(data: RegisterRequest): Promise<RegisterResponse> {
  try {
    const response = await api.post('/auth/register', data);
    return response.data; // The created user object returned from API
  } catch (error: any) {
    console.error('Register failed:', error.response?.data || error.message);
    throw error;
  }
}

// User Management Service Calls (these still return IUser based on your API spec)
export async function getUsers(): Promise<IUser[]> {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error: any) {
    console.error('Fetching users failed:', error.response?.data || error.message);
    throw error;
  }
}

export async function getUser(id: number): Promise<IUser> {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error: any) {
    console.error(`Fetching user ${id} failed:`, error.response?.data || error.message);
    throw error;
  }
}

export async function deleteUser(id: number): Promise<void> {
  try {
    await api.delete(`/users/${id}`);
  } catch (error: any) {
    console.error(`Deleting user ${id} failed:`, error.response?.data || error.message);
    throw error;
  }
}

// Job Service Calls
export async function createJobFromPrompt(req: PromptRequest): Promise<JobResponseDto> {
  try {
    // Tell Axios to expect the inconsistent PascalCase response
    const res = await api.post<PromptJobResponse>('/jobs/create-from-prompt', req);
    const promptResponse = res.data;

    // Transform the inconsistent response into our standard JobResponseDto (camelCase)
    // This is the "Adapter Pattern" in action.
    const transformedJob: JobResponseDto = {
      id: promptResponse.Id,
      title: promptResponse.Title,
      description: promptResponse.Description,
      // Convert the string type (e.g., "Remote") to its numeric equivalent (e.g., 0)
      type: JobTypeMap[promptResponse.Type],
      salary: promptResponse.Salary,
      duration: promptResponse.Duration,
      city: promptResponse.City,
      deliverables: promptResponse.Deliverables,
      deadline: promptResponse.Deadline,
      postedAt: promptResponse.PostedAt,
    };

    // Return the consistent, transformed object to the rest of the app
    return transformedJob;

  } catch (error: any) {
    console.error('Creating job from prompt failed:', error.response?.data || error.message);
    throw error;
  }
}

export async function createJob(req: JobCreateRequest): Promise<JobResponseDto> {
  try {
    const res = await api.post('/jobs', req);
    return res.data;
  } catch (error: any) {
    console.error('Creating job failed:', error.response?.data || error.message);
    throw error;
  }
}

export async function editUser(id: number, data: UserEditRequest): Promise<IUser> {
  try {
    const response = await api.put(`/users/${id}`, data);
    return response.data; // Assuming the API returns the updated user object
  } catch (error: any) {
    console.error(`Editing user ${id} failed:`, error.response?.data || error.message);
    throw error;
  }
}

export async function getAllJobs(): Promise<JobResponseDto[]> {
  try {
    const res = await api.get('/jobs');
    return res.data;
  } catch (error: any) {
    console.error('Fetching all jobs failed:', error.response?.data || error.message);
    throw error;
  }
}

export async function getJobById(id: number): Promise<JobResponseDto> {
  try {
    const res = await api.get(`/jobs/${id}`);
    return res.data;
  } catch (error: any) {
    console.error(`Fetching job ${id} failed:`, error.response?.data || error.message);
    throw error;
  }
}


export async function deleteJob(id: number): Promise<void> {
  try {
    await api.delete(`/jobs/${id}`);
  } catch (error: any) {
    console.error(`Deleting job ${id} failed:`, error.response?.data || error.message);
    throw error;
  }
}