import { Linkedin, Twitter, Instagram, Mail, ArrowUpRight } from "lucide-react";
import { InteractiveGridPattern } from "../ui/interactive-grid-pattern";

export default function Footer() {
  return (
    <footer className="bg-[var(--brand-navy)] border-t border-white/5 pt-20 pb-10 transition-all duration-300 relative overflow-hidden">
      {/* Subtle Digital Infrastructure Background */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none overflow-hidden">
        <InteractiveGridPattern 
          width={60} 
          height={60} 
          squares={[40, 40]}
          className="[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]"
        />
      </div>
      <div className="container px-6 mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2">
            <img 
              src="/branding/logo-main.png" 
              alt="Africa GRC Summit 1.0" 
              className="h-10 md:h-12 w-auto object-contain mb-8 grayscale brightness-200"
            />
            <p className="text-white/60 mb-8 max-w-sm leading-relaxed text-[10px] font-black tracking-widest">
              The premier gathering for governance, risk, and compliance leaders shaping the future of African digital trust and institutional trust.
            </p>
            
            <div className="flex space-x-6">
               {[Linkedin, Twitter, Instagram].map((Icon, i) => (
                 <a 
                   key={i}
                   href="#" 
                   className="text-slate-500 hover:text-[var(--brand-gold)] transition-colors"
                 >
                   <Icon size={20} />
                 </a>
               ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-foreground dark:text-white font-bold mb-6 text-sm uppercase tracking-widest">Quick Links</h3>
            <ul className="space-y-4">
              <li><a href="#about" className="text-white/50 hover:text-[var(--brand-gold)] transition-colors">About Summit</a></li>
              <li><a href="#audience" className="text-white/50 hover:text-[var(--brand-gold)] transition-colors">Who Should Attend</a></li>
              <li><a href="#partners" className="text-white/50 hover:text-[var(--brand-gold)] transition-colors">Partners</a></li>
              <li><a href="#venue" className="text-white/50 hover:text-[var(--brand-gold)] transition-colors">Venue</a></li>
            </ul>
          </div>

          {/* Contact / Newsletter */}
          <div>
             <h3 className="text-foreground dark:text-white font-bold mb-6 text-sm uppercase tracking-widest">Contact Us</h3>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-white/50">
                    <Mail size={14} className="mr-2 text-[var(--brand-gold)]" />
                    <a href="mailto:info@africagrcsummit.com" className="hover:text-white transition-colors">info@africagrcsummit.com</a>
                </li>
              </ul>
              
              <a
                href="mailto:info@africagrcsummit.com?subject=Interest%20in%20Africa%20GRC%20Summit%202026&body=Hello%20Africa%20GRC%20Summit%20Team%2C%0A%0AI%20am%20interested%20in%20learning%20more%20about%20the%20event.%20Please%20share%20details%20on%20attendance%2C%20agenda%2C%20and%20participation.%0A%0AThank%20you."
                className="inline-flex items-center text-[var(--brand-gold)] font-black text-[10px] tracking-widest hover:text-white transition-colors group"
              >
                 Register Interest <ArrowUpRight size={14} className="ml-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
          </div>
        </div>

        {/* Bottom Bar - Centralized Branding */}
        <div className="pt-12 border-t border-white/5 flex flex-col items-center justify-center text-center">
          <p className="text-[10px] sm:text-xs font-black text-white/30 tracking-[0.3em] uppercase">
            &copy; 2026 Africa GRC Summit. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
