import React, { useState } from 'react';
import { Sparkles, Check, ArrowRight } from 'lucide-react';
import { getFlavorRecommendation, FlavorPreference } from '../utils/cartCalculations.ts';

interface FlavorFinderProps {
  onSelectCoffee: (coffeeId: string) => void;
}

export const FlavorFinder: React.FC<FlavorFinderProps> = ({ onSelectCoffee }) => {
  const [pref, setPref] = useState<FlavorPreference>({
    temp: 'hot',
    strength: 'balanced',
    flavor: 'chocolate_nutty',
  });

  const recommendation = getFlavorRecommendation(pref);

  return (
    <section id="flavor-finder" className="py-20 bg-[#120e0b] border-t border-[#261d17]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#17110d] via-[#1a1410] to-[#120e0b] border border-[#3b2d22] rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden">
          {/* Ambient lighting */}
          <div
            className="absolute top-0 right-0 w-80 h-80 bg-[#e0a96d]/10 rounded-full blur-[100px] pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-[#e0a96d] uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#e0a96d]" />
                <span>Interactive Barista Matcher</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#f7f5ee] font-['Outfit']">
                Find Your Perfect Cup
              </h2>
              <p className="text-xs sm:text-sm text-[#a89b8c]">
                Tell us how you like your coffee right now, and our calibrated Coorg roast algorithm will match your ideal signature brew.
              </p>
            </div>

            {/* Questions selectors */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              {/* Question 1: Temperature */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-[#d9cebe] block">
                  1. Temperature Preference
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setPref({ ...pref, temp: 'hot' })}
                    className={`py-3 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                      pref.temp === 'hot'
                        ? 'bg-[#183f25] border-[#2b683e] text-[#f7f5ee] shadow'
                        : 'bg-[#140e0b] border-[#2b211a] text-[#9c8e7e] hover:text-[#f7f5ee]'
                    }`}
                  >
                    <span>☕ Hot & Cozy</span>
                  </button>
                  <button
                    onClick={() => setPref({ ...pref, temp: 'iced' })}
                    className={`py-3 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                      pref.temp === 'iced'
                        ? 'bg-[#183f25] border-[#2b683e] text-[#f7f5ee] shadow'
                        : 'bg-[#140e0b] border-[#2b211a] text-[#9c8e7e] hover:text-[#f7f5ee]'
                    }`}
                  >
                    <span>🧊 Iced & Chilled</span>
                  </button>
                </div>
              </div>

              {/* Question 2: Strength */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-[#d9cebe] block">
                  2. Intensity & Strength
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['mild', 'balanced', 'bold'] as const).map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setPref({ ...pref, strength: lvl })}
                      className={`py-3 px-2 rounded-xl border text-[11px] font-semibold capitalize transition-all ${
                        pref.strength === lvl
                          ? 'bg-[#183f25] border-[#2b683e] text-[#f7f5ee] shadow'
                          : 'bg-[#140e0b] border-[#2b211a] text-[#9c8e7e] hover:text-[#f7f5ee]'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 3: Flavor profile */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-[#d9cebe] block">
                  3. Flavor Profile
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setPref({ ...pref, flavor: 'chocolate_nutty' })}
                    className={`py-2 px-2.5 rounded-xl border text-[11px] font-semibold transition-all ${
                      pref.flavor === 'chocolate_nutty'
                        ? 'bg-[#183f25] border-[#2b683e] text-[#f7f5ee]'
                        : 'bg-[#140e0b] border-[#2b211a] text-[#9c8e7e] hover:text-[#f7f5ee]'
                    }`}
                  >
                    🍫 Chocolate & Nutty
                  </button>
                  <button
                    onClick={() => setPref({ ...pref, flavor: 'sweet_creamy' })}
                    className={`py-2 px-2.5 rounded-xl border text-[11px] font-semibold transition-all ${
                      pref.flavor === 'sweet_creamy'
                        ? 'bg-[#183f25] border-[#2b683e] text-[#f7f5ee]'
                        : 'bg-[#140e0b] border-[#2b211a] text-[#9c8e7e] hover:text-[#f7f5ee]'
                    }`}
                  >
                    🍯 Sweet & Velvety
                  </button>
                  <button
                    onClick={() => setPref({ ...pref, flavor: 'fruity_floral' })}
                    className={`py-2 px-2.5 rounded-xl border text-[11px] font-semibold transition-all ${
                      pref.flavor === 'fruity_floral'
                        ? 'bg-[#183f25] border-[#2b683e] text-[#f7f5ee]'
                        : 'bg-[#140e0b] border-[#2b211a] text-[#9c8e7e] hover:text-[#f7f5ee]'
                    }`}
                  >
                    🍊 Citrus & Floral
                  </button>
                  <button
                    onClick={() => setPref({ ...pref, flavor: 'pure_black' })}
                    className={`py-2 px-2.5 rounded-xl border text-[11px] font-semibold transition-all ${
                      pref.flavor === 'pure_black'
                        ? 'bg-[#183f25] border-[#2b683e] text-[#f7f5ee]'
                        : 'bg-[#140e0b] border-[#2b211a] text-[#9c8e7e] hover:text-[#f7f5ee]'
                    }`}
                  >
                    ☕ Pure Black Clarity
                  </button>
                </div>
              </div>
            </div>

            {/* Recommendation Result Card */}
            <div className="mt-8 bg-[#100c09] border border-[#3b2d21] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
              <div className="space-y-2 text-center sm:text-left">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#e0a96d] uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-[#52b774]" />
                  <span>Matched Brew · {recommendation.roast}</span>
                </div>
                <h3 className="text-2xl font-extrabold text-[#f7f5ee] font-['Outfit']">
                  {recommendation.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#b0a294] max-w-xl">
                  {recommendation.tagline}
                </p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2">
                  {recommendation.notes.map((note) => (
                    <span
                      key={note}
                      className="text-xs text-[#d9cebe] bg-[#1a1410] border border-[#33271e] px-2.5 py-0.5 rounded-md flex items-center gap-1"
                    >
                      <Check className="w-3 h-3 text-[#2f7a47]" />
                      <span>{note}</span>
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onSelectCoffee(recommendation.id)}
                className="px-6 py-3.5 bg-[#e0a96d] hover:bg-[#ecc089] text-[#0d0a08] font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center gap-2 whitespace-nowrap shrink-0 group active:scale-95"
              >
                <span>Order This Cup</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
