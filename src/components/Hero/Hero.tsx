"use client";

import { useEffect, useState } from "react";
import { MoveRight, ShieldCheck, ChevronDown, Calendar, MapPin } from "lucide-react";
import CredibilityStrip from "../CredibilityStrip/CredibilityStrip";
import { FadeIn, StaggerContainer, StaggerItem } from "../ui/FadeIn";
import { AuroraText } from "../ui/aurora-text";
import { InteractiveGridPattern } from "../ui/interactive-grid-pattern";

interface HeroData {
  title: string;
  subtitle: string;
  dates: string;
  venue: string;
  tagline: string;
  badge: string;
  status: string;
}

export default function Hero() {
  const [data, setData] = useState<HeroData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const res = await fetch('/api/admin/config');
        const config = await res.json();
        if (config.hero) {
          setData(config.hero);
        }
      } catch (error) {
        console.error("Failed to synchronize hero intelligence:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHeroData();
  }, []);

  if (loading) return (
     <section className="relative min-h-screen bg-[var(--brand-navy)] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[var(--brand-gold)]/20 border-t-[var(--brand-gold)] rounded-full animate-spin" />
     </section>
  );

  const hero = data || {
    title: "AFRICA GRC SUMMIT 1.0",
    subtitle: "The Future of GRC: Intelligent. Integrated. Insight-Driven",
    dates: "October 21-22, 2026",
    venue: "Sheraton Lagos Hotel, Lagos, Nigeria",
    tagline: "Africa's Executive Forum for Governance and Digital Trust",
    badge: "By Invitation Only",
    status: "ENROLLMENT OPEN"
  };

  return (
    <section className="relative min-h-screen flex flex-col bg-[var(--brand-navy)] overflow-hidden">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Interactive Grid Background */}
        <InteractiveGridPattern 
          className="absolute inset-0 h-full w-full opacity-40 [mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]" 
          width={60} 
          height={60} 
          squares={[40, 40]}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--brand-navy)] via-transparent to-[var(--brand-navy)] opacity-60 pointer-events-none" />
      </div>

      <div className="flex-1 flex flex-col justify-center container px-6 mx-auto relative z-10 py-24 pointer-events-none">
        <StaggerContainer className="flex flex-col items-center text-center pointer-events-auto">
          {/* Main Heading */}
          <StaggerItem>
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-black text-white leading-none tracking-tighter mb-8 uppercase flex flex-col items-center gap-2">
              <span className="block opacity-90">{hero.title.split(' ')[0]}</span>
              <div className="flex items-center gap-3">
                <AuroraText 
                  colors={["#ffd07e", "#ffffff", "#6dacca", "#ffd07e"]}
                >
                  GRC SUMMIT
                </AuroraText>
                <span className="text-2xl md:text-4xl lg:text-5xl opacity-50 font-light italic">1.0</span>
              </div>
            </h1>
          </StaggerItem>

          {/* Subtitle */}
          <StaggerItem>
            <h2 className="text-[var(--brand-gold)] text-lg md:text-2xl font-bold uppercase tracking-widest mb-10 text-center max-w-4xl leading-relaxed">
              {hero.subtitle}
            </h2>
          </StaggerItem>

          {/* Metadata Block (Dates & Venue) */}
          <StaggerItem className="w-full flex justify-center">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12 px-6 py-4 border-y border-white/5 w-full max-w-2xl bg-white/[0.02]">
             <div className="flex items-center space-x-3">
                <Calendar className="text-[var(--brand-gold)] w-4 h-4" />
                <div className="text-left">
                   <span className="text-white font-black uppercase tracking-widest text-[10px]">{hero.dates}</span>
                </div>
             </div>
             <div className="w-px h-4 bg-white/10 hidden md:block"></div>
             <div className="flex items-center space-x-3">
                <MapPin className="text-[var(--brand-gold)] w-4 h-4" />
                <div className="text-left">
                   <span className="text-white font-black uppercase tracking-widest text-[10px]">{hero.venue}</span>
                </div>
             </div>
            </div>
          </StaggerItem>

          {/* Tagline */}
          <StaggerItem>
            <p className="text-slate-300 text-sm md:text-base font-medium tracking-widest uppercase mb-8 text-center max-w-2xl">
              {hero.tagline}
            </p>
          </StaggerItem>

          {/* Status Badge */}
          <StaggerItem>
            <div className="flex items-center space-x-3 mb-6 px-4 py-1.5 rounded-sm bg-white/5 border border-white/10 backdrop-blur-md">
                <ShieldCheck className="text-[var(--brand-gold)] w-3 h-3" />
                <span className="text-[var(--brand-gold)] text-[8px] font-black uppercase tracking-[0.4em]">
                  {hero.badge}
                </span>
            </div>
          </StaggerItem>

          {/* CTA Group */}
          {/* COMMENTED OUT - Pending client approval
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <button className="group relative px-12 py-5 bg-[var(--brand-gold)] hover:bg-white text-slate-900 font-black rounded-sm transition-all duration-500 uppercase tracking-widest text-[10px] overflow-hidden shadow-[0_0_30px_rgba(var(--brand-gold-rgb),0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.4)]">
              <span className="relative z-10 flex items-center">
                Access Gateway <MoveRight className="ml-3 group-hover:translate-x-2 transition-transform" size={16} />
              </span>
            </button>
            <button className="px-12 py-5 bg-transparent border border-white/20 hover:border-[var(--brand-gold)] text-white hover:text-[var(--brand-gold)] font-black rounded-sm transition-all duration-500 uppercase tracking-widest text-[10px] flex items-center">
              Download Prospectus
            </button>
          </div>
          */}
        </StaggerContainer>
      </div>

      {/* Atmospheric Glows */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[var(--brand-gold)]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[var(--brand-gold)]/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="relative z-20 w-full mt-auto">
        <CredibilityStrip />
      </div>
    </section>
  );
}
