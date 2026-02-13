"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = ['About', 'Audience', 'Partners', 'Venue'];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 h-20 z-50 flex items-center bg-black/90 backdrop-blur-md" style={{ borderBottom: '1px solid rgba(212,175,55,0.2)' }}>
      <div className="container flex justify-between items-center w-full px-6 mx-auto">
        <div className="text-lg md:text-xl font-extrabold tracking-widest" style={{ color: '#d4af37' }}>
          AFRICA <span className="font-black" style={{ color: '#ffffff' }}>GRC SUMMIT</span> 2026
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`} 
              className="text-sm font-medium transition-all hover:drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]"
              style={{ color: 'rgba(255,255,255,0.9)' }}
            >
              {item}
            </a>
          ))}
          <a 
            href="#register"
            className="font-bold text-sm px-6 py-2 rounded-lg shadow-lg hover:shadow-[0_6px_30px_rgba(212,175,55,0.5)] hover:-translate-y-0.5 transition-all uppercase tracking-wide"
            style={{ backgroundColor: '#d4af37', color: '#ffffff' }}
          >
            Registration
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button 
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          style={{ color: '#ffffff' }}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="absolute top-20 left-0 right-0 bg-black/95 backdrop-blur-xl md:hidden animate-fade-in" style={{ borderBottom: '1px solid rgba(212,175,55,0.2)' }}>
          <div className="container px-6 py-6 flex flex-col gap-4">
            {navItems.map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMobileOpen(false)}
                className="text-base font-medium py-3 transition-all hover:pl-2"
                style={{ color: 'rgba(255,255,255,0.9)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
              >
                {item}
              </a>
            ))}
            <div className="flex items-center justify-end pt-4">
              <a 
                href="#register"
                className="font-bold text-sm px-6 py-2 rounded-lg shadow-lg uppercase tracking-wide"
                onClick={() => setMobileOpen(false)}
                style={{ backgroundColor: '#d4af37', color: '#ffffff' }}
              >
                Registration
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
