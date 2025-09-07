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
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ValidationPipe } from '@nestjs/common';
import { TransactionResponseDto } from './dto/transaction-response.dto';
import { Prisma } from '@prisma/client';

type TransactionWithCategory = Prisma.TransactionGetPayload<{
  include: { category: true };
}>;

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  async create(
    @Body(new ValidationPipe()) createTransactionDto: CreateTransactionDto,
  ) {
    return await this.transactionsService.create(createTransactionDto);
  }

  @Get()
  findAll() {
    return this.transactionsService.findAll();
  }

  @Get('/user/:userId')
  async findAllByUser(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<TransactionResponseDto[]> {
    const results: TransactionWithCategory[] =
      await this.transactionsService.findAll(userId);

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
    return this.transactionsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionsService.update(+id, updateTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(+id);
  }
}
