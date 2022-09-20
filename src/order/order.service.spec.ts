import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paginatedOrders } from '../fixtures.spec/paginated.fixture';
import { MockType } from '../restaurant/restaurant.service.spec';
import { Order } from './order.entity';
import { OrderService } from './order.service';

// Mock the external module and the paginate function
jest.mock('nestjs-typeorm-paginate', () => ({
  paginate: jest.fn().mockResolvedValue(paginatedOrders),
}));


const requestOrder = {
  "restaurantId": "02d6c591-6dcd-4fdd-abca-29092ba2b913",
  "restaurantName": "Andrei's",
  "userId": "a44a69dc-b145-4c5c-8616-d4187a4923dc",
  "userName": "Edith Johnson",
  "status": "create",
  "orderedDishes": [{
    "id": "03a7e12e-56a1-4105-92e4-c393e9f4f3ef",
    "dishName": "Half roast spring duck",
    "price": 10.8
  }, {
    "id": "8e476238-38f2-4174-a60f-beff61acd91d",
    "dishName": "Picatta Milanese",
    "price": 11.06
  }]
};
const queryBuilderMock = {
  findOne: jest.fn().mockImplementation(() => ({})),
  save: jest.fn().mockImplementation(() => Promise.resolve(requestOrder))
};
const entityManagerMock = { getRepository: () => queryBuilderMock };
const transactionMock = jest.fn(async passedFunction => await passedFunction(entityManagerMock));
jest.mock('typeorm', () => {
  const actual = jest.requireActual('typeorm');
  return ({
    ...actual,
    getManager: () => ({ transaction: transactionMock })
  })
});

describe('OrderService', () => {
  let service: OrderService;
  let mockRepository: MockType<Repository<Order>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderService, {
        provide: getRepositoryToken(Order),
        useClass: Repository,
        useValue: {
          getOrders: jest.fn().mockResolvedValue(paginatedOrders),
          createOrder: jest.fn().mockResolvedValue({ success: true }),
        },
      }],
    }).compile();

    service = module.get<OrderService>(OrderService);
    mockRepository = module.get(getRepositoryToken(Order));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be defined', () => {
    expect(mockRepository).toBeDefined();
  });

  describe('createOrder', () => {
    it('should return { success: true }', async () => {
      const response = { success: true };
      jest.spyOn(mockRepository, 'create').mockImplementation(() => requestOrder);
      expect(await service.createOrder(requestOrder)).toEqual(response);
    });
  });

  describe('getOrders', () => {
    it('should return list of Orders', async () => {
      expect(await service.getOrders({ limit: 10, page: 1 })).toEqual(paginatedOrders);
    });
  });
});
