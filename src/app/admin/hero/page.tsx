'use client';

import { useState, useEffect } from 'react';
import { Save, Globe, MapPin, Calendar, Tag } from 'lucide-react';

interface HeroConfig {
  title: string;
  subtitle: string;
  dates: string;
  venue: string;
  tagline: string;
  badge: string;
  status: string;
  statusBadge: string;
}

export default function HeroSettings() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [config, setConfig] = useState<HeroConfig>({
    title: '',
    subtitle: '',
    dates: '',
    venue: '',
    tagline: '',
    badge: '',
    status: '',
    statusBadge: ''
  });

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const res = await fetch('/api/admin/config');
      const data = await res.json();
      setConfig(data.hero);
    } catch (error) {
      console.error('Error fetching config:', error);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section: 'hero', data: config })
      });
      
      if (res.ok) {
        alert('Hero settings saved successfully!');
      } else {
        alert('Failed to save settings');
      }
    } catch (error) {
      console.error('Error saving config:', error);
      alert('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field: keyof HeroConfig, value: string) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Hero Settings</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Manage the main hero section content displayed on the homepage
        </p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 space-y-6">
        {/* Title */}
        <div>
          <label className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            <Globe className="mr-2 h-4 w-4" />
            Summit Title
          </label>
          <input
            type="text"
            value={config.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
            placeholder="AFRICA GRC SUMMIT 1.0"
          />
        </div>

        {/* Subtitle */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Subtitle / Theme
          </label>
          <input
            type="text"
            value={config.subtitle}
            onChange={(e) => handleChange('subtitle', e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
            placeholder="The Future of GRC: Intelligent. Integrated. Insight-Driven"
          />
        </div>

        {/* Dates */}
        <div>
          <label className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            <Calendar className="mr-2 h-4 w-4" />
            Event Dates
          </label>
          <input
            type="text"
            value={config.dates}
            onChange={(e) => handleChange('dates', e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
            placeholder="October 21-22, 2026."
          />
        </div>

        {/* Venue */}
        <div>
          <label className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            <MapPin className="mr-2 h-4 w-4" />
            Venue Location
          </label>
          <input
            type="text"
            value={config.venue}
            onChange={(e) => handleChange('venue', e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
            placeholder="Sheraton Lagos Hotel, Lagos, Nigeria"
          />
        </div>

        {/* Tagline */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Tagline
          </label>
          <input
            type="text"
            value={config.tagline}
            onChange={(e) => handleChange('tagline', e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
            placeholder="Africa's Executive Forum for Governance and Digital Trust"
          />
        </div>

        {/* Badge */}
        <div>
          <label className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            <Tag className="mr-2 h-4 w-4" />
            Badge Text
          </label>
          <input
            type="text"
            value={config.badge}
            onChange={(e) => handleChange('badge', e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
            placeholder="By Invitation Only"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Registration Status
          </label>
          <input
            type="text"
            value={config.status}
            onChange={(e) => handleChange('status', e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
            placeholder="ENROLLMENT OPEN"
          />
        </div>

        {/* Status Badge */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Status Badge (e.g., 1st Annual)
          </label>
          <input
            type="text"
            value={config.statusBadge}
            onChange={(e) => handleChange('statusBadge', e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
            placeholder="1st Annual"
          />
        </div>

        {/* Save Button */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center px-6 py-3 bg-[#d4af37] hover:bg-[#b8960b] text-slate-900 font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="mr-2 h-5 w-5" />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
