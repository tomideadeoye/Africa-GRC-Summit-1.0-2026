"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { User, Users, Linkedin, ExternalLink, ShieldCheck, X } from "lucide-react";
import { AuroraText } from "../ui/aurora-text";

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!mounted) return null;

  const modalContent = (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/95 backdrop-blur-md" 
      onClick={onClose}
    >
      {/* Modal Box */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ 
          type: "spring", 
          damping: 25, 
          stiffness: 300,
          delay: 0.1
        }}
        className="relative w-full max-w-4xl max-h-[92vh] bg-[var(--brand-navy)] border border-white/10 rounded-xl overflow-y-auto shadow-2xl flex flex-col md:block"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Stylistic Close Button - Gilded Obsidian Style */}
        <button
          onClick={onClose}
          aria-label="Close speaker profile"
          className="absolute top-6 right-6 z-[100] p-3 bg-[var(--brand-navy)]/90 text-white hover:bg-[var(--brand-gold)] hover:text-slate-950 rounded-full transition-all duration-500 border border-[var(--brand-gold)]/20 hover:border-[var(--brand-gold)] shadow-2xl backdrop-blur-xl group"
        >
          <X size={24} className="group-hover:rotate-90 transition-transform duration-500" />
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Image Container - Fixed height on mobile to prevent content push */}
          <div className="relative h-[45vh] md:h-auto md:aspect-auto shrink-0">
            {speaker.image ? (
              <img
                src={speaker.image}
                alt={speaker.name}
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-slate-950">
                <User size={120} className="text-slate-800" />
              </div>
            )}
            {/* Visual separation for text overlay on mobile */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[var(--brand-navy)] to-transparent" />
          </div>

          {/* Right: Content */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            {/* Badge */}
            <div className="flex items-center gap-2 mb-6">
              <ShieldCheck size={16} className="text-[var(--brand-gold)]" />
              <span className="text-[10px] font-black text-[var(--brand-gold)] tracking-[0.3em]">
                Global Faculty
              </span>
            </div>

            {/* Name */}
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-4">
              {speaker.name}
            </h2>

            {/* Title & Company */}
            <div className="mb-8">
              <p className="text-lg font-black text-[var(--brand-gold)] tracking-tight mb-1">
                {speaker.title}
              </p>
              {speaker.company && speaker.company !== speaker.title && (
                <p className="text-sm font-bold text-slate-400 tracking-wider">
                  {speaker.company}
                </p>
              )}
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
      </motion.div>
    </motion.div>
  );

  return createPortal(modalContent, document.body);
}

export default function Speakers() {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [loading, setLoading] = useState(true);
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
      } finally {
        setLoading(false);
      }
    };
    fetchSpeakers();
  }, []);

  if (loading) return null;
  if (speakers.length === 0) return null;

  return (
    <section id="speakers" className="py-32 bg-[var(--brand-navy)] relative overflow-hidden">
      {/* Background Watermark */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 select-none pointer-events-none z-0 opacity-[0.03]">
         <span className="text-[15vw] font-black text-white tracking-tighter uppercase">
          FACULTY
        </span>
      </div>

      <div className="container px-6 mx-auto relative z-10">
        <div className="max-w-4xl mb-24 text-left">
           <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-[var(--brand-gold)]" />
              <span className="text-[var(--brand-gold)] font-black tracking-[0.4em] text-[10px]">
                Distinguished Leadership
              </span>
           </div>
           <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-[0.9] mb-8">
             The Architects of <br />
             <AuroraText colors={["#ffd07e", "#ffffff", "#6dacca", "#ffd07e"]}>Governance</AuroraText>
           </h2>
           <p className="text-slate-400 text-lg font-medium leading-relaxed tracking-widest max-w-2xl">
             Africa GRC Summit 1.0 features respected global and African leaders shaping governance, regulatory oversight and digital resilience.
           </p>
           <p className="text-[#d4af37] text-sm font-bold mt-4 tracking-[0.2em] italic">
             Additional executive speakers and regulatory leaders will be announced.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {speakers.map((speaker) => (
            <div
              key={speaker.id}
              onClick={() => setSelectedSpeaker(speaker)}
              className="group relative flex flex-col bg-white/[0.02] border border-white/5 hover:border-[var(--brand-gold)]/40 transition-all duration-500 rounded-sm overflow-hidden cursor-pointer"
            >
              {/* Profile Header Image Area */}
              <div className="relative aspect-[4/5] bg-black/40 overflow-hidden">
                {speaker.image ? (
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-950">
                    <User size={80} className="text-slate-800" />
                  </div>
                )}

                {/* Decorative Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-navy)] via-transparent to-transparent opacity-80" />

                {/* Badge */}
                <div className="absolute top-6 left-6">
                   <div className="bg-[var(--brand-gold)] p-2 rounded-sm shadow-xl">
                      <ShieldCheck size={16} className="text-slate-950" />
                   </div>
                </div>
              </div>

              {/* Speaker Content */}
              <div className="p-10">
                <div className="mb-8">
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2 group-hover:text-[var(--brand-gold)] transition-colors">
                    {speaker.name}
                  </h3>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-500 tracking-widest mb-1 leading-tight">
                      {speaker.title}
                    </span>
                    <span className="text-xs font-bold text-[var(--brand-gold)] tracking-tight opacity-70">
                      {speaker.company}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-8 border-t border-white/5">
                   {speaker.linkedin && (
                     <a
                       href={speaker.linkedin}
                       target="_blank"
                       rel="noopener noreferrer"
                       onClick={(e) => e.stopPropagation()}
                       className="text-slate-500 hover:text-[var(--brand-gold)] transition-colors"
                     >
                       <Linkedin size={20} />
                     </a>
                   )}
                   <button className="flex items-center gap-2 text-[10px] font-black text-[var(--brand-gold)] tracking-[0.2em] hover:gap-4 transition-all">
                      View Profile <ExternalLink size={12} />
                   </button>
                </div>
              </div>

              {/* Hover Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[var(--brand-gold)]/0 via-[var(--brand-gold)]/0 to-[var(--brand-gold)]/0 group-hover:from-[var(--brand-gold)]/5 transition-all duration-500 pointer-events-none" />
            </div>
          ))}

          {/* Call to Action Card */}
          <div className="relative flex flex-col items-center justify-center p-12 bg-white/[0.01] border-2 border-dashed border-white/5 hover:border-[var(--brand-gold)]/40 transition-all rounded-sm group text-center">
             <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-8 group-hover:bg-[var(--brand-gold)]/10 transition-colors">
                <Users size={40} className="text-slate-600 group-hover:text-[var(--brand-gold)]" />
             </div>
             <h3 className="text-2xl font-black text-white uppercase mb-4 tracking-tight">Nominate a <br />Strategic Leader</h3>
             <p className="text-[10px] text-slate-500 mb-10 font-black tracking-widest leading-relaxed">Join our global faculty of <br />governance and risk architects.</p>
             <a
                href={`mailto:info@africagrcsummit.com?subject=${encodeURIComponent("Speaker Nomination: Africa GRC Summit 1.0 (2026)")}&body=${encodeURIComponent("Dear Africa GRC Summit Team,\n\nI would like to nominate a distinguished leader for consideration as a speaker at the Africa GRC Summit 1.0 (2026).\n\nNominee Details:\nFull Name: \nJob Title: \nOrganization: \nLinkedIn Profile: \nArea of Expertise: \n\nBrief Reason for Nomination:\n\n\nNominator Details:\nYour Name: \nYour Email: \nYour Organization: \n\nThank you for considering this nomination.\n\nBest regards,\n")}`}
                className="px-10 py-4 bg-[var(--brand-gold)]/10 hover:bg-[var(--brand-gold)] border border-[var(--brand-gold)]/40 text-[var(--brand-gold)] hover:text-slate-900 font-black tracking-[0.2em] text-[10px] transition-all inline-block"
              >
                Submit Nomination
             </a>
          </div>
        </div>
      </div>

      {/* Speaker Profile Modal - Moved outside z-10 container to break stacking context */}
      <AnimatePresence>
        {selectedSpeaker && (
          <SpeakerModal
            speaker={selectedSpeaker}
            onClose={() => setSelectedSpeaker(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
