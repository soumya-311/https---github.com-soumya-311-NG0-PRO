
import { ProgramStatus, Program, VolunteerStatus, Role } from './types';

export const NGO_INFO = {
  name: "NGO Pro",
  mission: "Empowering underserved communities through sustainable education and healthcare initiatives.",
  vision: "A world where every individual has the opportunity to thrive regardless of their background.",
  story: "Founded in 2010, NGO Pro started with a single classroom and a vision to change lives...",
  impactStats: {
    livesImpacted: 15400,
    fundsRaised: 1200000,
    volunteersActive: 450,
    programsCompleted: 32
  }
};

export const MOCK_PROGRAMS: Program[] = [
  {
    id: '1',
    title: 'Rural Education Initiative',
    description: 'Providing tablets and solar-powered learning centers to remote villages.',
    image: 'https://picsum.photos/seed/edu/800/600',
    status: ProgramStatus.ACTIVE
  },
  {
    id: '2',
    title: 'Clean Water Project',
    description: 'Installation of 50 deep-bore wells in drought-prone regions.',
    image: 'https://picsum.photos/seed/water/800/600',
    status: ProgramStatus.COMPLETED
  },
  {
    id: '3',
    title: 'Mobile Health Clinics',
    description: 'Bringing primary healthcare to urban slums via custom-fitted vans.',
    image: 'https://picsum.photos/seed/health/800/600',
    status: ProgramStatus.ACTIVE
  }
];

export const MOCK_ADMINS = [
  { id: '1', name: 'John Doe', email: 'admin@ngo.org', password: 'password123', role: Role.SUPERADMIN },
  { id: '2', name: 'Jane Staff', email: 'staff@ngo.org', password: 'password123', role: Role.STAFF }
];
