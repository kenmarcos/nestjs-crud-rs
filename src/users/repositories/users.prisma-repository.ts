import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from './../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { UsersRepository } from './users.repository';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '../../generated/prisma/client';
import { EntityAlreadyExistsError } from '../../errors/entity-already-exists.error';
import { EntityNotFoundError } from '../../errors/entity-not-found.error';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersPrismaRepository implements UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<User> {
    try {
      const newUser = await this.prisma.user.create({
        data: {
          ...data,
          password: await bcrypt.hash(data.password, 10),
        },
      });

      return new User(newUser);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new EntityAlreadyExistsError(
          `User with e-mail '${data.email}' already exists.`,
        );
      }

      throw error;
    }
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();

    return users.map((user) => new User(user));
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    return user;
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    try {
      const updatedUser = await this.prisma.user.update({
        where: { id },
        data,
      });

      return new User(updatedUser);
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new EntityNotFoundError(`User with id '${id}' was not found.`);
      }

      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.user.delete({ where: { id } });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new EntityNotFoundError(`User with id '${id}' was not found.`);
      }

      throw error;
    }
  }
}
