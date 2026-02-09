import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 h-20 z-50 flex items-center border-b border-primary/20 bg-background/70 backdrop-blur-md transition-colors duration-300">
      <div className="container flex justify-between items-center w-full px-6 mx-auto">
        <div className="text-xl font-extrabold tracking-widest text-primary">
          AFRICA <span className="text-foreground dark:text-white font-black">GRC SUMMIT</span> 2026
        </div>
        <div className="hidden md:flex items-center gap-8">
          {['Home', 'About', 'Venue', 'Speakers', 'Programme', 'Partners'].map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`} 
              className="text-sm font-medium text-foreground/80 dark:text-white/80 transition-all hover:text-primary hover:drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]"
            >
              {item}
            </a>
          ))}
          <ModeToggle />
          <Button 
            className="bg-primary text-primary-foreground font-bold text-sm px-6 py-2 rounded-lg shadow-lg hover:shadow-[0_6px_30px_rgba(212,175,55,0.5)] hover:-translate-y-0.5 transition-all uppercase tracking-wide"
          >
            Registration
          </Button>
        </div>
      </div>
    </nav>
  );
}
