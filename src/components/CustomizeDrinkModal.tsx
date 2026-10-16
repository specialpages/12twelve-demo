import React, { useState } from 'react';
import { X, Plus, Minus, Check, Flame, MapPin } from 'lucide-react';
import { CoffeeItem } from '../data/coffeeData.ts';
import { CartItemOption } from '../utils/cartCalculations.ts';

interface CustomizeDrinkModalProps {
  item: CoffeeItem | null;
  onClose: () => void;
  onAddToCart: (item: CoffeeItem, quantity: number, options: CartItemOption[], notes: string) => void;
}

export const CustomizeDrinkModal: React.FC<CustomizeDrinkModalProps> = ({
  item,
  onClose,
  onAddToCart,
}) => {
  if (!item) return null;

  const isBeanPack = item.category === 'beans';

  const [quantity, setQuantity] = useState(1);
  const [selectedMilk, setSelectedMilk] = useState<'Standard Milk' | 'Oat Milk (+₹40)' | 'Almond Milk (+₹45)'>('Standard Milk');
  const [extraShot, setExtraShot] = useState(false);
  const [sweetness, setSweetness] = useState<'No Sugar' | 'Mild Sweet' | 'Regular'>('No Sugar');
  const [grindType, setGrindType] = useState<'Whole Beans' | 'Espresso Grind' | 'Moka Pot' | 'French Press'>('Whole Beans');
  const [specialNotes, setSpecialNotes] = useState('');

  // Calculate current options
  const currentOptions: CartItemOption[] = [];
  if (!isBeanPack) {
    if (selectedMilk === 'Oat Milk (+₹40)') {
      currentOptions.push({ name: 'Oat Milk', priceDelta: 40 });
    } else if (selectedMilk === 'Almond Milk (+₹45)') {
      currentOptions.push({ name: 'Almond Milk', priceDelta: 45 });
    }
    if (extraShot) {
      currentOptions.push({ name: 'Extra Coorg Espresso Shot', priceDelta: 50 });
    }
    if (sweetness !== 'No Sugar') {
      currentOptions.push({ name: sweetness, priceDelta: 0 });
    }
  } else {
    currentOptions.push({ name: `Grind: ${grindType}`, priceDelta: 0 });
  }

  const optionsDelta = currentOptions.reduce((sum, opt) => sum + opt.priceDelta, 0);
  const unitPrice = item.price + optionsDelta;
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    onAddToCart(item, quantity, currentOptions, specialNotes);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="customize-title"
    >
      <div className="bg-[#140e0b] border border-[#382b21] rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col">
        {/* Header with image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#1c1511]">
          <img
            src={item.image}
            alt={item.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#140e0b] via-[#140e0b]/40 to-transparent" />

          <button
            onClick={onClose}
            aria-label="Close customization dialog"
            className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/90 text-[#f7f5ee] border border-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex items-center gap-2 text-xs font-medium text-[#e0a96d] uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5" />
              <span>{item.origin}</span>
              <span className="text-[#6e5d4e]">·</span>
              <span className="flex items-center gap-1 font-mono text-[11px]">
                <Flame className="w-3 h-3" /> {item.roast} Roast
              </span>
            </div>
            <h2 id="customize-title" className="text-2xl font-bold text-[#f7f5ee] font-['Outfit'] mt-1">
              {item.name}
            </h2>
          </div>
        </div>

        {/* Scrollable options body */}
        <div className="p-6 space-y-5 overflow-y-auto flex-1">
          <p className="text-xs text-[#aba093] leading-relaxed">
            {item.description}
          </p>

          {/* Tasting notes */}
          <div className="flex flex-wrap gap-1.5 text-xs">
            {item.tastingNotes.map((note) => (
              <span
                key={note}
                className="bg-[#1c1510] border border-[#33271f] text-[#d9cebe] px-2.5 py-1 rounded-md text-[11px]"
              >
                {note}
              </span>
            ))}
          </div>

          {!isBeanPack ? (
            <>
              {/* Milk Option */}
              <div className="space-y-2 pt-2 border-t border-[#261d16]">
                <label className="text-xs font-bold uppercase tracking-wider text-[#d9cfc1] block">
                  Milk Customization
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {(['Standard Milk', 'Oat Milk (+₹40)', 'Almond Milk (+₹45)'] as const).map((milk) => (
                    <button
                      key={milk}
                      type="button"
                      onClick={() => setSelectedMilk(milk)}
                      className={`p-2.5 rounded-xl border text-left text-xs font-medium transition-all ${
                        selectedMilk === milk
                          ? 'bg-[#183f25] border-[#2b683e] text-[#f7f5ee]'
                          : 'bg-[#18120e] border-[#2c2018] text-[#9c8e7e] hover:text-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="truncate">{milk}</span>
                        {selectedMilk === milk && <Check className="w-3.5 h-3.5 text-[#54c47a]" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Extra Espresso Shot */}
              <div className="pt-2 border-t border-[#261d16]">
                <label
                  onClick={() => setExtraShot(!extraShot)}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#18120e] border border-[#2c2018] hover:border-[#3d2e23] cursor-pointer"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-[#f7f5ee] block">
                      Extra Coorg Espresso Shot
                    </span>
                    <span className="text-[11px] text-[#9c8e7e]">
                      Add intense kick of single-estate crema
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#e0a96d]">+₹50</span>
                    <input
                      type="checkbox"
                      checked={extraShot}
                      onChange={() => {}}
                      className="w-4 h-4 accent-[#183f25] rounded"
                    />
                  </div>
                </label>
              </div>

              {/* Sweetness */}
              <div className="space-y-2 pt-2 border-t border-[#261d16]">
                <label className="text-xs font-bold uppercase tracking-wider text-[#d9cfc1] block">
                  Sweetness Level
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['No Sugar', 'Mild Sweet', 'Regular'] as const).map((sw) => (
                    <button
                      key={sw}
                      type="button"
                      onClick={() => setSweetness(sw)}
                      className={`p-2 rounded-xl border text-xs font-medium text-center transition-all ${
                        sweetness === sw
                          ? 'bg-[#183f25] border-[#2b683e] text-[#f7f5ee]'
                          : 'bg-[#18120e] border-[#2c2018] text-[#9c8e7e] hover:text-white'
                      }`}
                    >
                      {sw}
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* Bean Pack grind selection */
            <div className="space-y-2 pt-2 border-t border-[#261d16]">
              <label className="text-xs font-bold uppercase tracking-wider text-[#d9cfc1] block">
                Grind Preference
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['Whole Beans', 'Espresso Grind', 'Moka Pot', 'French Press'] as const).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGrindType(g)}
                    className={`p-2.5 rounded-xl border text-xs font-medium transition-all ${
                      grindType === g
                        ? 'bg-[#183f25] border-[#2b683e] text-[#f7f5ee]'
                        : 'bg-[#18120e] border-[#2c2018] text-[#9c8e7e] hover:text-white'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          <div className="pt-2 border-t border-[#261d16]">
            <label className="text-xs font-bold uppercase tracking-wider text-[#d9cfc1] block mb-1">
              Barista Instructions (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Extra hot, cold ice on the side, paper cup"
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#120d0a] border border-[#2b2018] text-xs text-[#f7f5ee] focus:outline-none focus:border-[#e0a96d]"
            />
          </div>
        </div>

        {/* Footer with quantity and add button */}
        <div className="p-4 sm:p-6 bg-[#100b08] border-t border-[#2d2219] flex items-center justify-between gap-4">
          {/* Quantity stepper */}
          <div className="flex items-center gap-3 bg-[#18120e] border border-[#2d221a] rounded-xl p-1 px-2">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              aria-label="Decrease quantity"
              className="p-1 text-[#9c8e7e] hover:text-white"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-mono font-bold text-sm text-[#f7f5ee] w-4 text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              aria-label="Increase quantity"
              className="p-1 text-[#9c8e7e] hover:text-white"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleAdd}
            className="flex-1 py-3 px-4 bg-[#e0a96d] hover:bg-[#ecc089] text-[#0d0a08] font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-between"
          >
            <span>Add to Order</span>
            <span className="font-mono font-bold">₹{totalPrice}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
