import React from 'react';
import { ShieldCheck, Trees, Flame, HeartHandshake } from 'lucide-react';

export const OurStory: React.FC = () => {
  return (
    <section id="story" className="py-20 bg-[#120e0b] border-y border-[#261e18] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Visual Column */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#382b21] shadow-2xl bg-[#17110d] group">
              <img
                src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1200&q=85"
                alt="Coorg coffee plantation in Western Ghats mist"
                referrerPolicy="no-referrer"
                className="w-full aspect-[4/3] object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0a08]/90 via-transparent to-transparent pointer-events-none" />

              {/* Bottom Quote inside Image */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#0f0c09]/85 backdrop-blur-md border border-[#2d221a] text-xs space-y-1">
                <p className="font-serif italic text-[#ded4c5]">
                  &ldquo;We didn&apos;t want commercial warehouse beans stale from months on shelves. We wanted beans so fresh you can smell the Kodagu rainforest in every cup.&rdquo;
                </p>
                <div className="text-[11px] font-bold text-[#e0a96d] uppercase tracking-wider">
                  â Mir Salim, Founder of Twelve Coffee
                </div>
              </div>
            </div>

            {/* Corner Decorative Badge */}
            <div className="hidden sm:flex absolute -bottom-5 -right-5 bg-[#183f25] border-2 border-[#2c6c3f] p-4 rounded-xl shadow-xl text-center flex-col items-center justify-center">
              <span className="text-2xl font-black font-mono text-[#f7f5ee]">100%</span>
              <span className="text-[10px] uppercase font-bold text-[#bde0c6] tracking-wider">
                Direct Origin
              </span>
            </div>
          </div>

          {/* Narrative Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#e0a96d] uppercase">
              <span>Our Heritage & Mission</span>
              <span className="text-[#69584b]" aria-hidden="true">Â·</span>
              <span>Coorg to Srinagar</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#f7f5ee] tracking-tight font-['Outfit']" style={{ textWrap: 'balance' }}>
              From the Hills of Coorg to the Heart of Srinagar.
            </h2>

            <p className="text-sm sm:text-base text-[#b8aba0] leading-relaxed">
              At Twelve Coffee, coffee isnât just a quick caffeine rush â itâs a craft, a daily ritual, and an authentic bridge between two extraordinary landscapes.
            </p>

            <p className="text-sm sm:text-base text-[#b8aba0] leading-relaxed">
              Founded by Mir Salim in Srinagar, Twelve was built on one uncompromising promise: <strong className="text-[#f7f5ee]">100% Original, Direct from Coorg â Taste Authentic Coffee, Guaranteed.</strong> While most cafes serve commercial commodity blends, we partner directly with heritage shade-grown plantations nestled in the mist of Karnatakaâs Western Ghats.
            </p>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#292019]">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#1a1410] border border-[#33271f] text-[#2f7a47] shrink-0 mt-0.5">
                  <Trees className="w-4 h-4 text-[#48a867]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#f7f5ee]">
                    Shade-Grown Canopy
                  </h4>
                  <p className="text-xs text-[#9c8e7e] mt-0.5">
                    Slow-ripened under silver oak, wild jackfruit, and pepper vines for intense sweetness.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#1a1410] border border-[#33271f] text-[#e0a96d] shrink-0 mt-0.5">
                  <HeartHandshake className="w-4 h-4 text-[#e0a96d]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#f7f5ee]">
                    Direct Ethical Trade
                  </h4>
                  <p className="text-xs text-[#9c8e7e] mt-0.5">
                    Direct relationships with Kodagu estate growers, eliminating middlemen entirely.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#1a1410] border border-[#33271f] text-[#e0a96d] shrink-0 mt-0.5">
                  <Flame className="w-4 h-4 text-[#e0a96d]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#f7f5ee]">
                    Weekly Micro-Roasts
                  </h4>
                  <p className="text-xs text-[#9c8e7e] mt-0.5">
                    Fresh batches roasted right here in Srinagar to ensure optimal degassing and peak aromatics.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#1a1410] border border-[#33271f] text-[#2f7a47] shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4 text-[#48a867]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#f7f5ee]">
                    Authenticity Guarantee
                  </h4>
                  <p className="text-xs text-[#9c8e7e] mt-0.5">
                    Zero artificial syrups, zero chicory adulteration, pure 100% specialty Arabica.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
