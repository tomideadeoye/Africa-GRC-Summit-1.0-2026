import { CheckCircle2 } from "lucide-react";

const delegates = [
  "Board Directors & Non-Executive Directors",
  "Chief Executive Officers",
  "Chief Risk Officers",
  "Chief Compliance Officers",
  "Chief Information Security Officers",
  "Chief Audit Executive Officers",
  "Chief Information Officers",
  "Chief Technology Officers",
  "Chief Operations Officers",
  "Chief Data Officers",
  "Senior Strategy Managers",
  "Heads of Data & Analytics",
  "Heads of Operations",
  "Heads of Risk Management",
  "Heads of Compliance",
  "Heads of Audit",
  "Heads of Infrastructure Security",
  "Heads of Cybersecurity",
  "Heads of IT",
  "Heads of Procurement",
  "Regulators and Policymakers"
];

export default function Audience() {
  return (
    <section id="audience" className="py-24 bg-background dark:bg-[#0f172a] relative overflow-hidden transition-colors duration-300">
      {/* Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0 w-full overflow-hidden flex justify-center">
        <span className="text-[12rem] md:text-[20rem] font-black text-slate-100 dark:text-slate-800/30 opacity-60 tracking-tighter whitespace-nowrap">
          delegates
        </span>
      </div>

      <div className="container px-6 mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
           <span className="text-[#d4af37] font-bold tracking-wider text-sm uppercase mb-4 block">
            #toplevelexecutives
          </span>
           <h2 className="text-4xl md:text-6xl font-black mb-6 text-foreground dark:text-white tracking-tight">
            Who should attend
          </h2>
          <p className="text-muted-foreground dark:text-slate-400 max-w-3xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
            This conference is designed for C-level executives, senior directors,
            and key decision makers from public and private sector.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 max-w-6xl mx-auto">
          {delegates.map((role, idx) => (
            <div 
              key={idx} 
              className="flex items-center space-x-3 group p-2 rounded-lg transition-all hover:bg-slate-50 dark:hover:bg-slate-800/50"
            >
              <div className="flex-shrink-0 text-[#d4af37]">
                <CheckCircle2 size={18} className="fill-[#d4af37]/10" />
              </div>
              <span className="text-sm md:text-base font-semibold text-slate-700 dark:text-slate-200 group-hover:text-primary transition-colors">
                {role}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

