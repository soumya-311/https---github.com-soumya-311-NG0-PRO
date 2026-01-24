
import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { 
  Users, Heart, Calendar, MessageSquare, LogOut, 
  Check, X, Activity, LayoutDashboard, Plus, Trash2, 
  Settings, Search, Filter, Shield
} from 'lucide-react';
import { VolunteerStatus, Role, Donation, Volunteer, Event, AuditLog } from '../types';

const AdminDashboard: React.FC = () => {
  const [user, setUser] = useState(api.getCurrentUser());
  const [activeTab, setActiveTab] = useState<'overview' | 'volunteers' | 'donations' | 'events' | 'audit'>('overview');
  const [data, setData] = useState({
    volunteers: api.getVolunteers(),
    donations: api.getDonations(),
    events: api.getEvents(),
    auditLogs: api.getAuditLogs()
  });

  useEffect(() => {
    if (!user) {
      window.location.hash = '/admin-login';
    }
  }, [user]);

  const handleLogout = () => {
    api.logout();
    window.location.hash = '/admin-login';
  };

  const refreshData = () => {
    setData({
      volunteers: api.getVolunteers(),
      donations: api.getDonations(),
      events: api.getEvents(),
      auditLogs: api.getAuditLogs()
    });
  };

  const updateVolunteer = (id: string, status: VolunteerStatus) => {
    api.updateVolunteerStatus(id, status);
    refreshData();
  };

  const markDonationUtilized = (id: string) => {
    const purpose = prompt('Enter utilization purpose (e.g., Rural Education tablets):');
    if (purpose) {
      api.updateDonationUtilization(id, purpose);
      refreshData();
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-gray-400 flex flex-col fixed h-full z-30">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-emerald-500 p-2 rounded-lg">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <span className="text-white font-bold text-xl">Admin Panel</span>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1">
          {[
            { id: 'overview', label: 'Overview', icon: LayoutDashboard },
            { id: 'volunteers', label: 'Volunteers', icon: Users },
            { id: 'donations', label: 'Donations', icon: Heart },
            { id: 'events', label: 'Events', icon: Calendar },
            { id: 'audit', label: 'Audit Logs', icon: Activity },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id 
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' 
                  : 'hover:bg-gray-800 hover:text-white'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <div className="bg-gray-800 rounded-2xl p-4 mb-4">
            <p className="text-xs font-bold text-gray-500 uppercase mb-2">Connected as</p>
            <p className="text-white font-bold truncate">{user.name}</p>
            <p className="text-xs text-emerald-500 font-medium capitalize">{user.role}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 text-rose-400 hover:text-rose-300 transition-colors py-2 font-bold"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 capitalize">{activeTab}</h2>
            <p className="text-gray-500">System management and reporting</p>
          </div>
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none w-64"
              />
            </div>
            <button className="bg-white border border-gray-200 p-2 rounded-xl text-gray-600 hover:bg-gray-50">
              <Filter className="h-5 w-5" />
            </button>
          </div>
        </header>

        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: 'Total Funds', value: '$' + data.donations.reduce((sum, d) => sum + d.amount, 0).toLocaleString(), icon: Heart, color: 'text-rose-600', bg: 'bg-rose-50' },
                { label: 'Applications', value: data.volunteers.length.toString(), icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
                { label: 'Pending Apps', value: data.volunteers.filter(v => v.status === VolunteerStatus.PENDING).length.toString(), icon: Activity, color: 'text-amber-600', bg: 'bg-amber-50' },
                { label: 'Audit Events', value: data.auditLogs.length.toString(), icon: Shield, color: 'text-emerald-600', bg: 'bg-emerald-50' }
              ].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-5">
                  <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-400 uppercase">{stat.label}</div>
                    <div className="text-2xl font-black text-gray-900">{stat.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <h4 className="text-xl font-bold mb-6">Recent Donations</h4>
                <div className="space-y-4">
                  {data.donations.slice(0, 5).map((d) => (
                    <div key={d.id} className="flex justify-between items-center border-b border-gray-50 pb-4">
                      <div className="flex gap-3 items-center">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-500">
                          {d.donorName[0]}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">{d.donorName}</div>
                          <div className="text-xs text-gray-500">{new Date(d.date).toLocaleDateString()}</div>
                        </div>
                      </div>
                      <div className="font-black text-emerald-600">${d.amount}</div>
                    </div>
                  ))}
                  {data.donations.length === 0 && <p className="text-gray-400 text-center py-4">No donations yet.</p>}
                </div>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <h4 className="text-xl font-bold mb-6">Pending Volunteers</h4>
                <div className="space-y-4">
                  {data.volunteers.filter(v => v.status === VolunteerStatus.PENDING).slice(0, 5).map((v) => (
                    <div key={v.id} className="flex justify-between items-center border-b border-gray-50 pb-4">
                      <div>
                        <div className="font-bold text-gray-900">{v.name}</div>
                        <div className="text-xs text-gray-500">{v.skills}</div>
                      </div>
                      <button 
                        onClick={() => updateVolunteer(v.id, VolunteerStatus.APPROVED)}
                        className="p-2 bg-emerald-100 text-emerald-600 rounded-lg hover:bg-emerald-600 hover:text-white transition-colors"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  {data.volunteers.filter(v => v.status === VolunteerStatus.PENDING).length === 0 && (
                    <p className="text-gray-400 text-center py-4">No pending applications.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'donations' && (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Donor</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Amount</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Date</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {data.donations.map((donation) => (
                  <tr key={donation.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900">{donation.donorName}</div>
                      <div className="text-xs text-gray-500">{donation.donorEmail}</div>
                    </td>
                    <td className="px-6 py-4 font-black text-emerald-600">${donation.amount}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{new Date(donation.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      {donation.isUtilized ? (
                        <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold">Utilized</span>
                      ) : (
                        <span className="px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-xs font-bold">Available</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {!donation.isUtilized && (
                        <button 
                          onClick={() => markDonationUtilized(donation.id)}
                          className="text-xs font-bold text-emerald-600 hover:text-emerald-700 underline"
                        >
                          Allocate Funds
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'volunteers' && (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Volunteer</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Skills</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {data.volunteers.map((v) => (
                  <tr key={v.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900">{v.name}</div>
                      <div className="text-xs text-gray-500">{v.email}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{v.skills}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                        v.status === VolunteerStatus.APPROVED ? 'bg-emerald-50 text-emerald-600' :
                        v.status === VolunteerStatus.REJECTED ? 'bg-rose-50 text-rose-600' :
                        'bg-amber-50 text-amber-600'
                      }`}>
                        {v.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      {v.status === VolunteerStatus.PENDING && (
                        <>
                          <button 
                            onClick={() => updateVolunteer(v.id, VolunteerStatus.APPROVED)}
                            className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-600 hover:text-white transition-all"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => updateVolunteer(v.id, VolunteerStatus.REJECTED)}
                            className="p-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-600 hover:text-white transition-all"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'audit' && (
          <div className="space-y-4">
            {data.auditLogs.map((log) => (
              <div key={log.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
                <div className="bg-gray-100 text-gray-600 p-3 rounded-xl flex-shrink-0">
                  <Activity className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="font-bold text-gray-900">{log.action}</span>
                    <span className="text-xs text-gray-400">{new Date(log.timestamp).toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{log.details}</p>
                  <div className="text-xs font-bold text-emerald-600 uppercase">By {log.adminName}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'events' && (
          <div className="space-y-6">
            <div className="flex justify-end">
              <button 
                onClick={() => {
                  const title = prompt('Event Title:');
                  if (title) api.addEvent({ title, date: new Date().toISOString(), location: 'Virtual', description: 'New event created via dashboard' });
                  refreshData();
                }}
                className="bg-gray-900 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-600 transition-all"
              >
                <Plus className="h-5 w-5" /> New Event
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.events.map((event) => (
                <div key={event.id} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm relative group">
                  <button 
                    onClick={() => { api.deleteEvent(event.id); refreshData(); }}
                    className="absolute top-4 right-4 text-gray-400 hover:text-rose-600 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                  <div className="bg-blue-50 text-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">{event.title}</h4>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <Check className="h-4 w-4" /> {new Date(event.date).toLocaleDateString()}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{event.description}</p>
                </div>
              ))}
              {data.events.length === 0 && <p className="text-gray-400 text-center col-span-2 py-12">No upcoming events scheduled.</p>}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
