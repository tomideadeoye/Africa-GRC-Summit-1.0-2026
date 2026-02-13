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
    <section id="partners" className="relative py-24 overflow-hidden bg-slate-50 transition-colors duration-300">
      {/* Watermark Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full select-none pointer-events-none overflow-hidden flex justify-center items-center opacity-[0.03]">
        <span className="text-[20vw] font-black text-slate-900 leading-none whitespace-nowrap">
          PARTNERS
        </span>
      </div>

      <div className="container px-6 mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-slate-800">
            Summit Partners & Sponsors 2026
          </h2>
          <div className="w-24 h-1 bg-[#b8860b] mx-auto rounded-full" />
        </div>

        <div className="grid gap-12 max-w-6xl mx-auto">
          {sponsors.map((group, idx) => (
            <div key={idx} className="space-y-6 flex flex-col items-center">
              <h3 className="text-center text-[#b8860b] text-sm uppercase tracking-[0.2em] font-bold">
                {group.tier}
              </h3>
              
              <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
                {group.items.map((sponsor, sx) => (
                  <div 
                    key={sx} 
                    className="group relative flex flex-col items-center justify-center p-8 bg-white border border-slate-200 rounded-xl hover:border-[#b8860b]/40 hover:bg-white transition-all duration-300 w-56 md:w-72 h-36 md:h-44 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#b8860b]/10"
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
                      className="text-slate-800 font-bold text-lg tracking-tight group-hover:text-[#b8860b] transition-colors text-center"
                    >
                      {sponsor.name}
                    </span>
                    
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-[#b8860b]/0 via-[#b8860b]/0 to-[#b8860b]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Sponsors Coming Soon */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-white border border-dashed border-[#b8860b]/30 rounded-xl">
            <div className="w-2 h-2 rounded-full bg-[#b8860b] animate-pulse" />
            <span className="text-slate-500 text-sm font-medium tracking-wide">
              Additional sponsors to be announced
            </span>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-slate-600 mb-6">Interested in becoming a partner?</p>
          <a href="mailto:info@africagrcsummit.com" className="inline-flex items-center justify-center px-8 py-3 text-sm font-bold text-white bg-[#b8860b] rounded-full hover:bg-[#9a7209] shadow-md hover:shadow-lg transition-all uppercase tracking-wider">
            Become a Sponsor
          </a>
        </div>
      </div>
    </section>
  );
}
