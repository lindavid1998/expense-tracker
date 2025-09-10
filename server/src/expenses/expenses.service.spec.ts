import { Test, TestingModule } from '@nestjs/testing';
import { ExpensesService } from './expenses.service';
import { UpdateExpenseDto } from './dto/update-expense';
import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

const prismaMock = {
  expense: {
    update: jest.fn(),
    findUnique: jest.fn(),
  },
};

// jest.mock('src/prisma/prisma.service', () => ({
//   PrismaService:
// }))

describe('ExpensesService', () => {
  let service: ExpensesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExpensesService,
        {
          // expense service is dependent on prisma service
          // so need to provide prisma service to test module so it can inject into expense service
          // however since unit testing, we want to use the mock implementation
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<ExpensesService>(ExpensesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('checkExists', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('throws NOT FOUND if expense ID does not exist', async () => {
      // OPTION 1
      // spy on findOne, mock return value as null
      // const spyFindOne = jest.spyOn(service, 'findOne');
      // spyFindOne.mockResolvedValueOnce(null);
      // the problem about this is that it requires checkExists to be calling service.findOne()

      // OPTION 2
      // instead of spying findOne, mock prisma call
      // this adds flexibility and isn't as implementation heavy
      // now checkExists can call findOne() or the prisma client, and this test should still work
      prismaMock.expense.findUnique.mockResolvedValueOnce(null);

      // call checkExists
      // assert that notfoundexeption was thrown
      await expect(service.checkExists(123)).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });

    it('returns the expense if it exists', async () => {
      const expense = 'some expense';
      prismaMock.expense.findUnique.mockResolvedValueOnce(expense);
      await expect(service.checkExists(123)).resolves.toBe(expense);
    });
  });

  describe('update', () => {
    it.todo(
      'throws FORBIDDEN if user tries to edit expense that is not theirs',
    );
  });
});
