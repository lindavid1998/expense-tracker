export interface Expense {
  amount: number;
  category: string;
  timestamp: Date;
}

export interface Category {
  id: number;
  name: string;
}
