import { Globe } from "lucide-react";

type SponsorItem = {
  name: string;
  icon: any;
  color: string;
  image?: string;
}

const sponsors: { tier: string; items: SponsorItem[] }[] = [
  {
    tier: "Platinum Sponsor",
    items: [
      { name: "FirstBank", image: "/firstbank.svg", color: "#003b6d", icon: Globe }
    ]
  },
];

export default function Partners() {
  return (
    <section id="partners" className="relative py-24 overflow-hidden bg-white transition-colors duration-300">
      {/* Watermark Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full select-none pointer-events-none overflow-hidden flex justify-center items-center opacity-[0.05]">
        <span className="text-[20vw] font-black text-slate-200 leading-none whitespace-nowrap">
          PARTNERS
        </span>
      </div>

      <div className="container px-6 mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-5xl font-black mb-4 text-slate-900 uppercase tracking-tighter">
            Summit Partners & Sponsors 2026
          </h2>
          <div className="w-24 h-1 bg-[var(--brand-gold)] mx-auto rounded-full" />
        </div>

        <div className="grid gap-12 max-w-6xl mx-auto">
          {sponsors.map((group, idx) => (
            <div key={idx} className="space-y-6 flex flex-col items-center">
              <h3 className="text-center text-[var(--brand-gold)] text-xs uppercase tracking-[0.3em] font-black">
                {group.tier}
              </h3>
              
              <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
                {group.items.map((sponsor, sx) => (
                  <div 
                    key={sx} 
                    className="group relative flex flex-col items-center justify-center p-8 bg-slate-50 border border-slate-100 rounded-sm hover:border-[var(--brand-gold)]/40 hover:bg-white transition-all duration-300 w-56 md:w-72 h-36 md:h-44 hover:-translate-y-1 hover:shadow-xl hover:shadow-[var(--brand-gold)]/5"
                  >
                    {sponsor.image ? (
                      <div className="h-16 w-full flex items-center justify-center mb-3 transition-transform group-hover:scale-110 duration-300">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={sponsor.image} 
                          alt={sponsor.name} 
                          className="h-full w-auto object-contain"
                        />
                      </div>
                    ) : (
                      <sponsor.icon 
                        size={40} 
                        className="mb-3 transition-transform group-hover:scale-110 duration-300" 
                        style={{ color: sponsor.color }}
                      />
                    )}
                    <span 
                      className="text-slate-900 font-black text-lg tracking-tight group-hover:text-[var(--brand-gold)] transition-colors text-center"
                    >
                      {sponsor.name}
                    </span>
                    
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 rounded-sm bg-gradient-to-tr from-[var(--brand-gold)]/0 via-[var(--brand-gold)]/0 to-[var(--brand-gold)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Sponsors Coming Soon */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-slate-50 border border-dashed border-slate-200 rounded-sm">
            <div className="w-2 h-2 rounded-full bg-[var(--brand-gold)] animate-pulse" />
            <span className="text-slate-400 text-[10px] font-black tracking-widest">
              Additional sponsors to be announced
            </span>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-slate-400 text-[10px] font-black tracking-widest mb-6 italic">Interested in becoming a partner?</p>
          <a 
            href={`mailto:info@africagrcsummit.com?subject=${encodeURIComponent("Sponsorship Inquiry: Africa GRC Summit 1.0 (2026)")}&body=${encodeURIComponent("Dear Africa GRC Summit Team,\n\nI am writing to express my organization's interest in partnering with the upcoming Africa GRC Summit 1.0 (2026).\n\nWe would like to request more information regarding your sponsorship packages and opportunities for institutional representation at the executive forum.\n\nOrganization Name: \nContact Person: \nJob Title: \nPhone Number: \n\nPlease let us know how we can proceed.\n\nBest regards,\n")}`}
            className="inline-flex items-center justify-center px-10 py-4 text-[10px] font-black text-white bg-[var(--brand-navy)] rounded-sm hover:bg-[var(--brand-gold)] shadow-md hover:shadow-xl transition-all tracking-[0.2em]"
          >
            Become a Sponsor
          </a>
        </div>
      </div>
    </section>
  );
}
