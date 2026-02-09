"use client";

import { useState } from "react";

const scheduleData = [
  {
    day: "Day 1",
    date: "Thursday, 27th November 2025",
    sessions: [
        { time: "07:30 - 09:00", title: "Registration / Breakfast / Networking", type: "break" },
        { time: "09:00 - 09:05", title: "Welcome Address", speaker: "Chief Bolaji Ayorinde, OFR, SAN, FCArb" },
        { time: "09:05 - 09:10", title: "Opening Remarks", speaker: "Professor Fabian Ajogwu, OFR, SAN, FCArb" },
        { time: "09:50 - 10:00", title: "Keynote Address: UNCITRAL Perspective", speaker: "Anna Joubin-Bret (Secretary General, UNCITRAL)" },
        { time: "10:00 - 10:15", title: "Keynote Address: Transformation of Justice Sector", speaker: "Chief Lateef Olasunkanmi Fagbemi SAN (Attorney General of the Federation)" },
        { time: "10:30 - 12:00", title: "Plenary 1: Strengthening Institutional Arbitration and ADR in Africa", panelists: ["Hon. Justice Aisha Mohammed Usman", "Prof. Bankole Sodipo, SAN", "James Clanchy"], moderator: "Prof. Ike Ehiribe", type: "plenary" },
        { time: "12:00 - 13:30", title: "Plenary 2: Disputes in Energy, Oil & Gas Sectors", panelists: ["Prof. Yinka Omorogbe, SAN", "Engr. Dr. Felicia Agubata", "Dr. Joseph Tolorunse"], moderator: "Dr. Erimma Gloria Orie", type: "plenary" },
        { time: "14:30 - 16:00", title: "Plenary 3: Construction & Infrastructure Disputes", panelists: ["Ahmed Abdel Hakam", "Kola Awodein, SAN", "Virginie Colaiuta"], moderator: "Winnifred Olanipekun", type: "plenary" },
        { time: "16:00 - 17:30", title: "Plenary 4: Banking, Finance & Fintech Disputes", panelists: ["Nosakhare Aguebor (AFC)", "Adekunle Olaofe (Flutterwave)", "Jackwell Feris"], moderator: "Taiwo Ogbara", type: "plenary" },
        { time: "17:30 - 19:30", title: "Welcome Reception", type: "social" }
    ]
  },
  {
    day: "Day 2",
    date: "Friday, 28th November 2025",
    sessions: [
        { time: "07:30 - 08:45", title: "Early Riser: Young NICArb Session", description: "The Role of Young Arbitrators in Promoting ADR Awareness", type: "workshop" },
        { time: "09:00 - 09:15", title: "Keynote Address (African Series)", speaker: "Hon. Dorcas Orduor (Attorney-General, Kenya)" },
        { time: "09:15 - 10:45", title: "Plenary 5: Institutional Mediation & Collaboration", panelists: ["Tat Lim (Chair, IMI)", "Cai Weiping", "Oladimeji Ojo (World Bank)"], moderator: "Prof. Steve Abayomi Bank-Ola", type: "plenary" },
        { time: "10:45 - 12:15", title: "Plenary 6: Arbitration and the Courts", panelists: ["Hon. Justice Jumoke Pedro", "Hon. Justice François Xavier Mbono (OHADA)"], moderator: "Nze Atulomah", type: "plenary" },
        { time: "12:15 - 13:45", title: "Plenary 7: Ethics in Domestic & International Arbitration", panelists: ["Hon. Justice Hadiza Shagari", "Remi Gerbay", "Jonathan Barnes"], moderator: "Dr. Jude Theedeus Nnodum", type: "plenary" },
        { time: "15:00 - 16:00", title: "Annual General Meeting", type: "business" }
    ]
  }
];

export default function Programme() {
  const [activeDay, setActiveDay] = useState(0);

  return (
    <section id="programme" className="py-24 bg-white dark:bg-[#0f172a] relative overflow-hidden transition-colors duration-300">
       {/* Watermark Background */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full select-none pointer-events-none overflow-hidden flex justify-center items-center opacity-[0.03] dark:opacity-[0.05]">
        <span className="text-[15vw] font-black text-foreground dark:text-white leading-none whitespace-nowrap">
          agena
        </span>
      </div>
      {/* Correction: The reference says "agenda" but looks like "agenda" in watermark. I will use 'agenda'. */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full select-none pointer-events-none flex justify-center opacity-[0.04]">
         <span className="text-[12rem] md:text-[16rem] font-black text-slate-900 dark:text-white leading-none tracking-tighter">
            agenda
         </span>
      </div>

      <div className="container px-6 max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
           <span className="text-primary font-bold tracking-widest text-sm uppercase mb-3 block">#AfricaGRCSummit2026</span>
           <h2 className="text-4xl md:text-6xl font-extrabold mb-6 text-foreground dark:text-white tracking-tight">
            Preliminary Agenda 2026
          </h2>
          <p className="text-xl md:text-2xl font-bold text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Reimagining Integrated GRC, Strategy, and Performance
          </p>
          <p className="mt-6 text-muted-foreground dark:text-slate-400 max-w-4xl mx-auto text-lg leading-relaxed">
            Africa GRC Summit 2026 will enable attendees to reimagine integrated GRC, strategy and Performance ideas not just listening but engaging, interacting and addressing today&apos;s challenges.
          </p>
        </div>

        {/* Day Toggles - Rectangular Style */}
        <div className="flex justify-center mb-0">
            {scheduleData.map((day, idx) => (
                <button
                    key={idx}
                    onClick={() => setActiveDay(idx)}
                    className={`px-8 md:px-12 py-4 md:py-5 text-lg md:text-xl font-bold transition-all duration-300 border-2 ${
                        activeDay === idx 
                        ? "bg-[#0f172a] text-white border-[#0f172a] shadow-lg dark:bg-white dark:text-[#0f172a] dark:border-white" 
                        : "bg-white text-[#0f172a] border-[#0f172a] hover:bg-slate-50 dark:bg-[#0f172a] dark:text-white dark:border-white/20 dark:hover:bg-white/5"
                    }`}
                >
                    {day.day} Conference
                </button>
            ))}
        </div>

        {/* Agenda Table Layout */}
        <div className="bg-white dark:bg-transparent border-x border-b border-slate-200 dark:border-slate-800 shadow-sm">
            {/* Header for Day Content if needed, but tabs act as header. */}
             
            <div className="divide-y divide-slate-200 dark:divide-slate-800">
                {scheduleData[activeDay].sessions.map((session, sIdx) => (
                  <div 
                    key={sIdx} 
                    className={`flex flex-col md:flex-row p-6 md:p-8 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors ${
                        session.type === 'break' ? 'bg-slate-50/80 dark:bg-white/5' : ''
                    }`}
                  >
                        {/* Time Column */}
                        <div className="w-full md:w-64 flex-shrink-0 mb-4 md:mb-0">
                            <div className="flex items-center text-[#0f172a] dark:text-white font-bold text-xl md:text-2xl font-mono tracking-tighter">
                                {session.time}
                            </div>
                        </div>

                        {/* Content Column */}
                        <div className="flex-1">
                            <h4 className="text-xl md:text-2xl font-extrabold text-[#0f172a] dark:text-white mb-3 leading-snug">
                                {session.title}
                            </h4>
                            
                            {session.description && (
                                <p className="text-slate-600 dark:text-slate-400 mb-4 text-base italic">
                                    {session.description}
                                </p>
                            )}

                            {(session.speaker || session.moderator || session.panelists) && (
                                <div className="space-y-3 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                                    {session.speaker && (
                                        <div className="flex flex-col sm:flex-row sm:items-start gap-2 text-base">
                                            <span className="font-bold text-primary uppercase text-sm tracking-wider w-24 flex-shrink-0 pt-1">Speaker</span>
                                            <span className="text-slate-700 dark:text-slate-300 font-medium">{session.speaker}</span>
                                        </div>
                                    )}
                                    {session.moderator && (
                                        <div className="flex flex-col sm:flex-row sm:items-start gap-2 text-base">
                                            <span className="font-bold text-primary uppercase text-sm tracking-wider w-24 flex-shrink-0 pt-1">Moderator</span>
                                            <span className="text-slate-700 dark:text-slate-300 font-medium">{session.moderator}</span>
                                        </div>
                                    )}
                                    {session.panelists && (
                                        <div className="flex flex-col sm:flex-row sm:items-start gap-2 text-base">
                                            <span className="font-bold text-primary uppercase text-sm tracking-wider w-24 flex-shrink-0 pt-1">Panelists</span>
                                            <div className="flex flex-wrap gap-2">
                                                {session.panelists.map((p, i) => (
                                                    <span key={i} className="text-slate-700 dark:text-slate-300 font-medium">
                                                        {p}{i < session.panelists!.length - 1 ? "," : ""}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                             {session.type === 'plenary' && (
                                <div className="mt-4">
                                    <span className="inline-flex items-center text-xs font-bold text-primary uppercase tracking-widest border border-primary/30 px-3 py-1 rounded-sm">
                                        Plenary Session
                                    </span>
                                </div>
                             )}
                        </div>
                  </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
}
