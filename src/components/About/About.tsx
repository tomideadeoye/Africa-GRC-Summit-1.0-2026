import { Target, Lightbulb, Compass, Award, Globe } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-24 bg-slate-50 dark:bg-[#0f172a] relative overflow-hidden transition-colors duration-300">
      <div className="container px-6 mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Text Content */}
          <div className="animate-fade-in-up">
             <div className="flex items-center space-x-2 mb-4">
                <span className="h-px w-8 bg-primary"></span>
                <span className="text-primary text-sm uppercase tracking-widest font-bold">About the Summit</span>
             </div>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 text-foreground dark:text-white leading-tight">
              The Future of GRC: <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#fcd34d]">
                Intelligent, Integrated & Insight-Driven.
              </span>
            </h2>
            <p className="text-muted-foreground dark:text-slate-400 text-lg leading-relaxed mb-8">
              In an era defined by rapid digital transformation and disruptive technologies like GenAI and Quantum Computing, 
              the Africa GRC Summit 1.0 delivers strategic clarity and actionable intelligence for the continent&apos;s top executives.
              This is not just a conference; it is a war room for the future of African governance.
            </p>

            <div className="space-y-6">
                <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-lg mr-4 mt-1">
                        <Target className="text-primary" size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-foreground dark:text-white mb-2">Our Mission</h3>
                        <p className="text-muted-foreground dark:text-slate-400 leading-relaxed">
                            To convene leaders to co-create strategies that strengthen institutional trust and sovereign resilience across Africa.
                        </p>
                    </div>
                </div>

                 <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-lg mr-4 mt-1">
                        <Compass className="text-primary" size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-foreground dark:text-white mb-2">Our Vision</h3>
                        <p className="text-muted-foreground dark:text-slate-400 leading-relaxed">
                            To become Africa's most influential executive platform for shaping the future of digital trust and corporate governance.
                        </p>
                    </div>
                </div>
            </div>
          </div>

          {/* Right: Visual/Stats */}
          <div className="relative">
             <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-2xl blur-2xl transform rotate-3"></div>
            <div className="relative bg-white/50 dark:bg-[#1e293b]/50 backdrop-blur-md border border-primary/10 rounded-2xl p-8 lg:p-12 shadow-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="text-center p-6 bg-slate-100/50 dark:bg-[#0f172a]/50 rounded-xl border border-slate-200 dark:border-slate-700/50 hover:border-primary/30 transition-colors">
                        <Award className="mx-auto text-primary mb-3" size={32} />
                        <h4 className="text-3xl font-extrabold text-foreground dark:text-white mb-1">500+</h4>
                        <p className="text-sm text-muted-foreground dark:text-slate-400 uppercase tracking-wider">Delegates</p>
                    </div>
                    <div className="text-center p-6 bg-slate-100/50 dark:bg-[#0f172a]/50 rounded-xl border border-slate-200 dark:border-slate-700/50 hover:border-primary/30 transition-colors">
                        <Lightbulb className="mx-auto text-primary mb-3" size={32} />
                        <h4 className="text-3xl font-extrabold text-foreground dark:text-white mb-1">20+</h4>
                        <p className="text-sm text-muted-foreground dark:text-slate-400 uppercase tracking-wider">Sessions</p>
                    </div>
                    <div className="text-center p-6 bg-slate-100/50 dark:bg-[#0f172a]/50 rounded-xl border border-slate-200 dark:border-slate-700/50 hover:border-primary/30 transition-colors">
                         <Globe className="mx-auto text-primary mb-3" size={32} />
                        <h4 className="text-3xl font-extrabold text-foreground dark:text-white mb-1">15+</h4>
                        <p className="text-sm text-muted-foreground dark:text-slate-400 uppercase tracking-wider">Countries</p>
                    </div>
                     <div className="text-center p-6 bg-slate-100/50 dark:bg-[#0f172a]/50 rounded-xl border border-slate-200 dark:border-slate-700/50 hover:border-primary/30 transition-colors">
                        <Target className="mx-auto text-primary mb-3" size={32} />
                        <h4 className="text-3xl font-extrabold text-foreground dark:text-white mb-1">3</h4>
                        <p className="text-sm text-muted-foreground dark:text-slate-400 uppercase tracking-wider">Days</p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
