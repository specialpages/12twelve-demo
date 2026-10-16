import React from 'react';
import { Instagram, Star, Quote, ArrowUpRight, Heart, Users } from 'lucide-react';
import { REVIEWS } from '../data/coffeeData.ts';

export const VibeAndReviews: React.FC = () => {
  return (
    <section className="py-20 bg-[#0d0a08] border-t border-[#261e18]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#e0a96d] uppercase">
              <Users className="w-3.5 h-3.5 text-[#e0a96d]" />
              <span>Srinagar Coffee Culture · @12twelvecoffee</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#f7f5ee] font-['Outfit']">
              The Vibe at Twelve.
            </h2>
            <p className="text-sm sm:text-base text-[#a89b8c]">
              More than a coffee shop — a haven for good music, street aesthetics, friendly faces, and coffee connoisseurs traveling from across India to Srinagar.
            </p>
          </div>

          <a
            href="https://instagram.com/12twelvecoffee"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#17120e] hover:bg-[#251d17] border border-[#382b21] text-xs font-semibold text-[#f7f5ee] transition-all hover:border-[#e0a96d]/50 shrink-0 self-start md:self-auto"
          >
            <Instagram className="w-4 h-4 text-[#e0a96d]" />
            <span>Follow on Instagram</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#8c7d6e]" />
          </a>
        </div>

        {/* Cafe Visual Atmosphere Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          <div className="md:col-span-8 rounded-3xl overflow-hidden border border-[#33271e] bg-[#140e0b] relative group min-h-[340px]">
            <img
              src="/src/assets/images/cafe_interior_vibe_1792147639196.jpg"
              alt="Twelve Coffee cafe interior in Srinagar with warm ambient lights"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0a08]/90 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono tracking-widest text-[#e0a96d] uppercase">
                  Specialty Bar & Roastery
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#f7f5ee]">
                  Crafted for Conversations & Comfort
                </h3>
                <p className="text-xs text-[#c4b6a4] max-w-md">
                  Warm wood, forest green trims, custom bear street murals, and the rhythmic pull of manual espresso in Srinagar.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-medium text-[#f7f5ee] bg-[#1a1410]/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#382a20] shrink-0 self-start sm:self-auto">
                <Heart className="w-3.5 h-3.5 text-[#e0a96d] fill-[#e0a96d]" />
                <span>Valley’s Favorite Hub</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col gap-6">
            <div className="rounded-2xl overflow-hidden border border-[#33271e] bg-[#140e0b] relative group flex-1 min-h-[160px]">
              <img
                src="/src/assets/images/iced_espresso_brew_1792147636903.jpg"
                alt="Iced Spanish latte with paper straw"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0a08]/85 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="text-[10px] font-semibold text-[#e0a96d] uppercase">Most Ordered</div>
                <div className="text-sm font-bold text-[#f7f5ee]">Iced Spanish Cloud Latte</div>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-[#33271e] bg-[#140e0b] relative group flex-1 min-h-[160px]">
              <img
                src="/src/assets/images/signature_latte_art_1792147636504.jpg"
                alt="Velvet latte in green ceramic mug"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0a08]/85 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="text-[10px] font-semibold text-[#e0a96d] uppercase">Morning Pick</div>
                <div className="text-sm font-bold text-[#f7f5ee]">Twelve Velvet Cappuccino</div>
              </div>
            </div>
          </div>
        </div>

        {/* Authentic Customer Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-[#140e0b] border border-[#2b211a] rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:border-[#e0a96d]/40 transition-colors shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-[#e0a96d]">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#e0a96d]" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-[#423327]" />
                </div>

                <p className="text-xs sm:text-sm text-[#b8aba0] leading-relaxed italic">
                  &ldquo;{review.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-[#241c16] flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#f7f5ee]">{review.name}</div>
                  <div className="text-[11px] text-[#8c7e70]">{review.location}</div>
                </div>
                <div className="text-[10px] font-mono text-[#e0a96d] uppercase bg-[#1f1712] px-2 py-0.5 rounded border border-[#33261d]">
                  {review.tag}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
