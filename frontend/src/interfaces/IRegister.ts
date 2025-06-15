// src/interfaces/IRegister.ts

// This interface defines the structure for the registration request payload.
export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// This interface defines the structure for the registration response.
// Note: I'm including all fields as per your backend example, not just 'id, firstName, lastName, email, role'.
export interface RegisterResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: number;
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
  lockoutEnd: string | null;
  lockoutEnabled: boolean;
  accessFailedCount: number;
}