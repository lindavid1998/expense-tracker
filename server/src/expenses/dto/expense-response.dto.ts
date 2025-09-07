export class ExpenseResponseDto {
  id: number;
  amount: number;
  categoryId: number;
  category: string;
  timestamp: Date; // serialized as string when sent to client
}
