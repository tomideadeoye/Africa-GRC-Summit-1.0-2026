"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Attendance', href: '#attendance' },
  { label: 'Partners', href: '#partners' },
  { label: 'Agenda', href: '#programme' },
  { label: 'Venue', href: '#venue' }
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 z-50 flex items-center bg-[var(--brand-navy)]/80 backdrop-blur-xl border-b border-white/5 shadow-2xl transition-all duration-300">
      {/* Subtle Top-Light Highlight */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="container px-8 mx-auto flex justify-between items-center w-full">
        {/* Brand mark */}
        <a href="/" className="flex items-center group h-16">
          <img
            src="/branding/logo-main.png"
            alt="Africa GRC Summit 1.0"
            className="h-10 md:h-12 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="relative py-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/60 hover:text-white transition-all group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--brand-gold)] transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          {/* COMMENTED OUT - Pending client approval
          <a
            href="/register"
            className="glow-btn px-7 py-2 text-[10px] rounded-sm flex items-center gap-2"
          >
            Access Gateway
          </a>
          */}
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
        <div className="absolute top-20 left-0 right-0 bg-[var(--brand-navy)]/98 backdrop-blur-xl md:hidden animate-fade-in border-b" style={{ borderColor: 'var(--glass-border)' }}>
          <div className="container px-6 py-6 flex flex-col gap-4">
            {navItems.map((item) => (
              <a 
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-base font-bold uppercase tracking-widest py-3 transition-all hover:text-[var(--brand-gold)]"
                style={{ color: 'rgba(255,255,255,0.9)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
              >
                {item.label}
              </a>
            ))}
            {/* COMMENTED OUT - Pending client approval
            <div className="flex items-center justify-end pt-4">
              <a
                href="/register"
                className="glow-btn px-8 py-2.5 w-full text-center"
                onClick={() => setMobileOpen(false)}
              >
                Registration
              </a>
            </div>
            */}
          </div>
        </div>
      )}
    </nav>
  );
}
