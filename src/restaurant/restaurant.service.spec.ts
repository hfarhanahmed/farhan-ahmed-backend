import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paginatedResponse } from '../fixtures.spec/paginated.fixture';
import { Restaurant } from './restaurant.entity';
import { RestaurantService } from './restaurant.service';


// Mock the external module and the paginate function
jest.mock('nestjs-typeorm-paginate', () => ({
  paginate: jest.fn().mockResolvedValue(paginatedResponse),
}));

describe('RestaurantService', () => {
  let service: RestaurantService;
  let mockRepository: MockType<Repository<Restaurant>>;

  const mockQueryBuilder = {
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    andHaving: jest.fn().mockReturnThis(),
    groupBy: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    take: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    offset: jest.fn().mockReturnThis(),
    cache: jest.fn().mockReturnThis(),
    clone: jest.fn().mockReturnThis(),
    getMany: jest.fn().mockResolvedValue(paginatedResponse),
    getManyAndCount: jest.fn().mockResolvedValue(paginatedResponse),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RestaurantService, {
        provide: getRepositoryToken(Restaurant),
        useClass: Repository,
        useValue: {
          getRestaurants: jest.fn().mockResolvedValue(paginatedResponse),
          searchRestaurants: jest.fn().mockResolvedValue(paginatedResponse),
          filterRestaurants: jest.fn().mockResolvedValue(paginatedResponse),
          createRestaurants: jest.fn().mockResolvedValue({ success: true }),
        },
      }],
    }).compile();

    service = module.get<RestaurantService>(RestaurantService);
    mockRepository = module.get(getRepositoryToken(Restaurant));
  });



  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be defined', () => {
    expect(mockRepository).toBeDefined();
  });

  describe('createRestaurants', () => {
    it('should return { success: true }', async () => {
      const response = { success: true };
      const request = {
        id: '',
        cashBalance: 3474.09,
        menu: [
          {
            id: '',
            dishName: "Poland Mineral Waters",
            price: 12.49,
            restaurant: null
          },
          {
            id: '',
            dishName: "ROSE D'ANJOU (France)",
            price: 13.5,
            restaurant: null
          },
          {
            id: '',
            dishName: "Misto.",
            price: 10.51,
            restaurant: null
          },
          {
            id: '',
            dishName: "Home-made Swiss Roll",
            price: 12.91,
            restaurant: null
          },
          {
            id: '',
            dishName: "Rum",
            price: 10.15,
            restaurant: null
          }
        ],
        openingHours: [{
          id: '',
          day: '',
          startTime: '',
          endTime: '',
          breakStart: '',
          breakEnd: '',
          restaurant: null
        }],
        restaurantName: "801 Chophouse Leawood"
      };
      jest.spyOn(mockRepository, 'save').mockImplementation(() => Promise.resolve(request));
      jest.spyOn(mockRepository, 'create').mockImplementation(() => request);
      expect(await service.createRestaurants([])).toEqual(response);
    });
  });

  describe('getRestaurants', () => {
    it('should return list of Restaurants', async () => {
      jest.spyOn(mockRepository, 'createQueryBuilder').mockReturnValue(mockQueryBuilder);
      expect(await service.getRestaurants({ limit: 10, page: 1 })).toEqual(paginatedResponse);
    });
  });

  describe('searchRestaurants', () => {
    it('should return list of Restaurants', async () => {
      jest.spyOn(mockRepository, 'createQueryBuilder').mockReturnValue(mockQueryBuilder);
      expect(await service.searchRestaurants({ limit: 10, page: 1 }, true, '')).toEqual(paginatedResponse);
    });
  });

  describe('filterRestaurants', () => {
    it('should return { success: true }', async () => {
      jest.spyOn(mockRepository, 'createQueryBuilder').mockReturnValue(mockQueryBuilder);
      expect(await service.filterRestaurants({ limit: 10, page: 1 }, 5, true, 0, 10)).toEqual(paginatedResponse);
    });
  });

  describe('createOpenHoursData', () => {
    it('should return array[Open Hours]', async () => {
      expect(await service.createOpenHoursData("Mon, Weds 3:45 pm - 5 pm  / Tues 11:30 am - 3 am / Thurs 10 am - 11:30 pm")).toEqual([{
        day: 'Mon',
        startTime: '15:45',
        endTime: '17:00'
      }, {
        day: 'Tues',
        startTime: '11:30',
        endTime: '03:00'
      }, {
        day: 'Weds',
        startTime: '15:45',
        endTime: '17:00'
      }, {
        day: 'Thurs',
        startTime: '10:00',
        endTime: '23:30'
      }]);
    });
  });

  describe('extractDayTime', () => {
    it('should return array[Open Hours] string with ,', async () => {
      expect(await service.extractDayTime("Mon, Weds 3:45 pm - 5 pm")).toEqual([{
        day: 'Mon',
        startTime: '15:45',
        endTime: '17:00'
      }, {
        day: 'Tues',
        startTime: '15:45',
        endTime: '17:00'
      }, {
        day: 'Weds',
        startTime: '15:45',
        endTime: '17:00'
      }]);
    });
  });

  describe('extractDayTime', () => {
    it('should return array[Open Hours] string with -', async () => {
      expect(await service.extractDayTime("Mon - Tues 3:45 pm - 5 pm")).toEqual([{
        day: 'Mon',
        startTime: '15:45',
        endTime: '17:00'
      }, {
        day: 'Tues',
        startTime: '15:45',
        endTime: '17:00'
      }]);
    });
  });

  describe('extractDayTime', () => {
    it('should return array[Open Hours] single day', async () => {
      expect(await service.extractDayTime("Mon 3:45 pm - 5 pm")).toEqual([{
        day: 'Mon',
        startTime: '15:45',
        endTime: '17:00'
      }]);
    });
  });

  describe('formatTime', () => {
    it('should return array[Open Hours]', async () => {
      expect(await service.formatTime("3:45 pm")).toEqual("15:45");
    });
  });
});

// @ts-ignore
export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  findOne: jest.fn(),
  find: jest.fn(),
  update: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
  createQueryBuilder: jest.fn()
}));

export type MockType<T> = {
  [P in keyof T]: jest.Mock<{}>;
};