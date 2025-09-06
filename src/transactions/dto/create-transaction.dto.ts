import { IsDate, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  amount: number;

  @IsInt()
  userId: number;

  @IsInt()
  categoryId: number;

  @IsDate()
  timestamp?: Date;
}
