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
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense';
import { ValidationPipe } from '@nestjs/common';
import { ExpenseResponseDto } from './dto/expense-response.dto';
import { Prisma } from '@prisma/client';

type ExpenseWithCategory = Prisma.ExpenseGetPayload<{
  include: { category: true };
}>;

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  async create(@Body(new ValidationPipe()) createExpenseDto: CreateExpenseDto) {
    return await this.expensesService.create(createExpenseDto);
  }

  @Get()
  findAll() {
    return this.expensesService.findAll();
  }

  @Get('/user/:userId')
  async findAllByUser(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<ExpenseResponseDto[]> {
    const results: ExpenseWithCategory[] =
      await this.expensesService.findAll(userId);

    // map results to ExpenseResponseDto type
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
  update(@Param('id') id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expensesService.update(+id, updateExpenseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expensesService.remove(+id);
  }
}
