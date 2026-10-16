import React from 'react';
import { ArrowRight, Star, Coffee, Sparkles, CheckCircle2 } from 'lucide-react';
import { COFFEE_MENU } from '../data/coffeeData.ts';

interface HeroProps {
  onExploreMenu: () => void;
  onOpenFinder: () => void;
  onQuickAdd: (itemId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreMenu,
  onOpenFinder,
  onQuickAdd,
}) => {
  const featuredQuickItems = COFFEE_MENU.slice(0, 3);

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden bg-gradient-to-b from-[#0d0a08] via-[#140e0b] to-[#0d0a08] pt-8 pb-16 lg:py-20 border-b border-[#241c17]">
      {/* Subtle background ambient glows */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#d49b55]/10 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-[#1a4a28]/15 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Brand Statement & Hierarchy */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Unboxed natural kicker */}
            <div className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold tracking-wider text-[#e0a96d] uppercase">
              <span className="w-2 h-2 rounded-full bg-[#e0a96d]" aria-hidden="true" />
              <span>Direct from Coorg</span>
              <span className="text-[#68584c]" aria-hidden="true">·</span>
              <span>Crafted in Srinagar</span>
              <span className="text-[#68584c]" aria-hidden="true">·</span>
              <span>100% Authentic Arabica</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#f7f5ee] tracking-tight leading-[1.08] max-w-2xl mx-auto lg:mx-0 font-['Outfit']" style={{ textWrap: 'balance' }}>
              Awaken Your Senses With Every Sip.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#b8ab9a] max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
              100% Original, single-estate beans sourced directly from the shaded hills of Coorg and micro-roasted for the valley of Srinagar. Experience artisanal clarity, authentic body, and uncompromised craft.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onExploreMenu}
                className="px-6 py-3.5 text-sm font-bold text-[#0d0a08] bg-[#e0a96d] hover:bg-[#ecc089] rounded-xl shadow-lg transition-all flex items-center gap-2 group active:scale-95"
              >
                <span>Explore Signature Coffees</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenFinder}
                className="px-5 py-3.5 text-sm font-semibold text-[#f7f5ee] bg-[#1a1410] hover:bg-[#251d18] border border-[#382d24] rounded-xl transition-all flex items-center gap-2 active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-[#e0a96d]" />
                <span>Find Your Roast</span>
              </button>
            </div>

            {/* Social Proof Row */}
            <div className="pt-4 border-t border-[#261f1a]/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-[#a69989]">
              <div className="flex items-center gap-1.5">
                <div className="flex text-[#e0a96d]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#e0a96d]" />
                  ))}
                </div>
                <span className="font-bold text-[#f7f5ee] ml-1">4.9 / 5.0</span>
                <span>(300+ reviews)</span>
              </div>
              <span className="hidden sm:inline text-[#473b32]" aria-hidden="true">·</span>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#2f7a47]" />
                <span>Fresh Small Batches</span>
              </div>
              <span className="hidden sm:inline text-[#473b32]" aria-hidden="true">·</span>
              <div className="flex items-center gap-1.5">
                <Coffee className="w-4 h-4 text-[#e0a96d]" />
                <span>Specialty Grade &gt; 84pts</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual with Splash & Floating Quick Picks */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md lg:max-w-none">
              {/* Main Cinematic Splash Showcase */}
              <div className="relative rounded-2xl overflow-hidden border border-[#3b2f26] shadow-2xl bg-[#140e0b] group">
                <img
                  src="/src/assets/images/hero_twelve_coffee_1792147635380.jpg"
                  alt="Twelve Coffee signature splash with floating roasted beans"
                  referrerPolicy="no-referrer"
                  className="w-full aspect-[4/3] object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0a08] via-transparent to-black/20 pointer-events-none" />

                {/* Floating emblem tag on hero */}
                <div className="absolute top-4 left-4 bg-[#183f25]/90 backdrop-blur-md border border-[#2b683e] text-[#f7f5ee] px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-[#52b774]" />
                  <span>Direct Single Estate Coorg</span>
                </div>
              </div>

              {/* Floating Quick Selector Bar below hero card */}
              <div className="mt-4 grid grid-cols-3 gap-2.5">
                {featuredQuickItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onQuickAdd(item.id)}
                    className="p-2.5 rounded-xl bg-[#17110d]/90 hover:bg-[#231b15] border border-[#33271f] hover:border-[#e0a96d]/40 transition-all text-left flex flex-col justify-between group"
                  >
                    <div>
                      <div className="text-[10px] text-[#e0a96d] font-semibold truncate uppercase">
                        {item.category}
                      </div>
                      <div className="text-xs font-bold text-[#f7f5ee] group-hover:text-[#e0a96d] transition-colors truncate">
                        {item.name}
                      </div>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-xs">
                      <span className="font-mono text-[#e0a96d] font-semibold">₹{item.price}</span>
                      <span className="text-[10px] text-[#9c8e7e] group-hover:text-white transition-colors">
                        + Add
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
