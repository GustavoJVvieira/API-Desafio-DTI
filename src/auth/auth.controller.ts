import { Body, Controller, Post, Res } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Login')
@Controller()
export class AuthController {
constructor(private readonly authService: AuthService) {}
        @Post()
        sigin(@Body() body: Prisma.UserCreateInput) {
          return this.authService.signIn(body);
      }
    }
