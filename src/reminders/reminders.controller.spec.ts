import { Test, TestingModule } from '@nestjs/testing';
import { RemindersController } from './reminders.controller';
import { RemindersService } from './reminders.service';



describe('RemindersController', () => {
  let controller: RemindersController;
  let service: RemindersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RemindersController],
      providers: [
        {
          provide: RemindersService,
          useValue: {
            create: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<RemindersController>(RemindersController);
    service = module.get<RemindersService>(RemindersService);
  });


  describe('findOne', () => {
    it('should return a response', async () => {
      const req = {}; // Mock do objeto de requisição
      const result = await controller.findOne(req);

      expect(result).toBe('Bateu aqui');
    });
  });

  describe('remove', () => {
    it('should remove a reminder', async () => {
      const id = '1'; // Exemplo de ID

      const result = await controller.remove(id);

      expect(service.remove).toHaveBeenCalledWith(id);
      expect(result).toBe('Reminder removed');
    });
  });
});