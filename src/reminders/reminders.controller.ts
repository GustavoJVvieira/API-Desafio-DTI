import { Controller, Get, Post, Body, Request, Param, Delete, UseGuards } from '@nestjs/common';
import { RemindersService } from './reminders.service';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('reminders')
@Controller('reminders')
export class RemindersController {
  constructor(private readonly remindersService: RemindersService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createReminderDto: CreateReminderDto, @Request() req: any) {
    return this.remindersService.create(createReminderDto, req);
  }

  @Get()
  @UseGuards(AuthGuard)
  findOne(@Request() req: any) {
    return this.remindersService.findOne(req);
    
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.remindersService.remove(id);
  }
}
