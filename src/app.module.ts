import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [UsersModule, PrismaModule, TransactionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
