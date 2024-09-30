import { Test, TestingModule } from '@nestjs/testing';
import { RemindersService } from './reminders.service';
import { PrismaService } from '../db/prisma.service';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';

describe('RemindersService', () => {
  let service: RemindersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RemindersService,
        {
          provide: PrismaService,
          useValue: {
            reminders: {
              create: jest.fn(),
              findMany: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<RemindersService>(RemindersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('create', () => {
    it('should create a reminder', async () => {
      const createReminderDto: CreateReminderDto = {
        // Preencha com os dados necessários para criar um lembrete
        body : "Test Reminder",
      };

      const req = { sub: { sub: 'user-id-123' } }; // Mock do objeto de requisição
      const createdReminder = { id: '1', ...createReminderDto, userId: req.sub.sub };

      const result = await service.create(createReminderDto, req);

      expect(prisma.reminders.create).toHaveBeenCalledWith({
        data: { ...createReminderDto, userId: req.sub.sub },
      });
      expect(result).toEqual(createdReminder);
    });
  });

  describe('findAll', () => {
    it('should return an array of reminders', async () => {
      const reminders = [{ id: '1', title: 'Reminder 1' }, { id: '2', title: 'Reminder 2' }];
    

      const result = await service.findAll();

      expect(prisma.reminders.findMany).toHaveBeenCalled();
      expect(result).toEqual(reminders);
    });
  });

  describe('findOne', () => {
    it('should return reminders for the user', async () => {
      const req = { sub: { sub: 'user-id-123' } }; // Mock do objeto de requisição
      const reminders = [{ id: '1', userId: 'user-id-123' }];

      const result = await service.findOne(req);

      expect(prisma.reminders.findMany).toHaveBeenCalledWith({ where: { userId: req.sub.sub } });
      expect(result).toEqual(reminders);
    });
  });

  describe('update', () => {
    it('should update a reminder', async () => {
      const updateReminderDto: UpdateReminderDto = {
        // Preencha com os dados que você quer atualizar
        body : "Test Reminder",
      };

      const id = '1';
      const updatedReminder = { id, ...updateReminderDto, userId: 'teste' };

      const result = await service.update(id, updateReminderDto);

      expect(prisma.reminders.update).toHaveBeenCalledWith({
        where: { id },
        data: { ...updateReminderDto, userId: 'teste' },
      });
      expect(result).toEqual(updatedReminder);
    });
  });

  describe('remove', () => {
    it('should remove a reminder', async () => {
      const id = '1';
      const deletedReminder = { id };

    
      const result = await service.remove(id);

      expect(prisma.reminders.delete).toHaveBeenCalledWith({ where: { id } });
      expect(result).toEqual(deletedReminder);
    });
  });
});