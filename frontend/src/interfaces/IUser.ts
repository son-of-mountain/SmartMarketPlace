// src/interfaces/IUser.ts
// Based on your provided backend User response
export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: number; // Assuming 0 is admin, others are regular users
  userName: string | null;
  normalizedUserName: string | null;
  normalizedEmail: string | null;
  emailConfirmed: boolean;
  passwordHash: string | null;
  securityStamp: string | null;
  concurrencyStamp: string | null;
  phoneNumber: string | null;
  phoneNumberConfirmed: boolean;
  twoFactorEnabled: boolean;
  lockoutEnd: string | null; // Date string
  lockoutEnabled: boolean;
  accessFailedCount: number;
  password?: string; // Optional for request, not usually returned in response
}