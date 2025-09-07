export class TransactionResponseDto {
  id: number;
  amount: number;
  category: string;
  timestamp: Date; // serialized as string when sent to client
}
