import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, {
        provide: getRepositoryToken(User),
        useValue: {
          addUsers: jest.fn().mockResolvedValue({ success: true }),
        },
      },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('addUsers', () => {
    it('should return { success: true }', () => {
      const response = { success: true };
      jest.spyOn(service, 'addUsers').mockImplementation(() => response);
      expect(controller.addUsers([
        {
          cashBalance: 700.7,
          name: "Edith Johnson",
          purchaseHistory: [
            {
              dishName: "Olives",
              restaurantName: "Roma Ristorante",
              transactionAmount: 13.18,
              transactionDate: "02/10/2020 04:09 AM"
            }
          ]
        }
      ])).toBe(response);
    });
  });
}); 
