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
  HttpException,
  ForbiddenException,
  NotFoundException,
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
      categoryId: result.categoryId,
      timestamp: result.timestamp,
    }));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expensesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    // get userId from request object, then pass to service
    const userId = 1;

    return this.expensesService.update(id, userId, updateExpenseDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    // get userId from request
    // for now, hard coded
    const userId = 1;

    await this.expensesService.remove(id, userId);

    return { success: true };
  }
}
