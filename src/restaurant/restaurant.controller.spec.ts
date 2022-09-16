import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { paginatedResponse } from '../fixtures.spec/paginated.fixture';
import { RestaurantController } from './restaurant.controller';
import { Restaurant } from './restaurant.entity';
import { RestaurantService } from './restaurant.service';

describe('RestaurantController', () => {
  let controller: RestaurantController;
  let service: RestaurantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestaurantController],
      providers: [RestaurantService, {
        provide: getRepositoryToken(Restaurant),
        useValue: {
          getRestaurants: jest.fn().mockResolvedValue(paginatedResponse),
          searchRestaurants: jest.fn().mockResolvedValue(paginatedResponse),
          filterRestaurants: jest.fn().mockResolvedValue(paginatedResponse),
          createRestaurants: jest.fn().mockResolvedValue({ success: true }),
        },
      }]
    }).compile();

    controller = module.get<RestaurantController>(RestaurantController);
    service = module.get<RestaurantService>(RestaurantService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('addRestaurants', () => {
    it('should return { success: true }', () => {
      const response = { success: true };
      jest.spyOn(service, 'createRestaurants').mockImplementation(() => response);
      expect(controller.addRestaurants([
        {
          cashBalance: 3474.09,
          menu: [
            {
              dishName: "Poland Mineral Waters",
              price: 12.49
            },
            {
              dishName: "ROSE D'ANJOU (France)",
              price: 13.5
            },
            {
              dishName: "Misto.",
              price: 10.51
            },
            {
              dishName: "Home-made Swiss Roll",
              price: 12.91
            },
            {
              dishName: "Rum",
              price: 10.15
            }
          ],
          openingHours: "Mon, Sat 7:15 am - 3:30 am / Tues 2:45 pm - 5 pm / Fri 8:15 am - 9:30 pm / Sun 5:45 pm - 1:15 am",
          restaurantName: "801 Chophouse Leawood"
        }
      ])).toBe(response);
    });
  });

  describe('listRestaurants', () => {
    it('should return { success: true }', async () => {
      const response = paginatedResponse;
      jest.spyOn(service, 'getRestaurants').mockImplementation(() => Promise.resolve(response));
      expect(await controller.listRestaurants()).toBe(response);
    });
  });


  describe('searchRestaurants', () => {
    it('should return { success: true }', async () => {
      const response = paginatedResponse;
      jest.spyOn(service, 'searchRestaurants').mockImplementation(() => Promise.resolve(response));
      expect(await controller.searchRestaurants()).toBe(response);
    });
  });


  describe('filterRestaurants', () => {
    it('should return { success: true }', async () => {
      const response = paginatedResponse;
      jest.spyOn(service, 'filterRestaurants').mockImplementation(() => Promise.resolve(response));
      expect(await controller.filterRestaurants()).toBe(response);
    });
  });


});
