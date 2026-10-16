import React, { useState } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { MenuSection } from './components/MenuSection.tsx';
import { OurStory } from './components/OurStory.tsx';
import { FarmToCup } from './components/FarmToCup.tsx';
import { FlavorFinder } from './components/FlavorFinder.tsx';
import { VibeAndReviews } from './components/VibeAndReviews.tsx';
import { VisitUs } from './components/VisitUs.tsx';
import { Footer } from './components/Footer.tsx';
import { CustomizeDrinkModal } from './components/CustomizeDrinkModal.tsx';
import { CartDrawer } from './components/CartDrawer.tsx';
import { CheckoutModal } from './components/CheckoutModal.tsx';
import { COFFEE_MENU, CoffeeItem } from './data/coffeeData.ts';
import { CartItem, CartItemOption, OrderCalculation } from './utils/cartCalculations.ts';
import { Check } from 'lucide-react';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'spanish-cloud',
      name: 'Coorg Spanish Cloud Latte',
      basePrice: 240,
      quantity: 1,
      category: 'cold',
      selectedOptions: [{ name: 'Standard Milk', priceDelta: 0 }],
    },
  ]);

  const [selectedCustomItem, setSelectedCustomItem] = useState<CoffeeItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [currentCalculation, setCurrentCalculation] = useState<OrderCalculation | null>(null);
  const [deliveryType, setDeliveryType] = useState<'dine_in' | 'takeaway' | 'delivery'>('dine_in');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleQuickAdd = (itemId: string) => {
    const item = COFFEE_MENU.find((c) => c.id === itemId);
    if (!item) return;

    setCartItems((prev) => {
      const existingIdx = prev.findIndex((i) => i.id === item.id && (!i.selectedOptions || i.selectedOptions.length === 0));
      if (existingIdx >= 0) {
        const copy = [...prev];
        copy[existingIdx].quantity += 1;
        return copy;
      }
      return [
        ...prev,
        {
          id: item.id,
          name: item.name,
          basePrice: item.price,
          quantity: 1,
          category: item.category === 'beans' ? 'beans' : item.category === 'iced' ? 'cold' : 'hot',
        },
      ];
    });

    showToast(`Added ${item.name} to bag`);
  };

  const handleAddCustomizedDrink = (
    item: CoffeeItem,
    quantity: number,
    options: CartItemOption[],
    notes: string
  ) => {
    setCartItems((prev) => [
      ...prev,
      {
        id: item.id,
        name: item.name,
        basePrice: item.price,
        quantity,
        selectedOptions: options,
        notes,
        category: item.category === 'beans' ? 'beans' : item.category === 'iced' ? 'cold' : 'hot',
      },
    ]);

    showToast(`Added ${quantity}× ${item.name} to bag`);
  };

  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(index);
      return;
    }
    setCartItems((prev) => {
      const copy = [...prev];
      copy[index].quantity = newQty;
      return copy;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleProceedToCheckout = (
    calc: OrderCalculation,
    type: 'dine_in' | 'takeaway' | 'delivery'
  ) => {
    setCurrentCalculation(calc);
    setDeliveryType(type);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = () => {
    setCartItems([]);
  };

  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToFinder = () => {
    const el = document.getElementById('flavor-finder');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToSrinagar = () => {
    const el = document.getElementById('srinagar');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0d0a08] text-[#ede8df] flex flex-col selection:bg-[#e0a96d] selection:text-[#0d0a08]">
      {/* Top Banner: Authentic Bio Promise */}
      <div className="bg-[#183f25] text-[#f7f5ee] py-1.5 px-4 text-center text-[11px] sm:text-xs font-semibold tracking-wide border-b border-[#255b37] flex items-center justify-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#52b774]" />
        <span>100% Original, Direct from Coorg — Taste Authentic Coffee, Guaranteed</span>
        <span className="hidden md:inline text-[#8cd6a3]">· Fresh Weekly Roast in Srinagar</span>
      </div>

      {/* Primary Top Bar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenFinder={scrollToFinder}
        onOrderNow={scrollToSrinagar}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero
          onExploreMenu={scrollToMenu}
          onOpenFinder={scrollToFinder}
          onQuickAdd={handleQuickAdd}
        />

        <MenuSection
          onSelectItem={(item) => setSelectedCustomItem(item)}
          onQuickAdd={handleQuickAdd}
        />

        <OurStory />

        <FarmToCup />

        <FlavorFinder
          onSelectCoffee={(id) => {
            const found = COFFEE_MENU.find((c) => c.id === id);
            if (found) setSelectedCustomItem(found);
            else handleQuickAdd(id);
          }}
        />

        <VibeAndReviews />

        <VisitUs
          onReserveSuccess={() => showToast('Reservation request received!')}
        />
      </main>

      <Footer />

      {/* Modals & Drawers */}
      <CustomizeDrinkModal
        item={selectedCustomItem}
        onClose={() => setSelectedCustomItem(null)}
        onAddToCart={handleAddCustomizedDrink}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleProceedToCheckout}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        calculation={currentCalculation}
        deliveryType={deliveryType}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#183f25] border border-[#2b683e] text-[#f7f5ee] px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-semibold animate-in slide-in-from-bottom-5">
          <Check className="w-4 h-4 text-[#52b774]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
