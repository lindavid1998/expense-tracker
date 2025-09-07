import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateTransactionDto } from './dto/create-expense.dto';
import { UpdateTransactionDto } from './dto/update-expense';
import { ValidationPipe } from '@nestjs/common';
import { TransactionResponseDto } from './dto/expense-response.dto';
import { Prisma } from '@prisma/client';

type TransactionWithCategory = Prisma.TransactionGetPayload<{
  include: { category: true };
}>;

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  async create(
    @Body(new ValidationPipe()) createTransactionDto: CreateTransactionDto,
  ) {
    return await this.expensesService.create(createTransactionDto);
  }

  @Get()
  findAll() {
    return this.expensesService.findAll();
  }

  @Get('/user/:userId')
  async findAllByUser(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<TransactionResponseDto[]> {
    const results: TransactionWithCategory[] =
      await this.expensesService.findAll(userId);

    // map results to TransactionResponseDto type
    return results.map((result) => ({
      id: result.id,
      amount: result.amount,
      category: result.category.name,
      timestamp: result.timestamp,
    }));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expensesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.expensesService.update(+id, updateTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expensesService.remove(+id);
  }
}
