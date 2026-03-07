"use client";

import { useState, useEffect } from "react";
import { Clock, Users, Shield, Zap, Target, Award } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "../ui/FadeIn";

interface Session {
  id?: string;
  time: string;
  title: string;
  topic?: string;
  speaker?: string;
  role?: string;
  type?: "plenary" | "break" | "keynote" | "social" | "forum" | "case-study" | "workshop";
  keyFocus?: string[];
  caseCoverage?: string[];
  description?: string;
}

interface AgendaDay {
  id: string;
  day: number | string;
  date: string;
  theme: string;
  sessions: Session[];
}

export default function Programme() {
  const [activeDayIdx, setActiveDayIdx] = useState(0);
  const [agenda, setAgenda] = useState<AgendaDay[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgenda = async () => {
      try {
        const res = await fetch('/api/admin/config');
        const data = await res.json();
        if (data.agenda) {
          setAgenda(data.agenda);
        }
      } catch (error) {
        console.error('Error fetching agenda:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAgenda();
  }, []);

  if (loading) {
    return (
      <section id="programme" className="py-24 bg-[#020617] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-gold/20 border-t-gold rounded-full animate-spin" />
          <p className="text-gold font-black uppercase tracking-widest text-sm">Loading Agenda...</p>
        </div>
      </section>
    );
  }

  if (agenda.length === 0) return null;

  const currentDay = agenda[activeDayIdx];

  return (
    <section id="programme" className="py-32 bg-slate-50 relative overflow-hidden border-t border-slate-100">
      {/* Watermark */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full select-none pointer-events-none opacity-[0.03] flex justify-center">
        <span className="text-[20vw] font-black text-slate-900 leading-none uppercase tracking-tighter">
          AGENDA
        </span>
      </div>

      <div className="container px-6 max-w-7xl mx-auto relative z-10">
        <FadeIn className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--brand-gold)]/10 border border-[var(--brand-gold)]/20 mb-6">
            <Shield className="w-4 h-4 text-[var(--brand-gold)]" />
            <span className="text-[var(--brand-gold)] text-xs font-bold tracking-[0.2em] uppercase">Executive Curriculum</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-slate-900 tracking-tight">
            Summit <span className="text-[var(--brand-gold)]">Programme</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-500 max-w-3xl mx-auto font-medium leading-relaxed">
            A high-level strategic roadmap designed for the architects of Africa&apos;s financial future.
          </p>
        </FadeIn>

        {/* Day selection tabs */}
        <StaggerContainer className="flex flex-col md:flex-row justify-center mb-16 gap-4">
          {agenda.map((day, idx) => (
            <StaggerItem key={idx} className="flex-1">
              <button
                onClick={() => setActiveDayIdx(idx)}
                className={`w-full group relative overflow-hidden px-10 py-6 transition-all duration-500 border-2 ${
                  activeDayIdx === idx
                    ? "border-[var(--brand-gold)] bg-white text-slate-900 shadow-lg"
                    : "border-slate-100 bg-transparent text-slate-400 hover:border-slate-200 hover:text-slate-600"
                }`}
              >
                <div className="relative z-10 flex flex-col items-center">
                  <span className={`text-[10px] font-black tracking-[0.3em] uppercase mb-1 ${activeDayIdx === idx ? "text-[var(--brand-gold)]" : "text-slate-300"}`}>
                    Day {day.day}
                  </span>
                  <span className="text-xl font-black tracking-tight uppercase">
                    {day.date}
                  </span>
                </div>
                {/* Active indicator bar */}
                <div 
                  className={`absolute bottom-0 left-0 h-1 bg-[var(--brand-gold)] transition-all duration-700 ${
                    activeDayIdx === idx ? "w-full" : "w-0"
                  }`} 
                />
              </button>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Current Day Theme Header */}
        <FadeIn className="mb-12 text-center" key={activeDayIdx}>
          <p className="text-[var(--brand-gold)] font-bold tracking-widest text-sm uppercase mb-2">Subject Context</p>
          <h3 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-wider">{currentDay.theme}</h3>
          <div className="w-24 h-1 bg-[var(--brand-gold)] mx-auto mt-6" />
        </FadeIn>

        {/* Agenda Content */}
        <StaggerContainer className="space-y-4">
          {currentDay.sessions.map((session, sIdx) => (
            <StaggerItem
              key={sIdx}
              className={`group flex flex-col md:flex-row transition-all duration-300 border border-slate-200 ${
                session.type === "break" 
                ? "bg-slate-100/50 border-transparent opacity-60" 
                : "bg-white hover:border-[var(--brand-gold)]/30 hover:shadow-xl"
              }`}
            >
              {/* Time Section */}
              <div className="w-full md:w-56 p-6 flex-shrink-0 border-b md:border-b-0 md:border-r border-slate-100 flex flex-col justify-center gap-2">
                <div className="flex items-center gap-2 text-slate-400">
                  <Clock size={16} />
                  <span className="text-[10px] font-black tracking-widest uppercase">Time Slot</span>
                </div>
                <div className="text-xl md:text-2xl font-black text-slate-900 tracking-tighter">
                  {session.time}
                </div>
              </div>

              {/* Content Section */}
              <div className="flex-1 p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  {session.type && (
                    <span className={`px-2 py-0.5 text-[10px] font-black uppercase tracking-widest border border-current rounded-sm ${
                      ['keynote', 'plenary'].includes(session.type) ? 'text-[var(--brand-gold)]' : 
                      session.type === 'forum' ? 'text-blue-600' :
                      ['case-study', 'workshop'].includes(session.type) ? 'text-emerald-600' :
                      'text-slate-400'
                    }`}>
                      {session.type.replace('-', ' ')}
                    </span>
                  )}
                  {session.role && (
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{session.role}</span>
                  )}
                </div>

                <h4 className={`text-xl md:text-2xl font-black mb-2 tracking-tight ${session.type === "break" ? 'text-slate-400' : 'text-slate-900'}`}>
                  {session.title}
                </h4>

                {session.topic && (
                  <div className="text-[var(--brand-gold)] font-bold text-lg md:text-xl italic mb-4 leading-relaxed line-clamp-2">
                    &quot;{session.topic}&quot;
                  </div>
                )}

                {session.speaker && (
                  <div className="flex items-center gap-3 mt-4 mb-4">
                    <div className="w-8 h-8 rounded-full bg-slate-50 border border-[var(--brand-gold)]/20 flex items-center justify-center">
                      <Users size={14} className="text-[var(--brand-gold)]" />
                    </div>
                    <div>
                      <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">Presenter</p>
                      <p className="text-slate-900 font-black text-sm uppercase">{session.speaker}</p>
                    </div>
                  </div>
                )}

                {session.description && (
                  <p className="text-slate-500 text-sm font-medium italic leading-relaxed">
                    {session.description}
                  </p>
                )}

                {/* Key Focus Points */}
                {session.keyFocus && session.keyFocus.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-slate-100">
                    <div className="flex items-center gap-2 mb-4">
                      <Target className="w-4 h-4 text-[var(--brand-gold)]" />
                      <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Core Insights Matrix</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {session.keyFocus.map((focus, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-[var(--brand-gold)] mt-1.5 flex-shrink-0" />
                          <span className="text-xs text-slate-500 leading-snug font-medium">{focus}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Case Coverage */}
                {session.caseCoverage && session.caseCoverage.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-slate-100">
                    <div className="flex items-center gap-2 mb-4">
                      <Zap className="w-4 h-4 text-emerald-600" />
                      <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Case Implementation Pillars</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {session.caseCoverage.map((item, cIdx) => (
                        <div key={cIdx} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 flex-shrink-0" />
                          <span className="text-xs text-slate-500 leading-snug font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Optional Right Decorative Accent */}
              {session.type !== "break" && (
                <div className="hidden md:flex w-2 bg-gradient-to-b from-transparent via-[var(--brand-gold)]/20 to-transparent group-hover:via-[var(--brand-gold)]/50 transition-all duration-300" />
              )}
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Final CTA in Programme */}
        <div className="mt-20 text-center">
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest italic mb-4">Curriculum and speakers subject to strategic refinement.</p>
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-slate-100 to-transparent" />
        </div>
      </div>
    </section>
  );
}
