import { Inject, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/db/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

@Inject()
private readonly prisma: PrismaService;

async create(data: Prisma.UserCreateInput) {
const hashPassword = await bcrypt.hash(data.password, 10);

  return this.prisma.user.create({ data:{
    ...data, password: hashPassword
  }});
}

async update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
    }) {
    const { where, data } = params;
    return this.prisma.user.update({ where, data });
}

async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise< User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }
}
