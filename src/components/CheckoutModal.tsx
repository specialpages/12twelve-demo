import React, { useState } from 'react';
import { X, CheckCircle2, Coffee, ShieldCheck, Clock, MapPin, Share2 } from 'lucide-react';
import { OrderCalculation, formatPrice, CartItem } from '../utils/cartCalculations.ts';
import { Logo } from './Logo.tsx';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  calculation: OrderCalculation | null;
  deliveryType: 'dine_in' | 'takeaway' | 'delivery';
  onOrderSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  calculation,
  deliveryType,
  onOrderSuccess,
}) => {
  if (!isOpen || !calculation) return null;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [addressOrTable, setAddressOrTable] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cash' | 'counter'>('upi');
  const [confirmedOrder, setConfirmedOrder] = useState<{
    orderId: string;
    timestamp: string;
  } | null>(null);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const orderId = `12-SRN-${randomNum}`;
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setConfirmedOrder({
      orderId,
      timestamp,
    });
    onOrderSuccess();
  };

  const handleFinish = () => {
    setConfirmedOrder(null);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-title"
    >
      <div className="bg-[#140e0b] border border-[#382b21] rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-[#292019] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo size="sm" withText={false} />
            <div>
              <h2 id="checkout-title" className="text-xl font-bold text-[#f7f5ee] font-['Outfit']">
                {confirmedOrder ? 'Order Confirmed' : 'Checkout & Confirmation'}
              </h2>
              <div className="text-xs text-[#8c7e70]">
                {confirmedOrder
                  ? `Order #${confirmedOrder.orderId}`
                  : `Twelve Coffee · Srinagar Flagship`}
              </div>
            </div>
          </div>

          <button
            onClick={handleFinish}
            aria-label="Close modal"
            className="p-2 text-[#9c8e7e] hover:text-white rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {confirmedOrder ? (
            /* Confirmation Receipt State */
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 rounded-full bg-[#183f25] border-2 border-[#2b683e] flex items-center justify-center mx-auto text-[#52b774] shadow-lg animate-in zoom-in">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-2">
                <div className="text-xs font-mono text-[#e0a96d] uppercase tracking-wider">
                  Order Placed Successfully · {confirmedOrder.timestamp}
                </div>
                <h3 className="text-2xl font-extrabold text-[#f7f5ee] font-['Outfit']">
                  Your Coorg Brew is Brewing!
                </h3>
                <p className="text-xs sm:text-sm text-[#b8aba0] max-w-sm mx-auto">
                  Thank you <strong className="text-white">{name}</strong>. Our barista team has received your order and started grinding fresh single-estate beans.
                </p>
              </div>

              {/* Status Tracker */}
              <div className="p-4 rounded-2xl bg-[#1a1410] border border-[#2d231b] text-left space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#8c7d6e]">Order Reference:</span>
                  <span className="font-mono font-bold text-[#e0a96d]">{confirmedOrder.orderId}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#8c7d6e]">Estimated Preparation:</span>
                  <span className="font-medium text-[#f7f5ee] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#e0a96d]" /> 12 – 15 Mins
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#8c7d6e]">Delivery / Service:</span>
                  <span className="capitalize text-[#f7f5ee]">{deliveryType.replace('_', ' ')}</span>
                </div>
                <div className="flex items-center justify-between text-xs pt-2 border-t border-[#261d16]">
                  <span className="text-[#8c7d6e]">Total Paid:</span>
                  <span className="font-mono font-bold text-[#f7f5ee] text-sm">
                    {formatPrice(calculation.total)}
                  </span>
                </div>
              </div>

              {/* Itemized summary inside receipt */}
              <div className="text-left bg-[#100c09] p-4 rounded-xl border border-[#261d17] space-y-2">
                <div className="text-[11px] font-bold text-[#e0a96d] uppercase tracking-wider">
                  Items Ordered ({items.length})
                </div>
                <div className="space-y-1.5 text-xs text-[#a69888]">
                  {items.map((item, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span>{item.quantity}× {item.name}</span>
                      <span className="font-mono text-[#d9cfc1]">
                        {formatPrice(item.basePrice * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleFinish}
                  className="flex-1 py-3 bg-[#e0a96d] hover:bg-[#ecc089] text-[#0d0a08] font-bold text-xs sm:text-sm rounded-xl transition-all"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#d9cfc1] block mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tariq or Aamina"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#110d0a] border border-[#2e231b] text-sm text-[#f7f5ee] focus:outline-none focus:border-[#e0a96d]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#d9cfc1] block mb-1">
                    Contact Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 94190 00000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#110d0a] border border-[#2e231b] text-sm text-[#f7f5ee] focus:outline-none focus:border-[#e0a96d]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#d9cfc1] block mb-1">
                    {deliveryType === 'delivery'
                      ? 'Srinagar Delivery Address'
                      : deliveryType === 'dine_in'
                      ? 'Table Number or Seating Preference'
                      : 'Takeaway Pickup Details'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={
                      deliveryType === 'delivery'
                        ? 'House/Flat No, Landmark, Srinagar'
                        : deliveryType === 'dine_in'
                        ? 'Table 4 / Window bar / Corner'
                        : 'Arriving in 15 mins'
                    }
                    value={addressOrTable}
                    onChange={(e) => setAddressOrTable(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#110d0a] border border-[#2e231b] text-sm text-[#f7f5ee] focus:outline-none focus:border-[#e0a96d]"
                  />
                </div>

                {/* Payment Options */}
                <div className="space-y-2 pt-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#d9cfc1] block">
                    Payment Option
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'upi', label: '📱 Instant UPI' },
                      { id: 'cash', label: '💵 Cash / COD' },
                      { id: 'counter', label: '💳 Pay at Bar' },
                    ].map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setPaymentMethod(m.id as any)}
                        className={`py-2 px-2 rounded-xl border text-xs font-medium text-center transition-all ${
                          paymentMethod === m.id
                            ? 'bg-[#183f25] border-[#2b683e] text-[#f7f5ee]'
                            : 'bg-[#110d0a] border-[#2e231b] text-[#8c7d6e] hover:text-white'
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Trust guarantee */}
                <div className="p-3 rounded-xl bg-[#183f25]/30 border border-[#2b683e]/50 flex items-center gap-2.5 text-xs text-[#a3d4b2]">
                  <ShieldCheck className="w-4 h-4 text-[#52b774] shrink-0" />
                  <span>100% Authentic Coorg Arabica Guaranteed with Every Brew</span>
                </div>
              </div>

              {/* Summary line */}
              <div className="pt-4 border-t border-[#292019] flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-[#8c7d6e] uppercase">Total Amount</div>
                  <div className="font-mono text-xl font-bold text-[#e0a96d]">
                    {formatPrice(calculation.total)}
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 bg-[#e0a96d] hover:bg-[#ecc089] text-[#0d0a08] font-bold text-sm rounded-xl transition-all shadow-md active:scale-95"
                >
                  Place Order Now
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
