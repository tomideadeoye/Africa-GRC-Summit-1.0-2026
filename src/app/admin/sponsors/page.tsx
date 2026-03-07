'use client';

import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';

interface Sponsors {
  platinum: {
    name: string;
    tagline: string;
    logo: string;
  };
  globalKeynote: {
    name: string;
    title: string;
  };
}

export default function SponsorsManager() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sponsors, setSponsors] = useState<Sponsors>({
    platinum: { name: '', tagline: '', logo: '' },
    globalKeynote: { name: '', title: '' }
  });

  useEffect(() => {
    fetchSponsors();
  }, []);

  const fetchSponsors = async () => {
    try {
      const res = await fetch('/api/admin/config');
      const data = await res.json();
      setSponsors(data.sponsors || { platinum: {}, globalKeynote: {} });
    } catch (error) {
      console.error('Error fetching sponsors:', error);
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
        body: JSON.stringify({ section: 'sponsors', data: sponsors })
      });
      
      if (res.ok) {
        alert('Sponsors saved successfully!');
      } else {
        alert('Failed to save sponsors');
      }
    } catch (error) {
      console.error('Error saving sponsors:', error);
      alert('Failed to save sponsors');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Sponsors & Keynote</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Manage platinum sponsor and global keynote information
        </p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 space-y-8">
        {/* Platinum Sponsor */}
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">
            Platinum Sponsor
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Company Name
              </label>
              <input
                type="text"
                value={sponsors.platinum.name}
                onChange={(e) => setSponsors({ ...sponsors, platinum: { ...sponsors.platinum, name: e.target.value } })}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#d4af37]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Tagline
              </label>
              <input
                type="text"
                value={sponsors.platinum.tagline}
                onChange={(e) => setSponsors({ ...sponsors, platinum: { ...sponsors.platinum, tagline: e.target.value } })}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#d4af37]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Logo Path
              </label>
              <input
                type="text"
                value={sponsors.platinum.logo}
                onChange={(e) => setSponsors({ ...sponsors, platinum: { ...sponsors.platinum, logo: e.target.value } })}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#d4af37]"
                placeholder="/firstbank.svg"
              />
            </div>
          </div>
        </div>

        {/* Global Keynote */}
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">
            Global Keynote Speaker
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Speaker Name
              </label>
              <input
                type="text"
                value={sponsors.globalKeynote.name}
                onChange={(e) => setSponsors({ ...sponsors, globalKeynote: { ...sponsors.globalKeynote, name: e.target.value } })}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#d4af37]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Title/Description
              </label>
              <input
                type="text"
                value={sponsors.globalKeynote.title}
                onChange={(e) => setSponsors({ ...sponsors, globalKeynote: { ...sponsors.globalKeynote, title: e.target.value } })}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#d4af37]"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center px-6 py-3 bg-[#d4af37] hover:bg-[#b8960b] text-slate-900 font-bold rounded-lg transition-colors disabled:opacity-50"
          >
            <Save className="mr-2 h-5 w-5" />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
