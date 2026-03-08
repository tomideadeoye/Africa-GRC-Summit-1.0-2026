"use client";

import { useState, useEffect } from "react";
import { X, User, ShieldCheck, Linkedin } from "lucide-react";
import { FadeIn } from "../ui/FadeIn";

interface Speaker {
  id: string;
  name: string;
  title: string;
  company: string;
  image?: string;
  linkedin?: string;
  bio?: string;
}

interface SpeakerModalProps {
  speaker: Speaker;
  onClose: () => void;
}

function SpeakerModal({ speaker, onClose }: SpeakerModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="relative w-full max-w-4xl bg-[var(--brand-navy)] border border-white/10 rounded-sm overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
        >
          <X size={24} className="text-white" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Image */}
          <div className="relative aspect-[4/5] md:aspect-auto">
            {speaker.image ? (
              <img
                src={speaker.image}
                alt={speaker.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-slate-950">
                <User size={120} className="text-slate-800" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-navy)] via-transparent to-transparent md:bg-gradient-to-r" />
          </div>

          {/* Right: Content */}
          <div className="p-12 flex flex-col justify-center">
            {/* Badge */}
            <div className="flex items-center gap-2 mb-6">
              <ShieldCheck size={16} className="text-[var(--brand-gold)]" />
              <span className="text-[10px] font-black text-[var(--brand-gold)] tracking-[0.3em]">
                Global Faculty
              </span>
            </div>

            {/* Name */}
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-4">
              {speaker.name}
            </h2>

            {/* Title & Company */}
            <div className="mb-8">
              <p className="text-lg font-black text-[var(--brand-gold)] tracking-tight mb-1">
                {speaker.title}
              </p>
              <p className="text-sm font-bold text-slate-400 tracking-wider">
                {speaker.company}
              </p>
            </div>

            {/* Bio */}
            {speaker.bio && (
              <div className="mb-8">
                <h3 className="text-[10px] font-black text-slate-500 tracking-[0.2em] mb-4">
                  Biography
                </h3>
                <p className="text-slate-300 leading-relaxed font-medium">
                  {speaker.bio}
                </p>
              </div>
            )}

            {/* Social Links */}
            <div className="flex items-center gap-6 pt-8 border-t border-white/10">
              {speaker.linkedin && (
                <a
                  href={speaker.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-slate-400 hover:text-[var(--brand-gold)] transition-colors group"
                >
                  <Linkedin size={20} />
                  <span className="text-[10px] font-black tracking-[0.2em] group-hover:text-[var(--brand-gold)]">
                    Connect on LinkedIn
                  </span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CredibilityStrip() {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const res = await fetch('/api/admin/config');
        const data = await res.json();
        if (data.speakers) {
          setSpeakers(data.speakers);
        }
      } catch (error) {
        console.error('Error fetching speakers:', error);
      }
    };
    fetchSpeakers();
  }, []);

  // Find Anifat and Michael from speakers data
  const anifat = speakers.find(s => s.name.toLowerCase().includes('anifat'));
  const michael = speakers.find(s => s.name.toLowerCase().includes('rasmussen'));

  return (
    <section className="py-12 bg-[var(--brand-navy)] border-t border-white/5 relative overflow-hidden">
      {/* Subtle geometric element */}
      <div className="absolute top-0 left-0 w-1 h-full bg-[#d4af37]"></div>

      <FadeIn delay={0.3} className="container px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 items-center">

          {/* Convener Group */}
          <div className="flex flex-col border-l border-white/10 pl-6 md:pl-8">
            <span className="text-[10px] tracking-[40%] font-black mb-3 text-slate-500">
              Convened by
            </span>
            <h4 className="text-base font-black tracking-tight uppercase text-white">
              AAA Global Advisory & Consultancy Ltd
            </h4>
          </div>

          {/* Founder Group - Clickable to open modal */}
          <div className="flex flex-col border-l border-white/10 pl-6 md:pl-8">
            <span className="text-[10px] tracking-[40%] font-black mb-3 text-[var(--brand-gold)]">
              Founder & Summit Convener
            </span>
            <div className="flex items-center">
              <h4 
                onClick={() => anifat && setSelectedSpeaker(anifat)}
                className="text-xl font-black tracking-tight text-white cursor-pointer hover:text-[var(--brand-gold)] transition-colors"
              >
                Anifat Atanda
              </h4>
              <span className="ml-3 px-2 py-0.5 text-[8px] font-black border border-white/20 rounded-sm text-slate-500">
                FCCA, CISA, GRCP
              </span>
            </div>
          </div>

          {/* Platinum Sponsor Group */}
          <div className="flex flex-col border-l border-white/10 pl-6 md:pl-8">
            <span className="text-[10px] tracking-[40%] font-black mb-3 text-[var(--brand-gold)]">
              Platinum Sponsor
            </span>
            <h4 className="text-lg font-black tracking-tight uppercase text-white">
              FirstBank of Nigeria
            </h4>
          </div>

          {/* Keynote Group - Clickable to open modal */}
          <div className="flex flex-col border-l border-white/10 pl-6 md:pl-8">
            <span className="text-[10px] tracking-[40%] font-black mb-3 text-[var(--brand-gold)]">
              Global Keynote
            </span>
            <div className="flex flex-col">
              <h4 
                onClick={() => michael && setSelectedSpeaker(michael)}
                className="text-xl font-black tracking-tight uppercase text-white cursor-pointer hover:text-[var(--brand-gold)] transition-colors"
              >
                Michael Rasmussen
              </h4>
            </div>
          </div>

        </div>
      </FadeIn>

      {/* Speaker Profile Modal */}
      {selectedSpeaker && (
        <SpeakerModal
          speaker={selectedSpeaker}
          onClose={() => setSelectedSpeaker(null)}
        />
      )}
    </section>
  );
}
