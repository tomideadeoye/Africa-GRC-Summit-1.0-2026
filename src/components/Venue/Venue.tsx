"use client";

import { useState, useEffect } from "react";
import { Loader2, MapPin, Navigation, Calendar } from "lucide-react";
import { FadeIn } from "../ui/FadeIn";

export default function Venue() {
  const [venueData, setVenueData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const res = await fetch('/api/admin/config');
        const data = await res.json();
        if (data.venue) {
          setVenueData(data.venue);
        }
      } catch (error) {
        console.error('Failed to fetch venue data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchVenue();
  }, []);

  if (loading) {
    return (
      <div className="py-24 bg-[var(--brand-navy)] flex items-center justify-center">
        <Loader2 className="animate-spin text-[var(--brand-gold)]" size={32} />
      </div>
    );
  }

  // Fallback if no data
  const venue = venueData || {
    name: "Sheraton Lagos Hotel",
    address: "30 Mobolaji Bank Anthony Way, Ikeja, Lagos, Nigeria",
    mapEmbedUrl: "https://maps.google.com/maps?q=Sheraton+Lagos+Hotel,+Ikeja,+Lagos&t=&z=15&ie=UTF8&iwloc=&output=embed",
    backgroundImage: "https://app-ei-live.ams3.cdn.digitaloceanspaces.com/property/images/2021/05/d2663a1f2aab19912a461cc60479e82d.jpg"
  };

  return (
    <section id="venue" className="py-32 bg-white relative overflow-hidden">
      {/* Background Text Watermark */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 text-[15vw] font-black text-slate-900 opacity-[0.03] whitespace-nowrap select-none pointer-events-none lowercase leading-none z-0">
        venue
      </div>

      <div className="container px-6 mx-auto relative z-10">
        <FadeIn className="text-center mb-16">
            <span className="text-[var(--brand-gold)] font-black tracking-[0.3em] text-[10px] uppercase mb-2 block">#AfricaGRCSummit2026</span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight uppercase tracking-tighter">
                Directions to the summit venue
            </h2>
            <div className="w-24 h-1 bg-[var(--brand-gold)] mx-auto rounded-full mt-6" />
        </FadeIn>
        
        <FadeIn delay={0.2} className="grid grid-cols-1 lg:grid-cols-3 overflow-hidden shadow-2xl max-w-6xl mx-auto border border-slate-200 relative bg-white rounded-sm">
          
          {/* Info Card */}
          <div className="lg:col-span-1 bg-[var(--brand-navy)] p-10 flex flex-col justify-center relative z-20 overflow-hidden border-r border-white/10">
            {/* Background Image with Overlay */}
            <div 
              className="absolute inset-0 z-0 opacity-30 bg-cover bg-center"
              style={{ backgroundImage: `url('${venue.backgroundImage}')` }}
            ></div>
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-[var(--brand-navy)]/78 via-[var(--brand-navy)]/88 to-[var(--brand-navy)]/96"></div>
            <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_top_left,rgba(255,208,126,0.10),transparent_55%)]"></div>
 
            <div className="relative z-20 space-y-12">
                <div className="space-y-4">
                    <h3 className="text-[10px] font-black text-[var(--brand-gold)] uppercase tracking-[0.3em]">Location</h3>
                    <p className="text-white text-xl font-black uppercase tracking-tighter leading-tight">
                        {venue.name}, <br />
                        {venue.address}
                    </p>
                </div>
 
                <div className="space-y-4">
                    <h3 className="text-[10px] font-black text-[var(--brand-gold)] uppercase tracking-[0.3em]">Direct Access</h3>
                    <div className="flex items-center space-x-2">
                        <MapPin className="text-[var(--brand-gold)]" size={14} />
                        <a 
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.name + ' ' + venue.address)}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-white/90 font-black text-sm hover:text-[var(--brand-gold)] transition-colors flex items-center group uppercase tracking-widest"
                        >
                            Get Directions
                            <Navigation className="ml-2 h-3 w-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </a>
                    </div>
                </div>
            </div>
          </div>
          
          {/* Map Container */}
          <div className="lg:col-span-2 h-[500px] lg:min-h-[500px] bg-slate-100 relative z-10 transition-all duration-700">
            <iframe 
               src={venue.mapEmbedUrl}
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
