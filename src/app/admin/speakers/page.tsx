'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, Linkedin, X } from 'lucide-react';

interface Speaker {
  id: string;
  name: string;
  title: string;
  company: string;
  bio: string;
  image: string;
  linkedin: string;
}

export default function SpeakersManager() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [editingSpeaker, setEditingSpeaker] = useState<Speaker | null>(null);

  useEffect(() => {
    fetchSpeakers();
  }, []);

  const fetchSpeakers = async () => {
    try {
      const res = await fetch('/api/admin/config');
      const data = await res.json();
      setSpeakers(data.speakers || []);
    } catch (error) {
      console.error('Error fetching speakers:', error);
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
        body: JSON.stringify({ section: 'speakers', data: speakers })
      });
      
      if (res.ok) {
        alert('Speakers saved successfully!');
      } else {
        alert('Failed to save speakers');
      }
    } catch (error) {
      console.error('Error saving speakers:', error);
      alert('Failed to save speakers');
    } finally {
      setSaving(false);
    }
  };

  const addSpeaker = () => {
    const newSpeaker: Speaker = {
      id: Date.now().toString(),
      name: 'New Speaker',
      title: 'TBA',
      company: '',
      bio: '',
      image: '/speakers/placeholder.jpg',
      linkedin: ''
    };
    setSpeakers([...speakers, newSpeaker]);
    setEditingSpeaker(newSpeaker);
  };

  const updateSpeaker = (speakerId: string, updates: Partial<Speaker>) => {
    setSpeakers(prev => prev.map(speaker =>
      speaker.id === speakerId ? { ...speaker, ...updates } : speaker
    ));
  };

  const deleteSpeaker = (speakerId: string) => {
    if (confirm('Are you sure you want to delete this speaker?')) {
      setSpeakers(prev => prev.filter(s => s.id !== speakerId));
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Speakers Manager</h1>
            <p className="text-slate-600 dark:text-slate-400">
              Manage summit speakers and their profiles
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={addSpeaker}
              className="flex items-center px-4 py-2 bg-[#d4af37] hover:bg-[#b8960b] text-slate-900 font-bold rounded-lg transition-colors"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Speaker
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center px-6 py-2 bg-[#d4af37] hover:bg-[#b8960b] text-slate-900 font-bold rounded-lg transition-colors disabled:opacity-50"
            >
              <Save className="mr-2 h-4 w-4" />
              {saving ? 'Saving...' : 'Save All'}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {speakers.map((speaker) => (
          <div
            key={speaker.id}
            className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden border border-slate-200 dark:border-slate-700"
          >
            <div className="h-48 bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
              <span className="text-slate-400">Image Placeholder</span>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                {speaker.name}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                {speaker.title}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-500 mb-3">
                {speaker.company}
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={() => setEditingSpeaker(speaker)}
                  className="flex-1 flex items-center justify-center px-3 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded hover:bg-slate-200 dark:hover:bg-slate-600 text-sm"
                >
                  <Edit className="mr-1 h-3 w-3" />
                  Edit
                </button>
                <button
                  onClick={() => deleteSpeaker(speaker.id)}
                  className="px-3 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 text-sm"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Speaker Modal */}
      {editingSpeaker && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
            <button 
              onClick={() => setEditingSpeaker(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Edit Speaker</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={editingSpeaker.name}
                  onChange={(e) => setEditingSpeaker({ ...editingSpeaker, name: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={editingSpeaker.title}
                    onChange={(e) => setEditingSpeaker({ ...editingSpeaker, title: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    value={editingSpeaker.company}
                    onChange={(e) => setEditingSpeaker({ ...editingSpeaker, company: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Bio
                </label>
                <textarea
                  value={editingSpeaker.bio}
                  onChange={(e) => setEditingSpeaker({ ...editingSpeaker, bio: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Image Path
                </label>
                <input
                  type="text"
                  value={editingSpeaker.image}
                  onChange={(e) => setEditingSpeaker({ ...editingSpeaker, image: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  placeholder="/speakers/name.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  LinkedIn URL
                </label>
                <input
                  type="text"
                  value={editingSpeaker.linkedin}
                  onChange={(e) => setEditingSpeaker({ ...editingSpeaker, linkedin: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  placeholder="https://linkedin.com/in/..."
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setEditingSpeaker(null)}
                className="px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  updateSpeaker(editingSpeaker.id, editingSpeaker);
                  setEditingSpeaker(null);
                }}
                className="px-6 py-2 bg-[#d4af37] hover:bg-[#b8960b] text-slate-900 font-bold rounded-lg"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
