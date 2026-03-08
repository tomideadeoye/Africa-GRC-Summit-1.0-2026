"use client";

import { MoveRight, ShieldCheck, ChevronDown, Calendar, MapPin } from "lucide-react";
import CredibilityStrip from "../CredibilityStrip/CredibilityStrip";
import { FadeIn, StaggerContainer, StaggerItem } from "../ui/FadeIn";
import { AuroraText } from "../ui/aurora-text";
import { InteractiveGridPattern } from "../ui/interactive-grid-pattern";
import type { HeroConfig } from "@/lib/config-store";

type HeroProps = {
  initialData?: HeroConfig | null;
};

export default function Hero({ initialData }: HeroProps) {
  const fallbackHero = {
    title: "AFRICA GRC SUMMIT 1.0",
    subtitle: "The Future of GRC: Intelligent. Integrated. Insight-Driven",
    dates: "October 21-22, 2026",
    venue: "Sheraton Lagos Hotel, Lagos, Nigeria",
    tagline: "Africa's Executive Forum for Governance and Digital Trust",
    badge: "By Invitation Only",
    status: "ENROLLMENT OPEN"
  };
  const hero = { ...fallbackHero, ...(initialData || {}) };

  return (
    <section className="relative min-h-screen flex flex-col bg-[var(--brand-navy)] overflow-hidden">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Interactive Grid Background */}
        <InteractiveGridPattern 
          className="absolute inset-0 h-full w-full opacity-60 [mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]" 
          width={24} 
          height={24} 
          squares={[100, 100]}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--brand-navy)] via-transparent to-[var(--brand-navy)] opacity-40 pointer-events-none" />
      </div>

      <div className="flex-1 flex flex-col justify-center container px-5 md:px-6 mx-auto relative z-10 py-20 md:py-24 pointer-events-none h-full">
        <StaggerContainer className="flex flex-col items-center md:items-start text-center md:text-left max-w-5xl w-full">

          {/* Unified Identity Component */}
          <StaggerItem>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 sm:gap-5 md:gap-10 mb-10 md:mb-14 p-1 md:p-2 w-full">
              {/* Part 1: Logo Mark - Spans from AFRICA to divider line */}
              <div className="flex items-stretch shrink-0 justify-center">
                <img 
                  src="/branding/logo-main.png" 
                  alt="Africa GRC Logo Mark" 
                  className="h-24 sm:h-28 md:h-40 lg:h-48 w-auto object-contain"
                  style={{ imageRendering: '-webkit-optimize-contrast' }}
                />
              </div>

              {/* Part 2: Strategic Text Group */}
              <div className="flex flex-col items-center md:items-start leading-none w-full max-w-[22ch] md:max-w-[24ch] lg:max-w-[26ch]">
                <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white/50 tracking-[0.2em] md:tracking-[0.3em] block uppercase">
                  {hero.title.split(' ')[0]}
                </span>
                
                <div className="flex items-end justify-center md:justify-start gap-1 sm:gap-2 md:gap-5 mt-2">
                  <AuroraText 
                    className="text-[clamp(2rem,11vw,4rem)] md:text-7xl lg:text-8xl font-black tracking-tighter block uppercase py-1 md:py-2 whitespace-nowrap"
                    colors={["#ffd07e", "#ffffff", "#6dacca", "#ffd07e"]}
                  >
                    GRC SUMMIT
                  </AuroraText>
                  <span className="text-[clamp(1.2rem,8vw,2.5rem)] md:text-5xl lg:text-6xl opacity-30 font-light italic tracking-[0.12em] md:tracking-[0.2em] text-white pb-1 md:pb-2 whitespace-nowrap">1.0</span>
                </div>

       
                {/* Divider line - logo ends here */}
                <div className="h-px w-full bg-gradient-to-r from-white/20 to-transparent mt-5 md:mt-6" />
              </div>
            </div>
          </StaggerItem>

         {/* Subtitle */}
                <h2 className="text-[var(--brand-gold)] text-[clamp(1rem,4.5vw,1.25rem)] md:text-2xl font-bold tracking-[0.15em] md:tracking-widest max-w-[28ch] md:max-w-3xl leading-[1.4] border-l-4 border-[var(--brand-gold)] pl-5 md:pl-6 mt-4 md:mt-4 uppercase">
                  {hero.subtitle}
                </h2>


          {/* Metadata Block */}
          <StaggerItem className="w-full mt-7 md:mt-8 pointer-events-auto">
            <div className="flex flex-col md:flex-row items-stretch justify-start gap-0.5 p-0.5 bg-white/5 border border-white/10 max-w-3xl">
              <div className="flex-1 p-3 sm:p-5 md:p-7 flex items-center space-x-3 md:space-x-5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
                <div className="p-2 md:p-3 bg-[var(--brand-gold)]/10 rounded-sm">
                  <Calendar className="text-[var(--brand-gold)] w-4 h-4 md:w-6 md:h-6" />
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-black tracking-[0.05em] md:tracking-[0.12em] text-[10px] md:text-sm leading-tight uppercase">{hero.dates}</span>
                </div>
              </div>
              <div className="hidden md:block w-px bg-white/10" />
              <div className="flex-1 p-3 sm:p-5 md:p-7 flex items-center space-x-3 md:space-x-5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
                <div className="p-2 md:p-3 bg-[var(--brand-gold)]/10 rounded-sm">
                  <MapPin className="text-[var(--brand-gold)] w-4 h-4 md:w-6 md:h-6" />
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-black tracking-[0.05em] md:tracking-[0.12em] text-[10px] md:text-sm leading-tight uppercase">{hero.venue}</span>
                </div>
              </div>
            </div>
          </StaggerItem>

          {/* Tagline */}
          <StaggerItem>
            <p className="mt-14 text-slate-400 text-xs md:text-sm font-bold tracking-[0.32em] max-w-2xl opacity-70 leading-relaxed">
               {hero.tagline}
            </p>
          </StaggerItem>
  {/* Status Badge */}
          <StaggerItem>
            <div className="flex items-center space-x-3 mb-10 px-5 py-2 rounded-sm bg-white/5 border border-white/10 backdrop-blur-md mt-5">
                <div className="w-1.5 h-1.5 bg-[var(--brand-gold)] rounded-full animate-pulse" />
                <span className="text-[var(--brand-gold)] text-[9px] font-black tracking-[0.5em]">
                  {hero.badge}
                </span>
            </div>
          </StaggerItem>
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
