import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense';
import { PrismaService } from 'src/prisma/prisma.service';
import { type Expense } from '@prisma/client';

@Injectable()
export class ExpensesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createExpenseDto: CreateExpenseDto): Promise<Expense> {
    return await this.prisma.expense.create({
      data: createExpenseDto,
    });
  }

  async findAll(userId?: number) {
    return await this.prisma.expense.findMany({
      where: { userId },
      include: { category: true },
      orderBy: {
        timestamp: 'desc',
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} expense`;
  }

  update(id: number, updateExpenseDto: UpdateExpenseDto) {
    return `This action updates a #${id} expense`;
  }

  remove(id: number) {
    return `This action removes a #${id} expense`;
  }
}
