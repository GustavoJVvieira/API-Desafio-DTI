import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Prisma, User as UserModel } from '@prisma/client';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
            user: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  describe('signupUser', () => {
    it('should create a user and return it', async () => {
      const userData: Prisma.UserCreateInput = {
        email: 'test@example.com',
        password: 'password123',
        username: '',
        name: ''
      };

      const createdUser: UserModel = {
        id: '1',
        ...userData,
        // Suponha que há mais campos aqui, como createdAt e updatedAt
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'create').mockResolvedValue(createdUser);

      const result = await controller.signupUser(userData);

      expect(service.create).toHaveBeenCalledWith(userData);
      expect(result).toEqual(createdUser);
    });
  });

  describe('getUser', () => {
    it('should return a user by ID', async () => {
      const userId = '1';
      const user: UserModel = {
        id: userId,
        email: 'test@example.com',
        password: 'password123',
        // Suponha que há mais campos aqui
        createdAt: new Date(),
        updatedAt: new Date(),
        name: '',
        username: ''
      };

      jest.spyOn(service, 'user').mockResolvedValue(user);

      const result = await controller.getUser(userId);

      expect(service.user).toHaveBeenCalledWith({ id: userId });
      expect(result).toEqual(user);
    });
  });
});