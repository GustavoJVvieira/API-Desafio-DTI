import { Module } from '@nestjs/common';

import { RemindersModule } from './reminders/reminders.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [RemindersModule, UsersModule, AuthModule, DbModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
