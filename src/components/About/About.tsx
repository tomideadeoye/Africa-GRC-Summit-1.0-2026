import { Shield, Zap, TrendingUp, Users, Award, Lock } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "../ui/FadeIn";

export default function About() {
  return (
    <section id="about" className="py-32 bg-slate-50 relative overflow-hidden">
      {/* Background Decorative Accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[var(--brand-gold)]/5 to-transparent pointer-events-none"></div>
      
      <div className="container px-6 mx-auto relative z-10">
        <div className="max-w-4xl mb-24">
          <FadeIn className="flex items-center space-x-4 mb-6">
            <div className="h-[1px] w-12 bg-[var(--brand-gold)]"></div>
            <span className="text-[var(--brand-gold)] text-sm font-black tracking-[4px]">The Strategic Governance Imperative</span>
          </FadeIn>
          
          <FadeIn delay={0.1}>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] mb-10 uppercase tracking-tighter">
              About Africa <span className="text-[var(--brand-gold)]">GRC</span> Summit 1.0
            </h2>
          </FadeIn>
          
          <StaggerContainer className="space-y-6">
            <StaggerItem>
              <p className="text-slate-600 text-xl leading-relaxed font-black tracking-tight">
                Africa’s financial ecosystem is entering a defining era of structural transformation. 
                Digital acceleration, regulatory evolution, cross-border integration and intelligent technologies are fundamentally reshaping institutional architecture across the continent.
              </p>
            </StaggerItem>
            <StaggerItem>
              <p className="text-slate-500 text-lg leading-relaxed font-medium">
                Risk is no longer isolated. It is systemic, interconnected and increasingly technology driven.
                Boards and executive leaders are confronting a new operating reality defined by AI-enabled decision systems, cyber resilience pressures, ecosystem dependencies, regulatory fragmentation and heightened reputational exposure
              </p>
            </StaggerItem>
            <StaggerItem>
              <p className="text-slate-500 text-lg leading-relaxed font-medium">
                Governance, Risk and Compliance must evolve beyond siloed control functions into an integrated, intelligence-led capability embedded at the highest levels of institutional strategy.
                Africa GRC Summit 1.0 convenes senior decision-makers to examine this shift, and to shape a more resilient, accountable and digitally trusted financial ecosystem across the continent.
              </p>
            </StaggerItem>
          </StaggerContainer>
        </div>

        {/* Purpose Pillars */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
          {[
            { 
              title: "GRC Maturity", 
              desc: "Advance GRC maturity across Africa's financial ecosystem through institutional alignment.",
              icon: TrendingUp 
            },
            { 
              title: "Digital Trust", 
              desc: "Strengthen digital trust as a foundational pillar of economic stability and growth.",
              icon: Shield 
            },
            { 
              title: "Regulatory Alignment", 
              desc: "Enable deeper alignment between supervisory bodies and industry practitioners.",
              icon: Zap 
            },
            { 
              title: "Intelligent Architecture", 
              desc: "Examine the implementation of integrated and intelligent GRC architectures.",
              icon: Lock 
            },
            { 
              title: "Executive Foresight", 
              desc: "Elevate executive foresight in an era of escalating systemic complexity.",
              icon: Users 
            }
          ].map((item, i) => (
            <StaggerItem key={i} className="p-10 bg-white border border-slate-200 hover:border-[var(--brand-gold)]/40 hover:shadow-xl transition-all group">
              <item.icon className="text-[var(--brand-gold)] mb-6 group-hover:scale-110 transition-transform" size={32} />
              <h3 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-tight">{item.title}</h3>
              <p className="text-slate-500 leading-relaxed font-medium">{item.desc}</p>
            </StaggerItem>
          ))}
        </StaggerContainer>
        
        <FadeIn className="flex flex-col mb-32 border-l-2 border-[var(--brand-gold)] pl-8 max-w-4xl mx-auto">
          <p className="text-[var(--brand-gold)] font-bold text-lg tracking-widest mb-2">
            This is not a technical convening.
          </p>
          <p className="text-slate-600 font-medium text-lg leading-relaxed tracking-tight">
            It is a curated leadership platform designed for board-level dialogue, strategic alignment and institutional accountability.
          </p>
        </FadeIn>

        {/* Strategic Context Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <FadeIn className="bg-white p-12 lg:p-16 border border-slate-200 relative shadow-sm">
             <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-[var(--brand-gold)]"></div>
             <h3 className="text-2xl font-black text-slate-900 uppercase mb-8 tracking-widest">Global Strategic Context</h3>
             <StaggerContainer className="space-y-4">
                {[
                  "AI-enabled autonomous decision systems",
                  "Escalating cyber and financial crime sophistication",
                  "Regulatory divergence across jurisdictions",
                  "Ecosystem dependencies and cloud concentration risk",
                  "Geopolitical volatility and cross-border exposure",
                  "Reputational exposure via information disorder"
                ].map((text, i) => (
                  <StaggerItem key={i} className="flex items-center text-slate-500 font-bold tracking-tight text-sm">
                    <span className="w-1.5 h-1.5 bg-[var(--brand-gold)] mr-4 rounded-full"></span>
                    {text}
                  </StaggerItem>
                ))}
             </StaggerContainer>
             <div className="mt-8 pt-6 border-t border-slate-100">
               <p className="text-slate-600 font-bold tracking-tight text-sm leading-relaxed mb-4">
                 These forces demand GRC frameworks that are cohesive, technology-aware and insight-led.
               </p>
               <p className="text-[var(--brand-gold)] font-bold tracking-tight text-sm leading-relaxed">
                 Africa GRC Summit 1.0 provides a trusted environment for peer-level engagement on the structural choices that will define the next era of Governance, Risk and Compliance across Africa.
               </p>
             </div>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <span className="text-[10px] font-black tracking-[5px] text-slate-400 mb-6 block">The Distinctive Edge</span>
            <h3 className="text-3xl font-black text-slate-900 uppercase mb-8 leading-tight">What Makes This <br />Summit Distinct</h3>
            <StaggerContainer className="space-y-8">
              {[
                "Invitation-only executive participation",
                "Cross-border regulatory and institutional representation",
                "Board and C-suite level dialogue",
                "Global and African thought leadership",
                "Institutionally grounded, non-commercial orientation"
              ].map((text, i) => (
                <StaggerItem key={i} className="flex items-center pb-4 border-b border-slate-200">
                  <Award className="text-[var(--brand-gold)] mr-6 shrink-0" size={24} />
                  <span className="text-slate-900 font-black tracking-tight text-sm">{text}</span>
                </StaggerItem>
              ))}
            </StaggerContainer>
            <p className="mt-8 pt-6 border-t border-slate-200 text-slate-500 font-bold text-sm tracking-widest italic">
              The structure ensures depth, discretion and strategic clarity.
            </p>
          </FadeIn>
        </div>

        {/* Institutional Foundation */}
        <FadeIn className="p-12 bg-white border-l-4 border-[var(--brand-gold)] shadow-sm">
          <h3 className="text-xl font-black text-slate-900 mb-6 uppercase tracking-widest">Institutional Foundation</h3>
          <div className="space-y-4 max-w-4xl">
            <p className="text-slate-600 leading-relaxed font-black tracking-tight text-sm">
              Africa GRC Summit 1.0 is convened by <strong>AAA Global Advisory and Consultancy Ltd</strong> as a long-term executive platform advancing GRC innovation, regulatory dialogue and digital trust across the continent.
            </p>
            <p className="text-slate-600 leading-relaxed font-black tracking-tight text-sm text-[var(--brand-gold)]">
              The summit represents the foundation of a sustained continental dialogue shaping the future of intelligent, integrated and insight-driven Governance, Risk and Compliance in Africa.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
