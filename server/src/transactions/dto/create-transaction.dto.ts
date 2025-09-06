import { IsInt, IsDateString, IsOptional } from 'class-validator';

export class CreateTransactionDto {
  @IsInt()
  amount: number;

  @IsInt()
  userId: number;

  @IsInt()
  categoryId: number;

  @IsOptional()
  @IsDateString()
  timestamp?: string;
}
