import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-black">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover opacity-60"
        >
          <source 
            src="https://player.vimeo.com/external/494298150.sd.mp4?s=990924760086307119ff35b975ee35d1f851083e&profile_id=164&oauth2_token_id=57447761" 
            type="video/mp4" 
          />
        </video>
        {/* Cinematic Scrim Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/40 to-transparent z-1"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0f172a_100%)] opacity-60 z-1"></div>
      </div>

      {/* Glow Effect */}
      <div className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(212,175,55,0.15)_0%,transparent_70%)] blur-[100px] pointer-events-none z-10 animate-fade-in" />
      
      <div className="container px-6 mx-auto relative z-20">
        <div className="max-w-[1000px] animate-fade-in-up">
          <div className="inline-flex items-center space-x-4 mb-8">
            <span className="px-4 py-1.5 bg-primary text-primary-foreground text-xs font-black uppercase tracking-[3px] rounded-sm shadow-xl">
              1st Annual
            </span>
            <span className="text-white/80 text-sm font-medium tracking-[2px] uppercase">
              #AfricaGRCSummit
            </span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black leading-[1] mb-8 tracking-tight text-white">
            AFRICA <span className="text-gradient">GRC</span> <br />
            SUMMIT 2026
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-200 leading-relaxed mb-12 max-w-[750px] font-medium drop-shadow-lg">
            Join the continent's most influential GRC leaders to architect the future of 
            governance, performance, risk, and compliance in the digital age.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 mb-16">
            <Button className="glow-btn px-10 py-7 text-lg h-auto">
              Register Your Interest
            </Button>
            <Button variant="outline" className="bg-white/5 border-white/20 text-white backdrop-blur-md px-10 py-7 text-lg hover:bg-white/10 hover:border-white/40 h-auto transition-all uppercase font-bold tracking-wider">
              Download Prospectus
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-white/10">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                 <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(212,175,55,1)] animate-pulse"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase text-slate-400 tracking-[3px] mb-1">Status</span>
                <strong className="text-white tracking-wider text-sm">ENROLLMENT OPEN</strong>
              </div>
            </div>
            
            <div className="flex flex-col">
              <span className="text-[10px] uppercase text-slate-400 tracking-[3px] mb-1">Location</span>
              <strong className="text-white tracking-wider text-sm flex items-center">
                <svg className="w-4 h-4 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                CIVIC CENTRE, VICTORIA ISLAND, LAGOS
              </strong>
            </div>

            <div className="flex flex-col">
              <span className="text-[10px] uppercase text-slate-400 tracking-[3px] mb-1">Schedule</span>
              <strong className="text-white tracking-wider text-sm">OCTOBER 2026</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
