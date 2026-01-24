
import { 
  Donation, Volunteer, Event, AuditLog, ContactMessage, 
  Announcement, VolunteerStatus, User, Role 
} from '../types';
import { MOCK_PROGRAMS, MOCK_ADMINS } from '../constants';

// Simulated DB in Local Storage
const STORAGE_KEYS = {
  DONATIONS: 'ngo_donations',
  VOLUNTEERS: 'ngo_volunteers',
  EVENTS: 'ngo_events',
  MESSAGES: 'ngo_messages',
  ANNOUNCEMENTS: 'ngo_announcements',
  AUDIT_LOGS: 'ngo_audit_logs',
  AUTH_TOKEN: 'ngo_auth_token',
  USER: 'ngo_user'
};

const getStorage = <T,>(key: string, initial: T): T => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : initial;
};

const setStorage = <T,>(key: string, data: T) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const api = {
  // --- AUTH ---
  login: async (email: string, pass: string): Promise<{user: User, token: string} | null> => {
    const admin = MOCK_ADMINS.find(a => a.email === email && a.password === pass);
    if (!admin) return null;
    
    const token = 'mock_jwt_token_' + Math.random().toString(36).substr(2);
    const user: User = { id: admin.id, name: admin.name, email: admin.email, role: admin.role };
    
    setStorage(STORAGE_KEYS.AUTH_TOKEN, token);
    setStorage(STORAGE_KEYS.USER, user);
    
    api.addAuditLog(user.name, 'LOGIN', 'Admin logged into dashboard');
    
    return { user, token };
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
  },

  getCurrentUser: (): User | null => getStorage(STORAGE_KEYS.USER, null),

  // --- DONATIONS ---
  getDonations: (): Donation[] => getStorage(STORAGE_KEYS.DONATIONS, []),
  
  addDonation: (donation: Omit<Donation, 'id' | 'date' | 'isUtilized'>): Donation => {
    const donations = api.getDonations();
    const newDonation: Donation = {
      ...donation,
      id: 'REC-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      date: new Date().toISOString(),
      isUtilized: false
    };
    setStorage(STORAGE_KEYS.DONATIONS, [newDonation, ...donations]);
    return newDonation;
  },

  updateDonationUtilization: (id: string, purpose: string) => {
    const donations = api.getDonations();
    const updated = donations.map(d => d.id === id ? { ...d, isUtilized: true, utilizedPurpose: purpose } : d);
    setStorage(STORAGE_KEYS.DONATIONS, updated);
    const user = api.getCurrentUser();
    api.addAuditLog(user?.name || 'System', 'UPDATE_DONATION', `Marked donation ${id} as utilized for ${purpose}`);
  },

  // --- VOLUNTEERS ---
  getVolunteers: (): Volunteer[] => getStorage(STORAGE_KEYS.VOLUNTEERS, []),
  
  applyVolunteer: (application: Omit<Volunteer, 'id' | 'status' | 'createdAt'>) => {
    const volunteers = api.getVolunteers();
    const newVolunteer: Volunteer = {
      ...application,
      id: Date.now().toString(),
      status: VolunteerStatus.PENDING,
      createdAt: new Date().toISOString()
    };
    setStorage(STORAGE_KEYS.VOLUNTEERS, [newVolunteer, ...volunteers]);
  },

  updateVolunteerStatus: (id: string, status: VolunteerStatus) => {
    const volunteers = api.getVolunteers();
    const updated = volunteers.map(v => v.id === id ? { ...v, status } : v);
    setStorage(STORAGE_KEYS.VOLUNTEERS, updated);
    const user = api.getCurrentUser();
    api.addAuditLog(user?.name || 'System', 'UPDATE_VOLUNTEER', `Updated volunteer status for ID ${id} to ${status}`);
  },

  // --- EVENTS ---
  getEvents: (): Event[] => getStorage(STORAGE_KEYS.EVENTS, []),
  
  addEvent: (event: Omit<Event, 'id'>) => {
    const events = api.getEvents();
    const newEvent = { ...event, id: Date.now().toString() };
    setStorage(STORAGE_KEYS.EVENTS, [newEvent, ...events]);
    const user = api.getCurrentUser();
    api.addAuditLog(user?.name || 'System', 'CREATE_EVENT', `Created event: ${event.title}`);
  },

  deleteEvent: (id: string) => {
    const events = api.getEvents();
    setStorage(STORAGE_KEYS.EVENTS, events.filter(e => e.id !== id));
    const user = api.getCurrentUser();
    api.addAuditLog(user?.name || 'System', 'DELETE_EVENT', `Deleted event ID: ${id}`);
  },

  // --- ANNOUNCEMENTS ---
  getAnnouncements: (): Announcement[] => getStorage(STORAGE_KEYS.ANNOUNCEMENTS, []),
  
  addAnnouncement: (content: string) => {
    const announcements = api.getAnnouncements();
    const newAnnouncement: Announcement = {
      id: Date.now().toString(),
      content,
      isActive: true,
      createdAt: new Date().toISOString()
    };
    setStorage(STORAGE_KEYS.ANNOUNCEMENTS, [newAnnouncement, ...announcements]);
  },

  // --- AUDIT LOGS ---
  getAuditLogs: (): AuditLog[] => getStorage(STORAGE_KEYS.AUDIT_LOGS, []),
  
  addAuditLog: (adminName: string, action: string, details: string) => {
    const logs = api.getAuditLogs();
    const newLog: AuditLog = {
      id: Date.now().toString(),
      adminName,
      action,
      details,
      timestamp: new Date().toISOString()
    };
    setStorage(STORAGE_KEYS.AUDIT_LOGS, [newLog, ...logs]);
  },

  // --- CONTACT ---
  sendMessage: (msg: Omit<ContactMessage, 'id' | 'date'>) => {
    const messages = getStorage<ContactMessage[]>(STORAGE_KEYS.MESSAGES, []);
    const newMsg = { ...msg, id: Date.now().toString(), date: new Date().toISOString() };
    setStorage(STORAGE_KEYS.MESSAGES, [newMsg, ...messages]);
  }
};
