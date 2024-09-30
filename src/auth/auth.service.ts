import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}


    async signIn(params: Prisma.UserCreateInput): Promise<{access_token: string}> {
      const user = await this.usersService.user({ email: params.email });
  
      if (!user) {
        throw new NotFoundException('User not found');
      }
  
      const passwordMatch = await bcrypt.compare(params.password, user.password);
  
      if (!passwordMatch) {
        throw new UnauthorizedException('Invalid password'); // Usando UnauthorizedException
      }
  
      const payload = { sub: user.id};
      return { access_token: await this.jwtService.signAsync(payload)}
  
      };
  }
