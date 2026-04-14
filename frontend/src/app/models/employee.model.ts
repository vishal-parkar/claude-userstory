export interface Employee {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  department: string;
  position: string;
  salary: number;
  hireDate: string;       // ISO date string: YYYY-MM-DD
  status: 'ACTIVE' | 'INACTIVE';
  createdAt?: string;
  updatedAt?: string;
}

export const DEPARTMENTS = [
  'Engineering',
  'Finance',
  'HR',
  'IT',
  'Legal',
  'Marketing',
  'Operations',
  'Sales',
  'Support'
] as const;

export type Department = typeof DEPARTMENTS[number];
