import { Test, TestingModule } from '@nestjs/testing';
import { ExpensesController } from './expenses.controller';
import { ExpensesService } from './expenses.service';
import { type Expense, type Category } from '@prisma/client';
import { makeCategory, makeExpense } from '../../test/utils';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

// what to test in the controller layer:
// what it returns, response shape
// error propagation

const mockExpensesService = {
  findAll: jest.fn(),
  update: jest.fn(),
};

describe('ExpensesController', () => {
  let controller: ExpensesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpensesController],
      providers: [
        {
          provide: ExpensesService,
          useValue: mockExpensesService,
        },
      ],
    }).compile();

    controller = module.get<ExpensesController>(ExpensesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAllByUser', () => {
    const amount = 12345;
    const categoryName = 'some category';
    const mockExpenseWithCategory = {
      ...makeExpense({ amount }),
      category: makeCategory({ name: categoryName }),
    };
    const userId = 1;

    beforeEach(() => {
      mockExpensesService.findAll.mockResolvedValue([mockExpenseWithCategory]);
    });

    it('returns a list of expenses', async () => {
      const result = await controller.findAllByUser(userId);
      expect(result).toBeInstanceOf(Array);
    });

    it('returns empty list if no results', async () => {
      mockExpensesService.findAll.mockResolvedValueOnce([]);
      const result = await controller.findAllByUser(userId);
      expect(result).toBeInstanceOf(Array);
      expect(result).toEqual([]);
    });

    it('returns expenses with correct shape', async () => {
      const expenses = await controller.findAllByUser(userId);
      const result = expenses[0];
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('category');
      expect(result).toHaveProperty('categoryId');
      expect(result.amount).toBe(amount);
      expect(result.category).toBe(categoryName);
    });
  });

  describe('update', () => {
    it('propagates NotFoundException from service', async () => {
      // mock service to throw not found
      mockExpensesService.update.mockRejectedValueOnce(new NotFoundException());
      // call controller method
      // assert that method returns not found exception
      await expect(controller.update(1, {})).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
    it('propagates ForbiddenException from service', async () => {
      // mock service to throw not found
      mockExpensesService.update.mockRejectedValueOnce(
        new ForbiddenException(),
      );
      // call controller method
      // assert that method returns not found exception
      await expect(controller.update(1, {})).rejects.toBeInstanceOf(
        ForbiddenException,
      );
    });
  });
});
