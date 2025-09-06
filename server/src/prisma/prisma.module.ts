import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // makes the prisma service available to all modules
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
