import React, { useState } from 'react';
import { Star, Plus, Flame, Sparkles } from 'lucide-react';
import { COFFEE_MENU, CoffeeItem } from '../data/coffeeData.ts';

interface MenuSectionProps {
  onSelectItem: (item: CoffeeItem) => void;
  onQuickAdd: (itemId: string) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onSelectItem, onQuickAdd }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'classics' | 'iced' | 'estate' | 'beans'>('all');

  const filteredItems = activeCategory === 'all'
    ? COFFEE_MENU
    : COFFEE_MENU.filter((item) => item.category === activeCategory);

  const categories = [
    { id: 'all', label: 'All Brews' },
    { id: 'classics', label: 'Hot Classics' },
    { id: 'iced', label: 'Iced & Cold Brew' },
    { id: 'estate', label: 'Single-Estate Reserve' },
    { id: 'beans', label: 'Whole Beans (250g)' },
  ];

  return (
    <section id="menu" className="py-20 bg-[#0d0a08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header matching reference */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="text-xs font-bold tracking-widest text-[#e0a96d] uppercase">
            Artisanal Selection · Micro-Roasted
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#f7f5ee] tracking-tight font-['Outfit']">
            Our Signature Coffees
          </h2>
          <p className="text-sm sm:text-base text-[#a89b8c] leading-relaxed">
            Directly from Coorg estates to Srinagar. Discover hand-roasted blends and single-estate gems, each calibrated for distinct aromatic profiles.
          </p>

          {/* Interactive Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-[#17120e] border border-[#2d241c] rounded-xl max-w-2xl mx-auto mt-6">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-4 py-2 text-xs md:text-sm font-medium rounded-lg transition-all whitespace-nowrap shrink-0 ${
                  activeCategory === cat.id
                    ? 'bg-[#183f25] text-[#f7f5ee] shadow-sm font-semibold'
                    : 'text-[#9c8f7f] hover:text-[#f7f5ee]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Coffee Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-[#140e0b] border border-[#261e17] rounded-2xl overflow-hidden hover:border-[#e0a96d]/40 transition-all duration-300 flex flex-col justify-between group shadow-lg hover:-translate-y-1"
            >
              <div>
                {/* Image Container */}
                <div
                  className="relative aspect-square w-full overflow-hidden bg-[#1f1712] cursor-pointer"
                  onClick={() => onSelectItem(item)}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#140e0b] via-transparent to-transparent opacity-80" />

                  {/* Kicker badge */}
                  {item.isSignature && (
                    <div className="absolute top-3 left-3 bg-[#183f25]/90 backdrop-blur-sm text-[#f7f5ee] text-[10px] font-bold px-2.5 py-1 rounded-md border border-[#2b683e] flex items-center gap-1 shadow">
                      <Sparkles className="w-3 h-3 text-[#e0a96d]" />
                      <span>Signature</span>
                    </div>
                  )}

                  {/* Roast indicator */}
                  <div className="absolute top-3 right-3 bg-[#0d0a08]/80 backdrop-blur-sm text-[#d1c4b2] text-[10px] font-mono px-2 py-0.5 rounded border border-[#332820] flex items-center gap-1">
                    <Flame className="w-2.5 h-2.5 text-[#e0a96d]" />
                    <span>{item.roast}</span>
                  </div>

                  {/* Bottom rating inside image */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-[#f7f5ee]">
                    <div className="flex text-[#e0a96d]">
                      <Star className="w-3.5 h-3.5 fill-[#e0a96d]" />
                    </div>
                    <span className="font-bold text-xs">{item.rating}</span>
                    <span className="text-[11px] text-[#9c8f7f]">({item.reviewsCount})</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <div>
                    <div className="text-[11px] font-medium text-[#e0a96d] uppercase tracking-wider">
                      {item.origin}
                    </div>
                    <h3
                      className="text-lg font-bold text-[#f7f5ee] group-hover:text-[#e0a96d] transition-colors cursor-pointer mt-0.5 line-clamp-1 font-['Outfit']"
                      onClick={() => onSelectItem(item)}
                    >
                      {item.name}
                    </h3>
                  </div>

                  <p className="text-xs text-[#a69888] line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Tasting Notes as clean unboxed text with separators */}
                  <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-[#c4b6a4] pt-1 border-t border-[#231a14]">
                    {item.tastingNotes.map((note, idx) => (
                      <React.Fragment key={note}>
                        <span className="font-medium text-[#d9cbb9]">{note}</span>
                        {idx < item.tastingNotes.length - 1 && (
                          <span className="text-[#59493c]" aria-hidden="true">·</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Price & Action */}
              <div className="p-5 pt-0 flex items-center justify-between gap-3">
                <div className="flex flex-col">
                  <span className="text-[10px] text-[#8c7e70] uppercase">Price</span>
                  <span className="text-xl font-bold font-mono text-[#f7f5ee]">
                    ₹{item.price}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectItem(item)}
                    className="px-3 py-2 text-xs font-medium text-[#d9cfc1] hover:text-white bg-[#1e1713] hover:bg-[#2c221c] border border-[#382c23] rounded-lg transition-colors whitespace-nowrap"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => onQuickAdd(item.id)}
                    className="p-2 bg-[#e0a96d] hover:bg-[#ecc089] text-[#0d0a08] rounded-lg shadow-sm transition-all active:scale-95 flex items-center justify-center"
                    aria-label={`Add ${item.name} to order`}
                  >
                    <Plus className="w-4 h-4 font-bold" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
