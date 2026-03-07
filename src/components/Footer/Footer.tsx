import { Linkedin, Twitter, Instagram, Mail, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[var(--brand-navy)] border-t border-white/5 pt-20 pb-10 transition-all duration-300">
      <div className="container px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2">
            <img 
              src="/branding/logo-main.png" 
              alt="Africa GRC Summit 1.0" 
              className="h-10 md:h-12 w-auto object-contain mb-8 grayscale brightness-200"
            />
            <p className="text-white/60 mb-8 max-w-sm leading-relaxed text-[10px] font-black uppercase tracking-widest">
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
                className="inline-flex items-center text-[var(--brand-gold)] font-black text-[10px] uppercase tracking-widest hover:text-white transition-colors group"
              >
                 Register Interest <ArrowUpRight size={14} className="ml-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>&copy; 2026 Africa GRC Summit. All Rights Reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-[var(--brand-gold)] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[var(--brand-gold)] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[var(--brand-gold)] transition-colors">Code of Conduct</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
