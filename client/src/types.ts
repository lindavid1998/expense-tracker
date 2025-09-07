export interface Expense {
  id: number;
  amount: number;
  category: string;
  timestamp: string;
}

export interface Category {
  id: number;
  name: string;
}
