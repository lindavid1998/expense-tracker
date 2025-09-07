import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense';
import { PrismaService } from 'src/prisma/prisma.service';
import { type Expense } from '@prisma/client';

@Injectable()
export class ExpensesService {
  constructor(private readonly prisma: PrismaService) {}

  async checkExists(id: number) {
    const expense = await this.findOne(id);
    if (!expense) {
      throw new NotFoundException();
    }
    return expense;
  }

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

  async findOne(id: number) {
    return await this.prisma.expense.findUnique({ where: { id } });
  }

  async update(id: number, userId: number, updateExpenseDto: UpdateExpenseDto) {
    const expense = await this.checkExists(id);

    // check authorization
    if (expense.userId != userId) {
      throw new ForbiddenException();
    }

    return await this.prisma.expense.update({
      where: { id },
      data: updateExpenseDto,
    });
  }

  async remove(id: number, userId: number) {
    const expense = await this.checkExists(id);

    // check authorization
    if (expense.userId != userId) {
      throw new ForbiddenException();
    }

    return await this.prisma.expense.delete({ where: { id } });
  }
}
