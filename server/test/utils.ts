import { type Expense } from '@prisma/client';
import { type Category } from '@prisma/client';

/* 
These are factory functions to help create mock data
for unit testing
*/

export const makeExpense = (overrides: Partial<Expense> = {}): Expense => ({
  id: 1,
  amount: 10,
  timestamp: new Date(),
  categoryId: 2,
  userId: 123,
  ...overrides,
});

export const makeCategory = (overrides: Partial<Category> = {}): Category => ({
  name: 'category',
  id: 1,
  ...overrides,
});
