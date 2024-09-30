import { forwardRef, Module } from '@nestjs/common';
import { RemindersService } from './reminders.service';
import { RemindersController } from './reminders.controller';
import { DbModule } from 'src/db/db.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [forwardRef(() => DbModule), forwardRef(() => AuthModule)],
  controllers: [RemindersController],
  providers: [RemindersService],
})
export class RemindersModule {}

