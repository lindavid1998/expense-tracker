import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-expense.dto';
import { UpdateTransactionDto } from './dto/update-expense';
import { PrismaService } from 'src/prisma/prisma.service';
import { type Transaction } from '@prisma/client';

@Injectable()
export class ExpensesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    return await this.prisma.transaction.create({
      data: createTransactionDto,
    });
  }

  async findAll(userId?: number) {
    return await this.prisma.transaction.findMany({
      where: { userId },
      include: { category: true },
      orderBy: {
        timestamp: 'desc',
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
