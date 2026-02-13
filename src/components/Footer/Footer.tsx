import { Linkedin, Twitter, Instagram, Mail, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-100 dark:bg-[#050a11] border-t border-primary/10 pt-20 pb-10 transition-colors duration-300">
      <div className="container px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-extrabold text-foreground dark:text-white mb-6 tracking-tight">
              AFRICA <span className="text-primary">GRC</span> SUMMIT
            </h2>
            <p className="text-muted-foreground dark:text-slate-400 mb-8 max-w-sm leading-relaxed">
              The premier gathering for governance, risk, and compliance leaders shaping the future of African sovereignty and digital trust.
            </p>
            
            <div className="flex space-x-4">
               <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-[#1e293b] flex items-center justify-center text-muted-foreground dark:text-slate-400 hover:bg-primary hover:text-primary-foreground transition-all">
                  <Linkedin size={18} />
               </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-[#1e293b] flex items-center justify-center text-muted-foreground dark:text-slate-400 hover:bg-primary hover:text-primary-foreground transition-all">
                  <Twitter size={18} />
               </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-[#1e293b] flex items-center justify-center text-muted-foreground dark:text-slate-400 hover:bg-primary hover:text-primary-foreground transition-all">
                  <Instagram size={18} />
               </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-foreground dark:text-white font-bold mb-6 text-sm uppercase tracking-widest">Quick Links</h3>
            <ul className="space-y-4">
              <li><a href="#about" className="text-muted-foreground dark:text-slate-400 hover:text-primary transition-colors">About Summit</a></li>
              <li><a href="#audience" className="text-muted-foreground dark:text-slate-400 hover:text-primary transition-colors">Who Should Attend</a></li>
              <li><a href="#partners" className="text-muted-foreground dark:text-slate-400 hover:text-primary transition-colors">Partners</a></li>
              <li><a href="#venue" className="text-muted-foreground dark:text-slate-400 hover:text-primary transition-colors">Venue</a></li>
            </ul>
          </div>

          {/* Contact / Newsletter */}
          <div>
             <h3 className="text-foreground dark:text-white font-bold mb-6 text-sm uppercase tracking-widest">Contact Us</h3>
             <ul className="space-y-4 mb-8">
                <li className="flex items-center text-muted-foreground dark:text-slate-400">
                    <Mail size={16} className="mr-2 text-primary" />
                    <a href="mailto:info@africagrcsummit.com" className="hover:text-foreground dark:hover:text-white transition-colors">info@africagrcsummit.com</a>
                </li>
             </ul>
             
             <a href="#register" className="inline-flex items-center text-primary font-bold hover:text-foreground dark:hover:text-white transition-colors group">
                Register Interest <ArrowUpRight size={16} className="ml-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
             </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>&copy; 2026 Africa GRC Summit. All Sovereign Rights Reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Code of Conduct</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
