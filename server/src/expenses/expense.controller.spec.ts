import { Test, TestingModule } from '@nestjs/testing';
import { ExpensesController } from './expenses.controller';
import { ExpensesService } from './expenses.service';

// what to test in the controller layer:
// what it returns, response shape
// error propagation

const mockExpensesService = {
  findAll: jest.fn(),
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
    it.todo('returns a list of expenses');
    it.todo('returns expenses with correct shape');
    it.todo('returns empty list if no results');
  });

  describe('update', () => {
    it.todo('propagates NotFoundException from service');
    it.todo('propagates ForbiddenException from service');
  });
});
