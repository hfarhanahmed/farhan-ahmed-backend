import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { paginatedOrders } from '../fixtures.spec/paginated.fixture';
import { OrderController } from './order.controller';
import { Order } from './order.entity';
import { OrderService } from './order.service';

describe('OrderController', () => {
  let controller: OrderController;
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService, {
        provide: getRepositoryToken(Order),
        useValue: {
          getOrders: jest.fn().mockResolvedValue([]),
          createOrder: jest.fn().mockResolvedValue({ success: true }),
        },
      }]
    }).compile();

    controller = module.get<OrderController>(OrderController);
    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createOrder', () => {
    it('should return { success: true }', async () => {
      const response = { success: true };
      jest.spyOn(service, 'createOrder').mockImplementation(() => Promise.resolve(response));
      expect(await controller.createOrder({
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
      })).toBe(response);
    });
  });

  describe('getOrders', () => {
    it('should return paginated list of Orders', async () => {
      jest.spyOn(service, 'getOrders').mockImplementation(() => Promise.resolve(paginatedOrders));
      expect(await controller.getOrders()).toBe(paginatedOrders);
    });
  });

});
