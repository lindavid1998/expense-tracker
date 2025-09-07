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

  update(id: number, updateExpenseDto: UpdateExpenseDto) {
    return `This action updates a #${id} expense`;
  }

  async remove(id: number, userId: number) {
    const expense = await this.findOne(id);
    if (!expense) {
      throw new NotFoundException();
    }

    if (expense.userId != userId) {
      throw new ForbiddenException();
    }

    return await this.prisma.expense.delete({ where: { id } });
  }
}
