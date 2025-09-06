import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { type Category } from '@prisma/client';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Category[]> {
    return await this.prisma.category.findMany();
  }
}
