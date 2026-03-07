import { Users, Briefcase, FileCheck, ShieldAlert, BadgeCheck, SearchCode, Cpu, Cog } from "lucide-react";
import { StaggerContainer, StaggerItem, FadeIn } from "../ui/FadeIn";

const attendanceCategories = [
  {
    title: "Boards & C-Suite",
    subtitle: "Strategic Governance",
    roles: ["Board Directors", "Non-Executive Directors", "Chief Executive Officers (CEOs)"],
    icon: Users
  },
  {
    title: "Regulators",
    subtitle: "Policy & Supervision",
    roles: ["Regulators", "Policy Makers", "Supervisory Bodies"],
    icon: FileCheck
  },
  {
    title: "Risk Leadership",
    subtitle: "Institutional Resilience",
    roles: ["Chief Risk Officers (CROs)", "Heads of Risk Management"],
    icon: ShieldAlert
  },
  {
    title: "Compliance",
    subtitle: "Institutional Integrity",
    roles: ["Chief Compliance Officers (CCOs)", "Heads of Compliance"],
    icon: BadgeCheck
  },
  {
    title: "Information Security",
    subtitle: "Digital Trust",
    roles: ["Chief Information Security Officers (CISOs)", "Heads of Cybersecurity"],
    icon: Briefcase
  },
  {
    title: "Internal Audit",
    subtitle: "Assurance & Oversight",
    roles: ["Heads of Internal Audit", "Chief Audit Executives"],
    icon: SearchCode
  },
  {
    title: "Technology Leadership",
    subtitle: "Digital Architecture",
    roles: ["Chief Information Officers (CIOs)", "Chief Technology Officers (CTOs)", "Heads of IT"],
    icon: Cpu
  },
  {
    title: "Operations & Strategy",
    subtitle: "Operational Excellence",
    roles: ["Chief Operations Officers (COOs)", "Chief Data Officers", "Heads of Procurement"],
    icon: Cog
  }
];

export default function Audience() {
  return (
    <section id="attendance" className="py-32 bg-white relative">
      <div className="container px-6 mx-auto relative z-10">
        <FadeIn className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
          <div className="max-w-5xl">
            <div className="flex items-center space-x-4 mb-6">
              <div className="h-[1px] w-12 bg-[#d4af37]"></div>
              <span className="text-[#d4af37] text-sm font-bold uppercase tracking-[4px]">A Curated Executive Dialogue</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight mb-10 tracking-tighter uppercase">
              Attendance <br />
              <span className="text-[#d4af37]">(Exclusive Invite-Only)</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <p className="text-slate-900 text-lg font-bold leading-relaxed uppercase tracking-tight">
                  Africa GRC Summit 1.0 is a curated, invitation-only executive forum.
                </p>
                <p className="text-slate-600 text-sm font-medium leading-relaxed uppercase tracking-widest">
                  Participation is extended exclusively to senior leaders responsible for governance, risk, compliance, cybersecurity, regulatory oversight and institutional strategy within Africa’s financial ecosystem.
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-[#d4af37] text-sm font-bold uppercase tracking-widest">
                  Africa GRC Summit is structured as a high-level strategic forum, not a technical conference. The dialogue is:
                </p>
                <ul className="space-y-2">
                  {[
                    "Board and C-suite focused",
                    "Cross-sector and cross-border",
                    "Intelligence-led and forward-looking",
                    "Institutionally grounded",
                    "Designed for peer-level engagement"
                  ].map((text, i) => (
                    <li key={i} className="flex items-center text-slate-600 text-xs font-bold uppercase tracking-widest">
                      <span className="w-1.5 h-1.5 bg-[#d4af37] mr-3 rounded-full shrink-0"></span>
                      {text}
                    </li>
                  ))}
                </ul>
                <p className="text-slate-500 text-xs font-medium uppercase tracking-widest pt-2">
                  Attendance is intentionally limited to preserve the depth, integrity and quality of discussion.
                </p>
              </div>
            </div>
          </div>
          
          <div className="hidden xl:block pb-4 border-b border-slate-200">
             <span className="text-slate-900 font-black text-8xl opacity-5 select-none tracking-tighter">
               EXECUTIVE
             </span>
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {attendanceCategories.map((category, idx) => (
            <StaggerItem key={idx}>
              <div className="group h-full p-8 bg-slate-50 border border-slate-200 hover:border-[#d4af37] hover:shadow-lg hover:shadow-[#d4af37]/5 transition-all duration-500 rounded-sm">
                <div className="flex items-center justify-between mb-8">
                  <div className="w-14 h-14 bg-white flex items-center justify-center rounded-sm border border-slate-200 group-hover:bg-[#d4af37] group-hover:border-[#d4af37] transition-all duration-500">
                    <category.icon className="text-[#d4af37] group-hover:text-white transition-colors duration-500" size={28} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[3px] text-slate-400">
                    {category.subtitle}
                  </span>
                </div>
                
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-6">
                  {category.title}
                </h3>
                
                <ul className="space-y-4">
                  {category.roles.map((role, rIdx) => (
                    <li key={rIdx} className="flex items-start text-sm text-slate-600 font-bold tracking-tight uppercase leading-snug">
                      <span className="w-1.5 h-1.5 bg-slate-300 mr-3 mt-1.5 rounded-full shrink-0 group-hover:bg-[#d4af37] transition-colors duration-500"></span>
                      {role}
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Institutional Focus Section */}
        <FadeIn delay={0.2} className="mt-20 pt-16 border-t border-slate-200 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tighter mb-6">
              Institutional Focus
            </h3>
            <p className="text-slate-600 text-lg font-medium leading-relaxed uppercase tracking-widest mb-2">
              The summit brings together leadership from:
            </p>
          </div>
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              {[
                "Tier-1 Banks",
                "FinTech and Payment Platforms",
                "Capital Market Institutions",
                "Central Banks and Regulatory Authorities",
                "Governance, Risk and Technology Leaders"
              ].map((text, i) => (
                <div key={i} className="flex items-start text-slate-600 text-sm font-bold uppercase tracking-widest leading-snug">
                  <span className="w-1.5 h-1.5 bg-[#d4af37] mr-3 mt-1.5 rounded-full shrink-0"></span>
                  {text}
                </div>
              ))}
            </div>
            <p className="text-[#d4af37] text-sm font-bold uppercase tracking-widest mt-10">
              This is a platform for alignment, foresight and institutional resilience.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

