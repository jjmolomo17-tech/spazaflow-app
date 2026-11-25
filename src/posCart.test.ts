import { describe, it, expect } from 'vitest';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  stock: number;
}

function calculateCartTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function canCheckout(items: CartItem[]): boolean {
  if (items.length === 0) return false;
  return items.every((item) => item.quantity > 0 && item.quantity <= item.stock);
}

describe('POS Cart & Stock Validation', () => {
  it('calculates the exact cart total for multiple items', () => {
    const cart: CartItem[] = [
      { id: '1', name: 'White Bread', price: 18.5, quantity: 2, stock: 10 },
      { id: '2', name: '2L Cooking Oil', price: 65.0, quantity: 1, stock: 5 },
    ];
    expect(calculateCartTotal(cart)).toBe(102.0);
  });

  it('prevents checkout when the cart is empty', () => {
    expect(canCheckout([])).toBe(false);
  });

  it('prevents checkout when requested quantity exceeds available stock', () => {
    const cart: CartItem[] = [
      { id: '1', name: 'Maize Meal 5kg', price: 75.0, quantity: 6, stock: 4 },
    ];
    expect(canCheckout(cart)).toBe(false);
  });

  it('allows checkout when all items are within available stock', () => {
    const cart: CartItem[] = [
      { id: '1', name: 'Sugar 2.5kg', price: 52.0, quantity: 2, stock: 8 },
    ];
    expect(canCheckout(cart)).toBe(true);
  });
});
