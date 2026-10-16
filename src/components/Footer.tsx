import React from 'react';
import { Logo } from './Logo.tsx';
import { Instagram, MapPin, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0a0705] border-t border-[#211a14] py-16 text-[#a89c8e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <Logo size="md" />
            <p className="text-xs sm:text-sm text-[#8c7d6e] max-w-sm leading-relaxed">
              100% Original, Direct from Coorg — Taste Authentic Coffee, Guaranteed. Micro-roasted and pulled fresh in Srinagar, Jammu & Kashmir.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com/12twelvecoffee"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[#140f0c] border border-[#2b2018] text-[#c4b6a4] hover:text-[#e0a96d] hover:border-[#e0a96d]/40 transition-colors"
                aria-label="Twelve Coffee on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://maps.app.goo.gl/CwJyo9PEPUCHPfCb9?g_st=ic"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[#140f0c] border border-[#2b2018] text-[#c4b6a4] hover:text-[#e0a96d] hover:border-[#e0a96d]/40 transition-colors"
                aria-label="Twelve Coffee on Google Maps"
              >
                <MapPin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-widest text-[#f7f5ee]">
              Specialty Menu
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#menu" className="hover:text-white transition-colors">
                  Twelve Velvet Cappuccino
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-white transition-colors">
                  Coorg Spanish Cloud Latte
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-white transition-colors">
                  Single-Estate Peaberry Pour-Over
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-white transition-colors">
                  18-Hour Coorg Cold Brew
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-white transition-colors">
                  Whole Beans (250g Pack)
                </a>
              </li>
            </ul>
          </div>

          {/* Sourcing & Location */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-bold uppercase tracking-widest text-[#f7f5ee]">
              Origins & Roastery
            </div>
            <div className="text-xs space-y-1.5 text-[#8c7d6e]">
              <div>
                <strong className="text-[#d9cebe]">Plantations:</strong> Madikeri & Virajpet Hills, Coorg, Karnataka
              </div>
              <div>
                <strong className="text-[#d9cebe]">Espresso Bar:</strong> Main Market, Srinagar, Jammu & Kashmir
              </div>
              <div>
                <strong className="text-[#d9cebe]">Hours:</strong> 8:00 AM – 11:00 PM Daily
              </div>
              <div>
                <strong className="text-[#d9cebe]">Founder:</strong> Mir Salim
              </div>
            </div>
          </div>
        </div>

        {/* Quiet Bottom Copyright */}
        <div className="pt-8 border-t border-[#1c1510] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6b5d50]">
          <div>
            &copy; {new Date().getFullYear()} Twelve Coffee. 100% Original Coorg Coffee. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-[#e0a96d] fill-[#e0a96d]" />
            <span>for coffee lovers in Srinagar</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
