import { MapPin, Navigation, Calendar } from "lucide-react";

export default function Venue() {
  return (
    <section id="venue" className="py-24 bg-slate-50 dark:bg-[#050a11] relative overflow-hidden transition-colors duration-300">
      {/* Background Text Watermark */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 text-[15vw] font-black text-slate-200/40 dark:text-white/5 whitespace-nowrap select-none pointer-events-none lowercase leading-none z-0">
        venue
      </div>

      <div className="container px-6 mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
            <span className="text-primary font-semibold tracking-widest text-sm uppercase mb-2 block">#AfricaGRCSummit2026</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-foreground dark:text-white leading-tight">
                Directions to the event venue
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full mt-6" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 rounded-2xl overflow-hidden shadow-2xl max-w-6xl mx-auto border border-primary/10 relative">
          
          {/* Info Card */}
          <div className="lg:col-span-1 bg-[#0f172a] p-10 flex flex-col justify-center relative z-20 overflow-hidden">
            {/* Background Image with Overlay */}
            <div 
              className="absolute inset-0 z-0 opacity-40 bg-cover bg-center"
              style={{ backgroundImage: `url('https://app-ei-live.ams3.cdn.digitaloceanspaces.com/property/images/2021/05/d2663a1f2aab19912a461cc60479e82d.jpg')` }}
            ></div>
            <div className="absolute inset-0 bg-[#0f172a]/80 z-1"></div>

            {/* Sharp Arrow Notch */}
            <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-0 h-0 border-t-[15px] border-t-transparent border-b-[15px] border-b-transparent border-l-[15px] border-l-[#0f172a] z-30"></div>

            <div className="relative z-10 space-y-12">
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white uppercase tracking-wider">Location</h3>
                    <p className="text-slate-200 text-lg leading-relaxed">
                        Civic Centre, <br />
                        Victoria Island, <br />
                        Lagos, Nigeria
                    </p>
                </div>

                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white uppercase tracking-wider">Address</h3>
                    <div className="flex items-center space-x-2">
                        <MapPin className="text-primary" size={18} />
                        <a href="https://maps.app.goo.gl/..." target="_blank" className="text-primary font-bold text-lg hover:text-white transition-colors flex items-center group">
                            Get Directions...
                            <Navigation className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </a>
                    </div>
                </div>
            </div>
          </div>
          
          {/* Map Container */}
          <div className="lg:col-span-2 h-[500px] lg:min-h-[500px] bg-slate-200 relative z-10 transition-all duration-700">
            <iframe 
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.729780005574!2d3.406987175147551!3d6.428751524302636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8ad789178ad9%3A0x673415c48b242e85!2sThe%20Civic%20Center!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng"
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
