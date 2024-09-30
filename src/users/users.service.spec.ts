import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from 'src/db/prisma.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

describe('UsersService', () => {
  let service: UsersService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    user: {
      create: jest.fn(),
      update: jest.fn(),
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a user with hashed password', async () => {
      const userData: Prisma.UserCreateInput = {
        email: 'test@example.com',
        password: 'password',
        name: 'Test User',
        username: ''
      };

      const hashedPassword = await bcrypt.hash(userData.password, 10);
      mockPrismaService.user.create.mockResolvedValue({
        ...userData,
        password: hashedPassword,
      });

      const result = await service.create(userData);

      expect(result).toEqual({
        ...userData,
        password: hashedPassword,
      });
      expect(mockPrismaService.user.create).toHaveBeenCalledWith({
        data: {
          ...userData,
          password: hashedPassword,
        },
      });
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateData: Prisma.UserUpdateInput = {
        name: 'Updated User',
      };
      const userId = { id: '1' };

      mockPrismaService.user.update.mockResolvedValue({
        id: '1',
        ...updateData,
      });

      const result = await service.update({
        where: userId,
        data: updateData,
      });

      expect(result).toEqual({
        id: '1',
        ...updateData,
      });
      expect(mockPrismaService.user.update).toHaveBeenCalledWith({
        where: userId,
        data: updateData,
      });
    });
  });

  describe('user', () => {
    it('should return a user if exists', async () => {
      const userId = { id: '1' };
      const user = {
        id: '1',
        email: 'test@example.com',
        password: 'hashedpassword',
        name: 'Test User',
      };

      mockPrismaService.user.findUnique.mockResolvedValue(user);

      const result = await service.user(userId);

      expect(result).toEqual(user);
      expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
        where: userId,
      });
    });

    it('should return null if user does not exist', async () => {
      const userId = { id: '1' };

      mockPrismaService.user.findUnique.mockResolvedValue(null);

      const result = await service.user(userId);

      expect(result).toBeNull();
      expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
        where: userId,
      });
    });
  });
});