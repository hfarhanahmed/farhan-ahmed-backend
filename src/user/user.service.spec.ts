import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let repositoryMock: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, {
        provide: getRepositoryToken(User),
        useClass: Repository,
        useValue: {
          addUsers: jest.fn().mockResolvedValue({ success: true }),
        },
      }],
    }).compile();

    service = module.get<UserService>(UserService);
    repositoryMock = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('addUsers', () => {
    it('should return { success: true }', async () => {
      const response = { success: true };
      const request = {
        id: '',
        cashBalance: 700.7,
        name: "Edith Johnson",
        purchaseHistory: [
          {
            id: '',
            dishName: "Olives",
            user: null,
            restaurantName: "Roma Ristorante",
            transactionAmount: 13.18,
            transactionDate: "02/10/2020 04:09 AM"
          }
        ]
      };
      jest.spyOn(repositoryMock, 'save').mockImplementation(() => Promise.resolve(request));
      jest.spyOn(repositoryMock, 'create').mockImplementation(() => request);
      expect(await service.addUsers([request])).toEqual(response);
    });
  });
});

// @ts-ignore
export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  findOne: jest.fn(),
  find: jest.fn(),
  update: jest.fn(),
  save: jest.fn()
}));

export type MockType<T> = {
  [P in keyof T]: jest.Mock<{}>;
};