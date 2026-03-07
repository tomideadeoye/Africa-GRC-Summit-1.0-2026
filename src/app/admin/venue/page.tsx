'use client';

import { useState, useEffect } from 'react';
import { Save, MapPin } from 'lucide-react';

interface Venue {
  name: string;
  address: string;
  mapEmbedUrl: string;
  backgroundImage: string;
}

export default function VenueManager() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [venue, setVenue] = useState<Venue>({
    name: '',
    address: '',
    mapEmbedUrl: '',
    backgroundImage: ''
  });

  useEffect(() => {
    fetchVenue();
  }, []);

  const fetchVenue = async () => {
    try {
      const res = await fetch('/api/admin/config');
      const data = await res.json();
      setVenue(data.venue || {});
    } catch (error) {
      console.error('Error fetching venue:', error);
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
        body: JSON.stringify({ section: 'venue', data: venue })
      });
      
      if (res.ok) {
        alert('Venue saved successfully!');
      } else {
        alert('Failed to save venue');
      }
    } catch (error) {
      console.error('Error saving venue:', error);
      alert('Failed to save venue');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field: keyof Venue, value: string) => {
    setVenue(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Venue Settings</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Manage event venue information and map
        </p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 space-y-6">
        {/* Venue Name */}
        <div>
          <label className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            <MapPin className="mr-2 h-4 w-4" />
            Venue Name
          </label>
          <input
            type="text"
            value={venue.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#d4af37]"
            placeholder="Sheraton Lagos Hotel"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Full Address
          </label>
          <input
            type="text"
            value={venue.address}
            onChange={(e) => handleChange('address', e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#d4af37]"
            placeholder="Victoria Island, Lagos, Nigeria"
          />
        </div>

        {/* Map Embed URL */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Google Maps Embed URL
          </label>
          <input
            type="text"
            value={venue.mapEmbedUrl}
            onChange={(e) => handleChange('mapEmbedUrl', e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#d4af37]"
            placeholder="https://maps.google.com/maps?q=..."
          />
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Get this from Google Maps: Share → Embed a map
          </p>
        </div>

        {/* Background Image */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Venue Background Image URL
          </label>
          <input
            type="text"
            value={venue.backgroundImage}
            onChange={(e) => handleChange('backgroundImage', e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#d4af37]"
            placeholder="https://..."
          />
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
