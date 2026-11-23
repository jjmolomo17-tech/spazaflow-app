import { CartItem, Customer, Product } from '../types/database';

export type StockBadgeStatus = 'out_of_stock' | 'low_stock' | 'in_stock';
export type ExpiryBadgeStatus = 'expired' | 'expiring_soon' | 'fresh' | 'none';

export function formatZAR(amount: number): string {
  return `R${amount.toFixed(2)}`;
}

export function hasMarginWarning(costPrice: number, sellingPrice: number): boolean {
  return sellingPrice < costPrice;
}

export function getStockStatus(product: Pick<Product, 'stock_qty' | 'low_stock_threshold'>): StockBadgeStatus {
  if (product.stock_qty <= 0) return 'out_of_stock';
  if (product.stock_qty <= product.low_stock_threshold) return 'low_stock';
  return 'in_stock';
}

export function getExpiryStatus(expiryDate: string | null, today: Date = new Date()): ExpiryBadgeStatus {
  if (!expiryDate) return 'none';
  const expiry = new Date(expiryDate);
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const diffDays = Math.ceil((expiry.getTime() - startOfToday.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return 'expired';
  if (diffDays <= 7) return 'expiring_soon';
  return 'fresh';
}

export function validateCartStock(items: CartItem[]): { valid: boolean; error?: string } {
  for (const item of items) {
    if (item.quantity <= 0) {
      return { valid: false, error: `Quantity for ${item.product.name} must be at least 1.` };
    }
    if (item.quantity > item.product.stock_qty) {
      return {
        valid: false,
        error: `Only ${item.product.stock_qty} units of ${item.product.name} left in stock.`,
      };
    }
  }
  return { valid: true };
}

export function validateCreditCheckout(
  customer: Pick<Customer, 'full_name' | 'credit_limit' | 'current_balance'>,
  cartTotal: number
): { valid: boolean; error?: string } {
  const remaining = Math.max(0, customer.credit_limit - customer.current_balance);
  if (customer.current_balance + cartTotal > customer.credit_limit) {
    return {
      valid: false,
      error: `Exceeds ${customer.full_name}'s ${formatZAR(customer.credit_limit)} credit limit (${formatZAR(remaining)} available).`,
    };
  }
  return { valid: true };
}

export function validateRepayment(
  currentBalance: number,
  repaymentAmount: number
): { valid: boolean; error?: string } {
  if (repaymentAmount <= 0) {
    return { valid: false, error: 'Repayment amount must be greater than R0.00.' };
  }
  if (repaymentAmount > currentBalance) {
    return {
      valid: false,
      error: `Repayment cannot exceed current balance of ${formatZAR(currentBalance)}.`,
    };
  }
  return { valid: true };
}

export function buildWhatsAppReminder(shopName: string, customerName: string, balance: number): string {
  return `Hi ${customerName}, friendly reminder from ${shopName}: your current balance on The Book is ${formatZAR(balance)}. Thank you!`;
}
