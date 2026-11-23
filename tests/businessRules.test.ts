import { describe, expect, it } from 'vitest';
import {
  buildWhatsAppReminder,
  getExpiryStatus,
  getStockStatus,
  hasMarginWarning,
  validateCartStock,
  validateCreditCheckout,
  validateRepayment,
} from '../src/lib/businessRules';

describe('SpazaFlow Business Rules (BR1–BR6)', () => {
  it('BR1: flags when selling price is below cost price', () => {
    expect(hasMarginWarning(25, 20)).toBe(true);
    expect(hasMarginWarning(20, 25)).toBe(false);
  });

  it('BR2: validates available stock before checkout', () => {
    const bread = {
      id: '1',
      shop_id: 's1',
      name: 'Albany White Bread',
      category: 'Bakery',
      selling_price: 18,
      stock_qty: 3,
      low_stock_threshold: 5,
      expiry_date: null,
    };

    expect(validateCartStock([{ product: bread, quantity: 2 }]).valid).toBe(true);
    expect(validateCartStock([{ product: bread, quantity: 4 }]).valid).toBe(false);
  });

  it('BR3: enforces customer credit limit on The Book', () => {
    const sipho = { full_name: 'Sipho Dlamini', credit_limit: 500, current_balance: 450 };

    expect(validateCreditCheckout(sipho, 50).valid).toBe(true);
    expect(validateCreditCheckout(sipho, 60).valid).toBe(false);
  });

  it('BR4: classifies stock status badges accurately', () => {
    expect(getStockStatus({ stock_qty: 0, low_stock_threshold: 5 })).toBe('out_of_stock');
    expect(getStockStatus({ stock_qty: 5, low_stock_threshold: 5 })).toBe('low_stock');
    expect(getStockStatus({ stock_qty: 12, low_stock_threshold: 5 })).toBe('in_stock');
  });

  it('BR5: classifies expiry warnings within 7 days', () => {
    const today = new Date('2026-11-23T12:00:00Z');
    expect(getExpiryStatus('2026-11-20', today)).toBe('expired');
    expect(getExpiryStatus('2026-11-26', today)).toBe('expiring_soon');
    expect(getExpiryStatus('2026-12-15', today)).toBe('fresh');
  });

  it('BR6: prevents invalid or overpayment repayments', () => {
    expect(validateRepayment(150, 100).valid).toBe(true);
    expect(validateRepayment(150, 0).valid).toBe(false);
    expect(validateRepayment(150, 200).valid).toBe(false);
  });

  it('formats WhatsApp balance reminder cleanly', () => {
    const msg = buildWhatsAppReminder("Thabo's Spaza", 'Nomsa Khumalo', 50);
    expect(msg).toContain('Nomsa Khumalo');
    expect(msg).toContain('R50.00');
  });
});
