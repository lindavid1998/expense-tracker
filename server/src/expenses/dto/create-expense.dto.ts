import { IsInt, IsDateString, IsOptional } from 'class-validator';

export class CreateExpenseDto {
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
