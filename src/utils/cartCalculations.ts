export interface CartItemOption {
  name: string;
  priceDelta: number;
}

export interface CartItem {
  id: string;
  name: string;
  basePrice: number;
  quantity: number;
  selectedOptions?: CartItemOption[];
  notes?: string;
  category: 'hot' | 'cold' | 'beans' | 'pastry';
}

export interface OrderCalculation {
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  deliveryFee: number;
  total: number;
  appliedPromo?: string;
}

export const VALID_PROMOS: Record<string, { type: 'percent' | 'flat'; value: number; minOrder?: number; label: string }> = {
  COORG12: {
    type: 'percent',
    value: 12,
    label: '12% Coorg Welcome Discount',
  },
  SRINAGARFIRST: {
    type: 'flat',
    value: 50,
    minOrder: 300,
    label: '₹50 Off for Srinagar Coffee Lovers',
  },
  BEANS10: {
    type: 'percent',
    value: 10,
    label: '10% Off Specialty Whole Beans',
  },
};

export function calculateItemTotal(item: CartItem): number {
  const optionsPrice = (item.selectedOptions || []).reduce((sum, opt) => sum + opt.priceDelta, 0);
  return Math.max(0, (item.basePrice + optionsPrice) * item.quantity);
}

export function calculateCartTotals(
  items: CartItem[],
  promoCode?: string,
  deliveryType: 'dine_in' | 'takeaway' | 'delivery' = 'dine_in'
): OrderCalculation {
  const subtotal = items.reduce((sum, item) => sum + calculateItemTotal(item), 0);

  let discountAmount = 0;
  let appliedPromo: string | undefined = undefined;

  if (promoCode && subtotal > 0) {
    const code = promoCode.trim().toUpperCase();
    const promo = VALID_PROMOS[code];
    if (promo) {
      if (!promo.minOrder || subtotal >= promo.minOrder) {
        if (promo.type === 'percent') {
          discountAmount = Math.round((subtotal * promo.value) / 100);
        } else if (promo.type === 'flat') {
          discountAmount = Math.min(subtotal, promo.value);
        }
        appliedPromo = code;
      }
    }
  }

  const taxableAmount = Math.max(0, subtotal - discountAmount);
  // 5% GST standard for restaurant & cafe dining/takeaway
  const taxAmount = Math.round(taxableAmount * 0.05);

  let deliveryFee = 0;
  if (deliveryType === 'delivery') {
    deliveryFee = subtotal >= 500 ? 0 : 40;
  }

  const total = taxableAmount + taxAmount + deliveryFee;

  return {
    subtotal,
    discountAmount,
    taxAmount,
    deliveryFee,
    total,
    appliedPromo,
  };
}

export interface FlavorPreference {
  temp: 'hot' | 'iced';
  strength: 'mild' | 'balanced' | 'bold';
  flavor: 'chocolate_nutty' | 'fruity_floral' | 'sweet_creamy' | 'pure_black';
}

export interface RecommendedCoffee {
  id: string;
  name: string;
  tagline: string;
  notes: string[];
  temp: 'hot' | 'iced';
  roast: string;
}

export function getFlavorRecommendation(pref: FlavorPreference): RecommendedCoffee {
  if (pref.temp === 'iced') {
    if (pref.flavor === 'sweet_creamy' || pref.strength === 'mild') {
      return {
        id: 'spanish_latte',
        name: 'Coorg Spanish Cloud Latte',
        tagline: 'Silky sweet condensed milk pulled over double Coorg espresso & slow iced milk',
        notes: ['Caramel', 'Velvet Cream', 'Dark Chocolate'],
        temp: 'iced',
        roast: 'Medium Roast',
      };
    } else if (pref.flavor === 'fruity_floral') {
      return {
        id: 'tonic_espresso',
        name: 'Twelve Espresso Tonic',
        tagline: 'Chilled artisanal tonic water layered with bright single-origin Coorg espresso & citrus zest',
        notes: ['Bergamot', 'Orange Blossom', 'Sparkling Crisp'],
        temp: 'iced',
        roast: 'Light Roast',
      };
    } else {
      return {
        id: 'cold_brew',
        name: '18-Hour Coorg Cold Brew',
        tagline: 'Steeped for 18 hours with cold filtered spring water for ultra-smooth low acidity',
        notes: ['Cocoa Nibs', 'Roasted Hazelnut', 'Black Cherry'],
        temp: 'iced',
        roast: 'Medium-Dark Roast',
      };
    }
  } else {
    // Hot
    if (pref.flavor === 'pure_black' || pref.strength === 'bold') {
      return {
        id: 'coorg_pour_over',
        name: 'Coorg Estate Peaberry Pour-Over',
        tagline: 'Rare handpicked peaberry beans extracted with V60 for clarity and vibrant terroir notes',
        notes: ['Wild Honey', 'Jasmine', 'Raw Cane Sugar'],
        temp: 'hot',
        roast: 'Light-Medium Roast',
      };
    } else if (pref.flavor === 'chocolate_nutty') {
      return {
        id: 'cortado_twelve',
        name: 'Signature Cortado 1:1',
        tagline: 'Equal parts bold Coorg espresso and micro-foamed textured milk for intense purity',
        notes: ['Toasted Almond', 'Dark Cocoa', 'Molasses'],
        temp: 'hot',
        roast: 'Medium Roast',
      };
    } else {
      return {
        id: 'velvet_cappuccino',
        name: 'Twelve Velvet Cappuccino',
        tagline: 'Creamy steamed whole milk crowned with dense micro-foam and rosetta art',
        notes: ['Milk Chocolate', 'Toffee', 'Biscotti'],
        temp: 'hot',
        roast: 'Medium Roast',
      };
    }
  }
}

export function formatPrice(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}
