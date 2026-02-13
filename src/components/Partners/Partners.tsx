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
    <section id="partners" className="relative py-24 overflow-hidden bg-slate-50 dark:bg-[#0f172a] transition-colors duration-300">
      {/* Watermark Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full select-none pointer-events-none overflow-hidden flex justify-center items-center opacity-[0.03]">
        <span className="text-[20vw] font-black text-foreground dark:text-white leading-none whitespace-nowrap">
          PARTNERS
        </span>
      </div>

      <div className="container px-6 mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
           <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-foreground via-primary to-foreground dark:from-white dark:via-[#d4af37] dark:to-white">
            Summit Partners & Sponsors 2026
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid gap-12 max-w-6xl mx-auto">
          {sponsors.map((group, idx) => (
            <div key={idx} className="space-y-6 flex flex-col items-center">
               <h3 className="text-center text-primary/80 text-sm uppercase tracking-[0.2em] font-medium">
                {group.tier}
              </h3>
              
              <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
                {group.items.map((sponsor, sx) => (
                  <div 
                    key={sx} 
                    className="group relative flex flex-col items-center justify-center p-8 bg-white dark:bg-[#1e293b]/50 border border-primary/10 rounded-xl hover:border-primary/40 hover:bg-white dark:hover:bg-[#1e293b] transition-all duration-300 w-56 md:w-72 h-36 md:h-44 backdrop-blur-sm hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10"
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
                      className="text-foreground dark:text-white font-bold text-lg tracking-tight group-hover:text-primary transition-colors text-center"
                    >
                      {sponsor.name}
                    </span>
                    
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-primary/0 via-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Sponsors Coming Soon */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-white/50 dark:bg-[#1e293b]/30 border border-dashed border-primary/20 rounded-xl">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-muted-foreground dark:text-slate-400 text-sm font-medium tracking-wide">
              Additional sponsors to be announced
            </span>
          </div>
        </div>

        <div className="mt-16 text-center">
            <p className="text-muted-foreground dark:text-slate-400 mb-6">Interested in becoming a partner?</p>
            <a href="mailto:info@africagrcsummit.com" className="inline-flex items-center justify-center px-8 py-3 text-sm font-bold text-primary border border-primary/30 rounded-full hover:bg-primary/10 hover:border-primary transition-all uppercase tracking-wider">
                Become a Sponsor
            </a>
        </div>
      </div>
    </section>
  );
}
