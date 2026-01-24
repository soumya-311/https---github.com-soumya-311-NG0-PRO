
export enum Role {
  SUPERADMIN = 'superadmin',
  STAFF = 'staff'
}

export enum VolunteerStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected'
}

export enum ProgramStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface Program {
  id: string;
  title: string;
  description: string;
  image: string;
  status: ProgramStatus;
}

export interface Volunteer {
  id: string;
  name: string;
  email: string;
  phone: string;
  skills: string;
  availability: string;
  status: VolunteerStatus;
  createdAt: string;
}

export interface Donation {
  id: string;
  donorName: string;
  donorEmail: string;
  amount: number;
  message?: string;
  date: string;
  isUtilized: boolean;
  utilizedPurpose?: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
}

export interface Announcement {
  id: string;
  content: string;
  isActive: boolean;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  adminName: string;
  action: string;
  timestamp: string;
  details: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
}
