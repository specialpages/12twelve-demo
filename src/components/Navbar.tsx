import React, { useState } from 'react';
import { ShoppingBag, MapPin, Sparkles, Menu as MenuIcon, X } from 'lucide-react';
import { Logo } from './Logo.tsx';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenFinder: () => void;
  onOrderNow: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenFinder,
  onOrderNow,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#0d0a08]/90 backdrop-blur-md border-b border-[#26201b] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark element */}
        <a href="#" className="flex items-center gap-3 shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f7a47]">
          <Logo size="md" />
        </a>

        {/* Zone 2: 4-5 concise single-line nav links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#c8bfb0]">
          <a
            href="#menu"
            className="hover:text-[#f6f4eb] transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Signature Coffees
          </a>
          <a
            href="#story"
            className="hover:text-[#f6f4eb] transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Coorg Origin Story
          </a>
          <a
            href="#journey"
            className="hover:text-[#f6f4eb] transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Farm to Cup
          </a>
          <button
            onClick={onOpenFinder}
            className="hover:text-[#e0a96d] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 py-1 text-left"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#e0a96d]" />
            <span>Flavor Finder</span>
          </button>
          <a
            href="#srinagar"
            className="hover:text-[#f6f4eb] transition-colors whitespace-nowrap shrink-0 py-1 flex items-center gap-1"
          >
            <MapPin className="w-3.5 h-3.5 text-[#2f7a47]" />
            <span>Srinagar Cafe</span>
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action block */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenCart}
            aria-label={`Shopping bag with ${cartCount} items`}
            className="relative p-2.5 rounded-full bg-[#1c1613] hover:bg-[#28201a] border border-[#332a23] text-[#ede8df] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f7a47]"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#1e5a31] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-[#0d0a08] animate-in zoom-in-50">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={onOrderNow}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs md:text-sm font-semibold text-[#0f0c0a] bg-[#e0a96d] hover:bg-[#ebba80] rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0 active:scale-95"
          >
            Order / Reserve Table
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="lg:hidden p-2 text-[#c8bfb0] hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#14100d] border-b border-[#28211b] px-4 pt-3 pb-5 space-y-3">
          <a
            href="#menu"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm text-[#e6e0d5] hover:text-[#e0a96d]"
          >
            Signature Coffees
          </a>
          <a
            href="#story"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm text-[#e6e0d5] hover:text-[#e0a96d]"
          >
            Coorg Origin Story
          </a>
          <a
            href="#journey"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm text-[#e6e0d5] hover:text-[#e0a96d]"
          >
            Farm to Cup Process
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenFinder();
            }}
            className="w-full text-left py-2 text-sm text-[#e0a96d] flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Coffee Flavor Finder</span>
          </button>
          <a
            href="#srinagar"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm text-[#e6e0d5] hover:text-[#e0a96d]"
          >
            Srinagar Cafe Location & Hours
          </a>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOrderNow();
              }}
              className="w-full py-2.5 text-center text-sm font-semibold text-[#0f0c0a] bg-[#e0a96d] rounded-lg"
            >
              Order Online / Reserve
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
