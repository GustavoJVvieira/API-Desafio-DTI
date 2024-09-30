import { forwardRef, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [forwardRef(() => UsersModule)],  // Use forwardRef aqui
  providers: [PrismaService],
  exports: [PrismaService],
})
export class DbModule {}