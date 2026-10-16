import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, Tag, ArrowRight, ShoppingBag } from 'lucide-react';
import { CartItem, calculateCartTotals, calculateItemTotal, formatPrice } from '../utils/cartCalculations.ts';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onCheckout: (calculation: any, deliveryType: 'dine_in' | 'takeaway' | 'delivery') => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedCode, setAppliedCode] = useState('COORG12');
  const [promoError, setPromoError] = useState('');
  const [deliveryType, setDeliveryType] = useState<'dine_in' | 'takeaway' | 'delivery'>('dine_in');

  if (!isOpen) return null;

  const totals = calculateCartTotals(items, appliedCode, deliveryType);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCode.trim()) return;
    const code = promoCode.trim().toUpperCase();
    const testTotals = calculateCartTotals(items, code, deliveryType);
    if (testTotals.appliedPromo) {
      setAppliedCode(code);
      setPromoError('');
    } else {
      setPromoError('Invalid code or minimum order not met (Try COORG12)');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-heading"
    >
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#130e0b] border-l border-[#2e231b] shadow-2xl flex flex-col justify-between">
          {/* Cart Header */}
          <div className="p-6 border-b border-[#261d17] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-[#183f25] text-white">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h2 id="cart-heading" className="text-lg font-bold text-[#f7f5ee] font-['Outfit']">
                  Your Coffee Bag
                </h2>
                <div className="text-xs text-[#8c7e70]">
                  {items.length} {items.length === 1 ? 'item' : 'items'} selected
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Close cart"
              className="p-2 text-[#9c8e7e] hover:text-white rounded-lg hover:bg-[#1f1712]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="p-6 overflow-y-auto flex-1 space-y-4">
            {items.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#1c1511] border border-[#33261e] flex items-center justify-center mx-auto text-[#6b5d50]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-[#f7f5ee]">Your bag is empty</h3>
                <p className="text-xs text-[#8c7d6e] max-w-xs mx-auto">
                  Browse our Coorg single-origin brews and add your favorite cups to get started.
                </p>
              </div>
            ) : (
              items.map((item, idx) => (
                <div
                  key={`${item.id}-${idx}`}
                  className="p-4 rounded-xl bg-[#17110d] border border-[#2b2018] flex items-start justify-between gap-3"
                >
                  <div className="space-y-1 flex-1">
                    <div className="text-xs font-bold text-[#f7f5ee]">{item.name}</div>
                    {item.selectedOptions && item.selectedOptions.length > 0 && (
                      <div className="text-[11px] text-[#a69888] space-y-0.5">
                        {item.selectedOptions.map((opt, i) => (
                          <div key={i}>
                            + {opt.name} {opt.priceDelta > 0 && `(₹${opt.priceDelta})`}
                          </div>
                        ))}
                      </div>
                    )}
                    {item.notes && (
                      <div className="text-[10px] italic text-[#e0a96d] truncate">
                        &ldquo;{item.notes}&rdquo;
                      </div>
                    )}
                    <div className="font-mono text-xs font-semibold text-[#e0a96d] pt-1">
                      {formatPrice(calculateItemTotal(item))}
                    </div>
                  </div>

                  {/* Stepper & remove */}
                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => onRemoveItem(idx)}
                      aria-label={`Remove ${item.name}`}
                      className="text-[#69584c] hover:text-red-400 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-2 bg-[#120d0a] border border-[#2e231a] rounded-lg p-0.5 px-1.5">
                      <button
                        onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                        className="p-1 text-[#8c7e70] hover:text-white"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-mono text-xs font-bold text-white w-3 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                        className="p-1 text-[#8c7e70] hover:text-white"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Order Destination Type */}
            {items.length > 0 && (
              <div className="pt-4 border-t border-[#261d16] space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#d9cfc1] block">
                  Service Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'dine_in', label: '☕ Dine-In' },
                    { id: 'takeaway', label: '🛍️ Takeaway' },
                    { id: 'delivery', label: '🛵 Delivery' },
                  ].map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setDeliveryType(type.id as any)}
                      className={`py-2 px-2 text-xs font-medium rounded-lg border transition-all text-center ${
                        deliveryType === type.id
                          ? 'bg-[#183f25] border-[#2b683e] text-[#f7f5ee]'
                          : 'bg-[#17110d] border-[#292019] text-[#8c7d6e] hover:text-white'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Promo Code Input */}
            {items.length > 0 && (
              <div className="pt-2 space-y-1">
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-[#8c7d6e] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Promo (try COORG12)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 rounded-xl bg-[#17110d] border border-[#2b2019] text-xs text-white focus:outline-none focus:border-[#e0a96d] uppercase"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-2 bg-[#261e18] hover:bg-[#382b21] border border-[#382b21] text-xs font-bold text-[#f7f5ee] rounded-xl transition-colors"
                  >
                    Apply
                  </button>
                </form>

                {totals.appliedPromo && (
                  <div className="text-[11px] text-[#52b774] flex items-center justify-between pt-1">
                    <span>Applied: {totals.appliedPromo}</span>
                    <button
                      onClick={() => setAppliedCode('')}
                      className="text-[10px] text-[#8c7d6e] hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                )}
                {promoError && <div className="text-[11px] text-red-400 pt-1">{promoError}</div>}
              </div>
            )}
          </div>

          {/* Cart Footer Calculation & CTA */}
          {items.length > 0 && (
            <div className="p-6 bg-[#0f0b08] border-t border-[#261d17] space-y-3">
              <div className="space-y-1.5 text-xs text-[#a69888]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-[#f7f5ee]">{formatPrice(totals.subtotal)}</span>
                </div>
                {totals.discountAmount > 0 && (
                  <div className="flex justify-between text-[#52b774]">
                    <span>Discount ({totals.appliedPromo})</span>
                    <span className="font-mono">-{formatPrice(totals.discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>GST (5%)</span>
                  <span className="font-mono text-[#f7f5ee]">{formatPrice(totals.taxAmount)}</span>
                </div>
                {deliveryType === 'delivery' && (
                  <div className="flex justify-between">
                    <span>Delivery in Srinagar</span>
                    <span className="font-mono text-[#f7f5ee]">
                      {totals.deliveryFee === 0 ? 'FREE (Orders &gt; ₹500)' : formatPrice(totals.deliveryFee)}
                    </span>
                  </div>
                )}
                <div className="pt-2 border-t border-[#261d17] flex justify-between text-sm font-bold text-white">
                  <span>Grand Total</span>
                  <span className="font-mono text-base text-[#e0a96d]">{formatPrice(totals.total)}</span>
                </div>
              </div>

              <button
                onClick={() => onCheckout(totals, deliveryType)}
                className="w-full py-3.5 bg-[#e0a96d] hover:bg-[#ecc089] text-[#0d0a08] font-bold text-sm rounded-xl transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Complete Order ({formatPrice(totals.total)})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
