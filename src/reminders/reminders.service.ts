import { Injectable, Request } from '@nestjs/common';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';
import { PrismaService } from '../db/prisma.service';

@Injectable()
export class RemindersService {
  findRemindersByUserId(sub: any) {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly prisma: PrismaService) {}



  async create(createReminderDto: CreateReminderDto, req : any) {
    console.log(req.sub.sub)
    return await this.prisma.reminders.create({
      data: {...createReminderDto, userId : req.sub.sub} 
  })

  }

  async findAll() {
    return await this.prisma.reminders.findMany();
  }

  async findOne(req: any) {
    const userID = req.sub.sub;
    return await this.prisma.reminders.findMany({where: { userId: userID}});
  }

  async update(id: string, updateReminderDto: UpdateReminderDto) {
    const userId = "teste";
    
    return await this.prisma.reminders.update({
      where: { id },
      data: {...updateReminderDto, userId }
  })
  }

  async remove(id: string) {
    return await this.prisma.reminders.delete({where: { id }});
  }
}
