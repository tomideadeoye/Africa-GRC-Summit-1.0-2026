'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  BarChart3, 
  Users, 
  Settings, 
  Calendar, 
  Award, 
  ChevronRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    sessions: 0,
    speakers: 0,
    sponsors: 0,
    totalDays: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/admin/config');
        const data = await res.json();
        const totalSessions = data.agenda?.reduce((acc: number, day: any) => acc + day.sessions.length, 0) || 0;
        setStats({
          sessions: totalSessions,
          speakers: data.speakers?.length || 0,
          sponsors: 0, // Placeholder
          totalDays: data.agenda?.length || 0
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      }
    };
    fetchData();
  }, []);

  const statCards = [
    { name: 'Total Sessions', value: stats.sessions, icon: Calendar, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { name: 'Keynote Speakers', value: stats.speakers, icon: Users, color: 'text-[#d4af37]', bg: 'bg-[#d4af37]/10' },
    { name: 'Sponsorships', value: '1 Active', icon: Award, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { name: 'Summit Days', value: stats.totalDays, icon: BarChart3, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Executive Dashboard</h1>
        <p className="text-slate-500 font-medium">System status and strategic overview for Africa GRC Summit 1.0</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {statCards.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-sm border border-slate-200 dark:border-white/5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-sm ${stat.bg}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <TrendingUp className="h-4 w-4 text-emerald-500" />
            </div>
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{stat.name}</p>
            <p className="text-3xl font-black text-slate-900 dark:text-white mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-white">
        {/* Quick Actions */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-white/5 p-8 rounded-sm">
            <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase mb-6 flex items-center gap-2">
              <Settings className="h-5 w-5 text-[#d4af37]" />
              Strategic Configuration
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: 'Manage Agenda', desc: 'Update sessions and curriculum', href: '/admin/agenda' },
                { title: 'Main Section', desc: 'Edit title and event details', href: '/admin/hero' },
                { title: 'Speaker Gallery', desc: 'Manage bios and keynote list', href: '/admin/speakers' },
                { title: 'Venue Details', desc: 'Update location and directions', href: '/admin/venue' },
              ].map((item, i) => (
                <Link 
                  key={i} 
                  href={item.href}
                  className="group p-4 border border-slate-100 dark:border-white/5 hover:border-[#d4af37] transition-all flex items-start justify-between"
                >
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-[#d4af37] transition-colors">{item.title}</h3>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-[#d4af37] translate-x-0 group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* System Information */}
        <div className="space-y-6">
           <div className="bg-[#d4af37]/10 border border-[#d4af37]/20 p-8 rounded-sm">
             <div className="flex items-center gap-3 mb-6">
                <AlertCircle className="text-[#d4af37] h-6 w-6" />
                <h2 className="text-lg font-black text-[#d4af37] uppercase tracking-tight">System Status</h2>
             </div>
          
             <div className="space-y-3">
                <div className="flex items-center justify-between text-xs py-2 border-b border-[#d4af37]/10">
                    <span className="text-[#64748b] uppercase font-bold tracking-widest">Cache Status</span>
                    <span className="text-emerald-500 font-bold uppercase">Optimized</span>
                </div>
                <div className="flex items-center justify-between text-xs py-2 border-b border-[#d4af37]/10">
                    <span className="text-[#64748b] uppercase font-bold tracking-widest">SSL Certificate</span>
                    <span className="text-emerald-500 font-bold uppercase">Active</span>
                </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
