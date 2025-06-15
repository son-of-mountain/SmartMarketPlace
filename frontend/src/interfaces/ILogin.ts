// src/interfaces/ILogin.ts
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: {
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
  };
  token: string;
  errorMessage: string;
}