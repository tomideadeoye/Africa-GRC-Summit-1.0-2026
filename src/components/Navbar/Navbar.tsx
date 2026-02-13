"use client";

import { useState } from "react";
import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navItems = ['About', 'Audience', 'Partners', 'Venue'];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 h-20 z-50 flex items-center border-b border-primary/20 bg-black/80 backdrop-blur-md transition-colors duration-300">
      <div className="container flex justify-between items-center w-full px-6 mx-auto">
        <div className="text-lg md:text-xl font-extrabold tracking-widest text-primary">
          AFRICA <span className="text-white font-black">GRC SUMMIT</span> 2026
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`} 
              className="text-sm font-medium text-white/90 transition-all hover:text-primary hover:drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]"
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

        {/* Mobile Hamburger */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="absolute top-20 left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-primary/20 md:hidden animate-fade-in">
          <div className="container px-6 py-6 flex flex-col gap-4">
            {navItems.map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMobileOpen(false)}
                className="text-base font-medium text-white/90 py-3 border-b border-white/5 transition-all hover:text-primary hover:pl-2"
              >
                {item}
              </a>
            ))}
            <div className="flex items-center justify-between pt-4">
              <ModeToggle />
              <Button 
                className="bg-primary text-primary-foreground font-bold text-sm px-6 py-2 rounded-lg shadow-lg uppercase tracking-wide"
                onClick={() => setMobileOpen(false)}
              >
                Registration
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
