import React, { useState } from 'react';
import { MapPin, Clock, Phone, Navigation, Instagram, CheckCircle2, Calendar } from 'lucide-react';
import { Logo } from './Logo.tsx';

interface VisitUsProps {
  onReserveSuccess?: () => void;
}

export const VisitUs: React.FC<VisitUsProps> = ({ onReserveSuccess }) => {
  const [reserved, setReserved] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    guests: '2 Guests',
    time: '6:30 PM',
    date: 'Today',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setReserved(true);
    if (onReserveSuccess) onReserveSuccess();
  };

  return (
    <section id="srinagar" className="py-20 bg-[#120e0b] border-t border-[#261e18] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Cafe Information & Google Maps Integration */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#e0a96d] uppercase">
              <MapPin className="w-3.5 h-3.5 text-[#2f7a47]" />
              <span>Srinagar Flagship Cafe</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#f7f5ee] font-['Outfit']">
              Visit Us in Srinagar.
            </h2>

            <p className="text-sm sm:text-base text-[#b8aba0] leading-relaxed">
              Step inside for freshly ground Coorg pour-overs, chilled cloud lattes, and warm hospitality. Located centrally in Srinagar with both indoor cozy seating and outdoor street-side brewing.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#17120e] border border-[#2b211a]">
                <MapPin className="w-5 h-5 text-[#2f7a47] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-[#f7f5ee] uppercase tracking-wider">
                    Location & Landmark
                  </div>
                  <div className="text-xs sm:text-sm text-[#b8aba0] mt-0.5">
                    12 Twelve Coffee, Main Market, Rajbagh / Boulevard Road, Srinagar, Jammu & Kashmir 190008
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#17120e] border border-[#2b211a]">
                <Clock className="w-5 h-5 text-[#e0a96d] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-[#f7f5ee] uppercase tracking-wider">
                    Brewing Hours
                  </div>
                  <div className="text-xs sm:text-sm text-[#b8aba0] mt-0.5">
                    Monday – Sunday: <strong className="text-[#f7f5ee]">8:00 AM – 11:00 PM</strong> (Open 7 Days)
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#17120e] border border-[#2b211a]">
                <Phone className="w-5 h-5 text-[#e0a96d] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-[#f7f5ee] uppercase tracking-wider">
                    Direct Phone & Queries
                  </div>
                  <div className="text-xs sm:text-sm text-[#b8aba0] mt-0.5">
                    +91 94190 12012 / Mir Salim
                  </div>
                </div>
              </div>
            </div>

            {/* External Links matching user screenshot link */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="https://maps.app.goo.gl/CwJyo9PEPUCHPfCb9?g_st=ic"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-[#183f25] hover:bg-[#205231] text-[#f7f5ee] text-xs font-bold flex items-center gap-2 shadow-lg transition-all"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions on Google Maps</span>
              </a>

              <a
                href="https://instagram.com/12twelvecoffee"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-[#1c1511] hover:bg-[#291f19] border border-[#382b21] text-[#f7f5ee] text-xs font-semibold flex items-center gap-2 transition-all"
              >
                <Instagram className="w-4 h-4 text-[#e0a96d]" />
                <span>@12twelvecoffee</span>
              </a>
            </div>
          </div>

          {/* Quick Table Reservation / Priority Counter Booking Form */}
          <div className="lg:col-span-6 bg-[#16100c] border border-[#33271e] rounded-3xl p-6 sm:p-8 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-[#2b2119] mb-6">
              <div className="flex items-center gap-3">
                <Logo size="sm" withText={false} />
                <div>
                  <h3 className="text-lg font-bold text-[#f7f5ee] font-['Outfit']">
                    Reserve a Table or Counter
                  </h3>
                  <p className="text-xs text-[#8c7d6e]">
                    Save a spot in advance for a relaxed brew session in Srinagar
                  </p>
                </div>
              </div>
            </div>

            {reserved ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#183f25] border border-[#2b683e] flex items-center justify-center mx-auto text-[#52b774]">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xl font-bold text-[#f7f5ee]">Table Reservation Requested!</h4>
                  <p className="text-xs text-[#b8aba0] max-w-sm mx-auto">
                    Thanks <strong className="text-white">{form.name}</strong>. We saved a table for {form.guests} at {form.time} ({form.date}). Our barista team looks forward to serving you!
                  </p>
                </div>
                <button
                  onClick={() => setReserved(false)}
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#241c16] hover:bg-[#33271f] text-[#d9cfc1]"
                >
                  Book Another Time
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#d9cfc1] block mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Salim or Zubair"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#110d0a] border border-[#2e231b] text-sm text-[#f7f5ee] focus:outline-none focus:border-[#e0a96d]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#d9cfc1] block mb-1">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#110d0a] border border-[#2e231b] text-sm text-[#f7f5ee] focus:outline-none focus:border-[#e0a96d]"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#d9cfc1] block mb-1">
                      Party Size
                    </label>
                    <select
                      value={form.guests}
                      onChange={(e) => setForm({ ...form, guests: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#110d0a] border border-[#2e231b] text-xs text-[#f7f5ee] focus:outline-none focus:border-[#e0a96d]"
                    >
                      <option>1 Person</option>
                      <option>2 Guests</option>
                      <option>3-4 Guests</option>
                      <option>5+ Large Group</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#d9cfc1] block mb-1">
                      Day
                    </label>
                    <select
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#110d0a] border border-[#2e231b] text-xs text-[#f7f5ee] focus:outline-none focus:border-[#e0a96d]"
                    >
                      <option>Today</option>
                      <option>Tomorrow</option>
                      <option>This Weekend</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#d9cfc1] block mb-1">
                      Time Slot
                    </label>
                    <select
                      value={form.time}
                      onChange={(e) => setForm({ ...form, time: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#110d0a] border border-[#2e231b] text-xs text-[#f7f5ee] focus:outline-none focus:border-[#e0a96d]"
                    >
                      <option>10:00 AM</option>
                      <option>1:00 PM</option>
                      <option>4:00 PM</option>
                      <option>6:30 PM</option>
                      <option>8:30 PM</option>
                      <option>9:30 PM</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-3 bg-[#e0a96d] hover:bg-[#ecc089] text-[#0d0a08] font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Confirm Table Reservation</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
