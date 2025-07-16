// src/types/user.ts

export type UserRole = 'user' | 'admin' | 'engineer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
