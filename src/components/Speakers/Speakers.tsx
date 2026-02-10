import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

// Placeholder data based on the reference image provided
const speakers = [
  {
    name: "Eng. Thamer Al Hamed",
    role: "Executive GM of GRC",
    company: "Confidential Government",
    image: "/placeholder-user.jpg"
  },
  {
    name: "Abdallah Dahhan",
    role: "Chief Risk Officer",
    company: "Al Yusr Leasing and Finance, KSA",
    image: "/placeholder-user.jpg"
  },
  {
    name: "Walid Shukri",
    role: "Board Member, Chairman Audit",
    company: "STC",
    image: "/placeholder-user.jpg"
  },
  {
    name: "Dr. Sultan Alsajjan",
    role: "Governance & Executive Support",
    company: "Confidential Government, KSA",
    image: "/placeholder-user.jpg"
  },
  {
    name: "Dr. Roger Barker",
    role: "Chief Research Officer",
    company: "Center for Governance, KSA",
    image: "/placeholder-user.jpg"
  },
  {
    name: "Abdullah Aldahami",
    role: "General Manager, Internal Audit",
    company: "Sirar by STC",
    image: "/placeholder-user.jpg"
  }
];

export default function Speakers() {
  return (
    <section id="speakers" className="py-24 bg-slate-50 dark:bg-[#0f172a] relative overflow-hidden transition-colors duration-300">
      {/* Background Watermark */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 select-none pointer-events-none z-0">
         <span className="text-[8rem] md:text-[14rem] font-black text-slate-200 dark:text-slate-800/50 opacity-40 tracking-tighter whitespace-nowrap">
          speakers
        </span>
      </div>

      <div className="container px-6 mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
           <span className="text-[#d4af37] font-bold tracking-wider text-xs md:text-sm uppercase mb-3 block">
            #gprcsummit
          </span>
           <h2 className="text-4xl md:text-5xl font-black mb-12 text-foreground dark:text-white tracking-tight">
            Summit Speakers 2026
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {speakers.map((speaker, idx) => (
            <div 
              key={idx} 
              className="bg-white dark:bg-[#1e293b] rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-slate-100 dark:border-slate-700/50"
            >
              {/* Image Container with Geometric Shapes */}
              <div className="relative h-64 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden flex items-end justify-center">
                {/* Yellow Accents - Top Right */}
                 <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFC107] rounded-bl-[100px] z-0 opacity-90 transition-transform group-hover:scale-110 duration-500" />
                 
                 {/* Blue Accents - Bottom Left */}
                 <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#90CAF9] rounded-tr-[100px] z-0 opacity-90 transition-transform group-hover:scale-110 duration-500" />

                 {/* Placeholder Image / Avatar */}
                 <div className="relative z-10 w-40 h-40 mb-4 rounded-full bg-slate-200 dark:bg-slate-700 border-4 border-white dark:border-slate-600 shadow-md flex items-center justify-center">
                    <User size={64} className="text-slate-400 dark:text-slate-500" />
                 </div>
              </div>

              {/* Content */}
              <div className="p-6 text-center">
                <h3 className="text-lg font-bold text-foreground dark:text-white mb-2 leading-tight">
                  {speaker.name}
                </h3>
                <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-2 line-clamp-1">
                  {speaker.role}
                </p>
                <p className="text-xs text-muted-foreground dark:text-slate-400 line-clamp-2">
                  {speaker.company}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up">
           <Button className="bg-[#FFC107] hover:bg-[#FFD54F] text-black font-bold uppercase tracking-wider px-8 py-6 rounded-md shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            Become a speaker
          </Button>
           <Button className="bg-[#FFC107] hover:bg-[#FFD54F] text-black font-bold uppercase tracking-wider px-8 py-6 rounded-md shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            Past Speakers
          </Button>
        </div>

      </div>
    </section>
  );
}
