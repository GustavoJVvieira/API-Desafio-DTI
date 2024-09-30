import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma, User as UserModel} from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
//import { AuthGuard } from 'src/auth/auth.guard';


@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @Post()
  async signupUser(
    @Body() userData: Prisma.UserCreateInput,
  ): Promise<UserModel> {
    return this.usersService.create(userData);
  }
  
   //@UseGuards(AuthGuard)
   @Get(':id')
  async getUser(@Param('id') id: string): Promise<UserModel> {
    return this.usersService.user({ id: String(id) });
  }
}
