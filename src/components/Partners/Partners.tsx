import { Shield, Globe, Database, Cpu, Lock, Network } from "lucide-react";

const sponsors = [
  {
    tier: "Gold Sponsor",
    items: [
      { name: "Global Governance Corp", icon: Shield, color: "#d4af37" },
      { name: "Alvarez & Marsal", icon: Globe, color: "#d4af37" },
    ]
  },
  {
    tier: "Innovation Partner",
    items: [
      { name: "SEIDOR", icon: Cpu, color: "#3b82f6" } // Blue for innovation
    ]
  },
  {
    tier: "Silver Sponsor",
    items: [
      { name: "RiskConnect", icon: Network, color: "#94a3b8" },
      { name: "Aurex Group", icon: Database, color: "#94a3b8" },
      { name: "Control Risks", icon: Lock, color: "#94a3b8" },
    ]
  }
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
            Summit Partners and Sponsors 2026
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid gap-12 max-w-6xl mx-auto">
          {sponsors.map((group, idx) => (
            <div key={idx} className="space-y-6">
               <h3 className="text-center text-primary/80 text-sm uppercase tracking-[0.2em] font-medium">
                {group.tier}
              </h3>
              
              <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
                {group.items.map((sponsor, sx) => (
                  <div 
                    key={sx} 
                    className="group relative flex flex-col items-center justify-center p-8 bg-white dark:bg-[#1e293b]/50 border border-primary/10 rounded-xl hover:border-primary/40 hover:bg-white dark:hover:bg-[#1e293b] transition-all duration-300 w-48 md:w-64 h-32 md:h-40 backdrop-blur-sm hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10"
                  >
                    <sponsor.icon 
                      size={40} 
                      className="mb-3 transition-transform group-hover:scale-110 duration-300" 
                      style={{ color: sponsor.color }}
                    />
                    <span 
                      className="text-foreground dark:text-white font-bold text-lg tracking-tight group-hover:text-primary transition-colors"
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

        <div className="mt-20 text-center">
            <p className="text-muted-foreground dark:text-slate-400 mb-6">Interested in becoming a partner?</p>
            <a href="#contact" className="inline-flex items-center justify-center px-8 py-3 text-sm font-bold text-primary border border-primary/30 rounded-full hover:bg-primary/10 hover:border-primary transition-all uppercase tracking-wider">
                Download Sponsorship Brochure
            </a>
        </div>
      </div>
    </section>
  );
}
