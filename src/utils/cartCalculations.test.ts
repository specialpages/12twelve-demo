import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateItemTotal,
  calculateCartTotals,
  getFlavorRecommendation,
  formatPrice,
} from './cartCalculations.ts';
import type { CartItem } from './cartCalculations.ts';

test('calculateItemTotal computes base price and modifier options', () => {
  const item: CartItem = {
    id: 'latte',
    name: 'Twelve Velvet Cappuccino',
    basePrice: 220,
    quantity: 2,
    selectedOptions: [
      { name: 'Oat Milk', priceDelta: 40 },
      { name: 'Extra Shot', priceDelta: 50 },
    ],
    category: 'hot',
  };
  // (220 + 40 + 50) * 2 = 310 * 2 = 620
  assert.equal(calculateItemTotal(item), 620);
});

test('calculateCartTotals applies percentage promo code correctly', () => {
  const items: CartItem[] = [
    {
      id: 'cold_brew',
      name: 'Coorg Cold Brew',
      basePrice: 200,
      quantity: 1,
      category: 'cold',
    },
    {
      id: 'beans',
      name: 'Coorg Arabica Peaberry 250g',
      basePrice: 450,
      quantity: 1,
      category: 'beans',
    },
  ];

  // Subtotal = 650
  // COORG12 promo = 12% of 650 = 78
  // Taxable = 650 - 78 = 572
  // Tax 5% = Math.round(572 * 0.05) = 29
  // Delivery = 0 (free over 500)
  // Total = 572 + 29 = 601
  const totals = calculateCartTotals(items, 'COORG12', 'delivery');
  assert.equal(totals.subtotal, 650);
  assert.equal(totals.discountAmount, 78);
  assert.equal(totals.taxAmount, 29);
  assert.equal(totals.deliveryFee, 0);
  assert.equal(totals.total, 601);
  assert.equal(totals.appliedPromo, 'COORG12');
});

test('calculateCartTotals applies flat discount with minimum order threshold', () => {
  const lowItems: CartItem[] = [
    {
      id: 'espresso',
      name: 'Double Espresso',
      basePrice: 150,
      quantity: 1,
      category: 'hot',
    },
  ];
  // Subtotal 150 < 300, SRINAGARFIRST should NOT apply
  const lowResult = calculateCartTotals(lowItems, 'SRINAGARFIRST', 'takeaway');
  assert.equal(lowResult.discountAmount, 0);
  assert.equal(lowResult.appliedPromo, undefined);

  // Subtotal 350 >= 300, SRINAGARFIRST should apply ₹50 discount
  const eligibleItems: CartItem[] = [
    {
      id: 'latte',
      name: 'Latte',
      basePrice: 350,
      quantity: 1,
      category: 'hot',
    },
  ];
  const eligibleResult = calculateCartTotals(eligibleItems, 'SRINAGARFIRST', 'takeaway');
  assert.equal(eligibleResult.discountAmount, 50);
  assert.equal(eligibleResult.appliedPromo, 'SRINAGARFIRST');
});

test('calculateCartTotals calculates delivery fee for orders below 500', () => {
  const smallOrder: CartItem[] = [
    {
      id: 'americano',
      name: 'Americano',
      basePrice: 180,
      quantity: 1,
      category: 'hot',
    },
  ];
  const result = calculateCartTotals(smallOrder, undefined, 'delivery');
  assert.equal(result.deliveryFee, 40);
});

test('getFlavorRecommendation returns matching coffees for iced and hot profiles', () => {
  const icedRec = getFlavorRecommendation({
    temp: 'iced',
    strength: 'balanced',
    flavor: 'chocolate_nutty',
  });
  assert.equal(icedRec.id, 'cold_brew');
  assert.equal(icedRec.temp, 'iced');

  const hotRec = getFlavorRecommendation({
    temp: 'hot',
    strength: 'bold',
    flavor: 'pure_black',
  });
  assert.equal(hotRec.id, 'coorg_pour_over');
  assert.equal(hotRec.temp, 'hot');
});

test('formatPrice formats Indian Rupee values properly', () => {
  assert.equal(formatPrice(250), '₹250');
  assert.equal(formatPrice(1200), '₹1,200');
});
