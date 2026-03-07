'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, Users } from 'lucide-react';

interface Session {
  id: string;
  time: string;
  title: string;
  topic?: string;
  type: 'keynote' | 'panel' | 'break' | 'workshop' | 'plenary' | 'forum' | 'social';
  speaker?: string | null;
  role?: string;
  description?: string;
  keyFocus?: string[];
  caseCoverage?: string[];
}

interface AgendaDay {
  id: string;
  day: number;
  date: string;
  theme: string;
  sessions: Session[];
}

export default function AgendaManager() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [agenda, setAgenda] = useState<AgendaDay[]>([]);
  const [editingSession, setEditingSession] = useState<Session | null>(null);
  const [selectedDayId, setSelectedDayId] = useState<string>('1');

  useEffect(() => {
    fetchAgenda();
  }, []);

  const fetchAgenda = async () => {
    try {
      const res = await fetch('/api/admin/config');
      const data = await res.json();
      setAgenda(data.agenda || []);
      if (data.agenda?.length > 0) {
        setSelectedDayId(data.agenda[0].id);
      }
    } catch (error) {
      console.error('Error fetching agenda:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section: 'agenda', data: agenda })
      });
      
      if (res.ok) {
        alert('Agenda saved successfully!');
      } else {
        alert('Failed to save agenda');
      }
    } catch (error) {
      console.error('Error saving agenda:', error);
      alert('Failed to save agenda');
    } finally {
      setSaving(false);
    }
  };

  const addSession = () => {
    const newSession: Session = {
      id: Date.now().toString(),
      time: '09:00 AM - 10:00 AM',
      title: 'New Session',
      type: 'plenary',
      description: ''
    };
    
    setAgenda(prev => prev.map(day => 
      day.id === selectedDayId
        ? { ...day, sessions: [...day.sessions, newSession] }
        : day
    ));
    setEditingSession(newSession);
  };

  const updateSession = (sessionId: string, updates: Partial<Session>) => {
    setAgenda(prev => prev.map(day => ({
      ...day,
      sessions: day.sessions.map(session =>
        session.id === sessionId ? { ...session, ...updates } : session
      )
    })));
  };

  const deleteSession = (sessionId: string) => {
    if (confirm('Are you sure you want to delete this session?')) {
      setAgenda(prev => prev.map(day => ({
        ...day,
        sessions: day.sessions.filter(session => session.id !== sessionId)
      })));
    }
  };

  const addDay = () => {
    const newDay: AgendaDay = {
      id: (agenda.length + 1).toString(),
      day: agenda.length + 1,
      date: 'New Date',
      theme: 'New Theme',
      sessions: []
    };
    setAgenda([...agenda, newDay]);
  };

  const updateDayDetails = (dayId: string, updates: Partial<AgendaDay>) => {
     setAgenda(prev => prev.map(day => 
       day.id === dayId ? { ...day, ...updates } : day
     ));
  };

  if (loading) {
    return <div className="flex items-center justify-center p-20 text-[#d4af37] font-bold">Loading Agenda...</div>;
  }

  const currentDay = agenda.find(d => d.id === selectedDayId);

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <div className="mb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-white mb-2 tracking-tight uppercase">Agenda Manager</h1>
            <p className="text-slate-400 font-medium">
              Manage the agenda for Africa GRC Summit 1.0
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={addDay}
              className="flex items-center px-4 py-2 bg-slate-800 text-white rounded-lg border border-white/10 hover:bg-slate-700 transition-colors"
            >
              <Plus className="mr-2 h-4 w-4 text-[#d4af37]" />
              Add Day
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center px-8 py-2 bg-[#d4af37] hover:bg-[#b8960b] text-slate-900 font-black rounded-lg transition-colors disabled:opacity-50 uppercase tracking-widest text-sm"
            >
              <Save className="mr-2 h-4 w-4" />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>

      {/* Day Tabs & Metadata */}
      <div className="mb-10 lg:flex lg:gap-12 items-start">
        <div className="flex flex-row lg:flex-col gap-2 mb-8 lg:mb-0 overflow-x-auto pb-4 lg:pb-0 shrink-0">
          {agenda.map((day) => (
            <button
              key={day.id}
              onClick={() => setSelectedDayId(day.id)}
              className={`px-6 py-4 rounded-sm font-bold transition-all text-left whitespace-nowrap lg:min-w-[180px] border ${
                selectedDayId === day.id
                  ? 'bg-[#d4af37] text-slate-900 border-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.2)]'
                  : 'bg-slate-900/50 text-slate-400 border-white/5 hover:border-white/20'
              }`}
            >
              <span className="block text-[10px] uppercase tracking-widest opacity-70 mb-1">Iteration</span>
              Day {day.day}
            </button>
          ))}
        </div>

        {currentDay && (
          <div className="flex-1 bg-slate-900/40 p-8 border border-white/5 rounded-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <label className="block text-[10px] uppercase tracking-[3px] text-[#d4af37] font-bold mb-3">Summit Theme (Day {currentDay.day})</label>
                <input
                  type="text"
                  value={currentDay.theme}
                  onChange={(e) => updateDayDetails(currentDay.id, { theme: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 p-3 text-white font-bold text-lg focus:border-[#d4af37] outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[3px] text-[#64748b] font-bold mb-3">Scheduled Date</label>
                <input
                  type="text"
                  value={currentDay.date}
                  onChange={(e) => updateDayDetails(currentDay.id, { date: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 p-3 text-white font-medium focus:border-[#d4af37] outline-none"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between border-t border-white/5 pt-8 mt-8">
              <h2 className="text-xl font-black text-white uppercase tracking-tight">Curriculum Structure</h2>
              <button
                onClick={addSession}
                className="flex items-center px-4 py-2 bg-white/5 hover:bg-white/10 text-white font-bold rounded-sm border border-white/10 transition-all text-xs uppercase"
              >
                <Plus className="mr-2 h-3 w-3 text-[#d4af37]" />
                Add Session
              </button>
            </div>
            
            <div className="space-y-4 mt-8">
              {currentDay.sessions.map((session) => (
                <div
                  key={session.id}
                  className="group bg-black/20 border border-white/5 p-6 hover:border-[#d4af37]/30 transition-all relative"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-4">
                       <span className="text-[#d4af37] font-black tracking-tighter text-sm">{session.time}</span>
                       <span className={`px-3 py-0.5 text-[9px] font-black uppercase tracking-widest rounded-sm ${
                         session.type === 'keynote' ? 'bg-purple-900/60 text-purple-200' :
                         session.type === 'forum' ? 'bg-blue-900/60 text-blue-200' :
                         session.type === 'workshop' ? 'bg-amber-900/60 text-amber-200' :
                         'bg-slate-800 text-slate-300'
                       }`}>
                         {session.type}
                       </span>
                    </div>
                    <div className="flex items-center gap-2">
                       <button onClick={() => setEditingSession(session)} className="p-2 bg-white/5 hover:bg-[#d4af37]/20 rounded-sm text-slate-400 hover:text-[#d4af37] transition-all">
                         <Edit className="h-4 w-4" />
                       </button>
                       <button onClick={() => deleteSession(session.id)} className="p-2 bg-white/5 hover:bg-red-500/20 rounded-sm text-slate-400 hover:text-red-500 transition-all">
                         <Trash2 className="h-4 w-4" />
                       </button>
                    </div>
                  </div>
                  <h3 className="text-lg font-black text-white uppercase mb-2">{session.title}</h3>
                  {session.topic && <p className="text-sm text-slate-400 italic mb-3">"{session.topic}"</p>}
                  {session.speaker && (
                    <div className="flex items-center gap-2">
                       <Users size={14} className="text-[#64748b]" />
                       <span className="text-sm font-bold text-white uppercase">{session.speaker}</span>
                       {session.role && <span className="text-xs text-slate-500">— {session.role}</span>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Specialized Session Modal */}
      {editingSession && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-[#020617] border border-white/10 p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <h2 className="text-2xl font-black text-white uppercase mb-8 border-b border-white/5 pb-4">Edit Session</h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#64748b] font-bold mb-2">Headline</label>
                  <input
                    type="text"
                    value={editingSession.title}
                    onChange={(e) => setEditingSession({ ...editingSession, title: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 p-3 text-white font-bold focus:border-[#d4af37] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#64748b] font-bold mb-2">Timing</label>
                  <input
                    type="text"
                    value={editingSession.time}
                    onChange={(e) => setEditingSession({ ...editingSession, time: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 p-3 text-white font-mono focus:border-[#d4af37] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#64748b] font-bold mb-2">Strategic Topic / Title Addition</label>
                <input
                  type="text"
                  value={editingSession.topic || ''}
                  onChange={(e) => setEditingSession({ ...editingSession, topic: e.target.value })}
                  placeholder="e.g. Failure of Governance Simulation"
                  className="w-full bg-white/5 border border-white/10 p-3 text-white focus:border-[#d4af37] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#64748b] font-bold mb-2">Session Type</label>
                  <select
                    value={editingSession.type}
                    onChange={(e) => setEditingSession({ ...editingSession, type: e.target.value as any })}
                    className="w-full bg-white/5 border border-white/10 p-3 text-white focus:border-[#d4af37] outline-none"
                  >
                    <option value="plenary">Plenary (General)</option>
                    <option value="keynote">Global Keynote</option>
                    <option value="forum">Executive Forum</option>
                    <option value="workshop">Strategy Workshop</option>
                    <option value="break">Networking Break / Meal</option>
                    <option value="social">Social / Evening Event</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#64748b] font-bold mb-2">Lead Speaker</label>
                  <input
                    type="text"
                    value={editingSession.speaker || ''}
                    onChange={(e) => setEditingSession({ ...editingSession, speaker: e.target.value || null })}
                    className="w-full bg-white/5 border border-white/10 p-3 text-white focus:border-[#d4af37] outline-none"
                  />
                </div>
              </div>

               <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#64748b] font-bold mb-2">Speaker Designation / Role</label>
                <input
                  type="text"
                  value={editingSession.role || ''}
                  onChange={(e) => setEditingSession({ ...editingSession, role: e.target.value })}
                  placeholder="e.g. MD/CEO FirstBank"
                  className="w-full bg-white/5 border border-white/10 p-3 text-white focus:border-[#d4af37] outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#64748b] font-bold mb-2">Focus Points (One per line)</label>
                <textarea
                  value={editingSession.keyFocus?.join('\n') || ''}
                  onChange={(e) => setEditingSession({ ...editingSession, keyFocus: e.target.value.split('\n').filter(l => l.trim() !== '') })}
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 p-3 text-white text-sm focus:border-[#d4af37] outline-none"
                  placeholder="Enter strategic focus points..."
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#64748b] font-bold mb-2">Case Study Coverage (One per line)</label>
                <textarea
                  value={editingSession.caseCoverage?.join('\n') || ''}
                  onChange={(e) => setEditingSession({ ...editingSession, caseCoverage: e.target.value.split('\n').filter(l => l.trim() !== '') })}
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 p-3 text-white text-sm focus:border-[#d4af37] outline-none"
                  placeholder="If workshop, enter case areas..."
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-12 pt-8 border-t border-white/5">
              <button
                onClick={() => setEditingSession(null)}
                className="px-6 py-2 text-slate-400 hover:text-white uppercase font-bold text-xs tracking-widest"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  updateSession(editingSession.id, editingSession);
                  setEditingSession(null);
                }}
                className="px-10 py-3 bg-[#d4af37] hover:bg-[#b8960b] text-slate-900 font-black rounded-sm uppercase tracking-widest text-xs"
              >
                Save Session
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
