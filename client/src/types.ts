export interface Expense {
  id: number;
  amount: number;
  category: string;
  categoryId: number; // for form purposes
  timestamp: string;
}

export interface Category {
  id: number;
  name: string;
}
