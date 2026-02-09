import { User, Shield, Briefcase, Gavel, FileText, Lock, Globe, Server, Activity, ArrowRight } from "lucide-react";

const audiences = [
  { 
    role: "Board Directors", 
    desc: "Overseeing governance & strategic direction.",
    icon: Globe 
  },
  { 
    role: "Chief Executive Officers (CEOs)", 
    desc: "Driving organizational performance & culture.",
    icon: Briefcase 
  },
  { 
    role: "Chief Risk Officers (CROs)", 
    desc: "Navigating complex risk landscapes.",
    icon: Activity 
  },
  { 
    role: "Chief Compliance Officers (CCOs)", 
    desc: "Ensuring regulatory adherence & integrity.",
    icon: Shield 
  },
  { 
    role: "Chief Information Security Officers (CISOs)", 
    desc: "Protecting digital assets & data sovereignty.",
    icon: Lock 
  },
  { 
    role: "Chief Audit Executives (CAEs)", 
    desc: "Providing independent assurance & insight.",
    icon: FileText 
  },
  { 
    role: "Regulators & Policymakers", 
    desc: "Shaping the framework of African commerce.",
    icon: Gavel 
  },
  { 
    role: "Technology Leaders (CIOs/CTOs)", 
    desc: "Leveraging tech for governance innovation.",
    icon: Server 
  }
];

export default function Audience() {
  return (
    <section id="audience" className="py-24 bg-background dark:bg-[#0f172a] relative overflow-hidden transition-colors duration-300">
      {/* Background Shine */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container px-6 mx-auto relative z-10">
        <div className="text-center mb-20 animate-fade-in-up">
           <h2 className="text-3xl md:text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-foreground via-primary to-foreground dark:from-white dark:via-[#d4af37] dark:to-white">
            Who Should Attend?
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6" />
          <p className="text-muted-foreground dark:text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            The Summit is an exclusive gathering for the architects of Africa&apos;s corporate and sovereign future.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {audiences.map((item, idx) => (
            <div 
              key={idx} 
              className="group relative bg-white/40 dark:bg-[#1e293b]/40 backdrop-blur-sm border border-primary/10 p-8 rounded-2xl hover:bg-white dark:hover:bg-[#1e293b] hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 flex flex-col items-center text-center"
            >
              <div className="p-4 bg-primary/10 rounded-full mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <item.icon size={32} className="text-primary group-hover:text-[#0f172a] transition-colors" />
              </div>
              
              <h3 className="text-xl font-bold text-foreground dark:text-white mb-3 group-hover:text-primary transition-colors">
                {item.role}
              </h3>
              
              <p className="text-sm text-muted-foreground dark:text-slate-400 leading-relaxed group-hover:text-slate-600 dark:group-hover:text-slate-300">
                {item.desc}
              </p>

              {/* Hover Arrow */}
              <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <ArrowRight size={20} className="text-primary" />
              </div>
              
              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary/10 to-transparent rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
