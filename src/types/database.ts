export type UserRole = 'owner' | 'staff';

export type TransactionType = 'cash' | 'credit' | 'repayment';

export interface Product {
  id: string;
  shop_id: string;
  name: string;
  category: string;
  cost_price?: number;
  selling_price: number;
  stock_qty: number;
  low_stock_threshold: number;
  expiry_date: string | null;
}

export interface Customer {
  id: string;
  shop_id: string;
  full_name: string;
  phone: string | null;
  credit_limit: number;
  current_balance: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
