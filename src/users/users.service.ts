import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repositories/users.repository';
import { EntityNotFoundError } from '../errors/entity-not-found.error';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  create(createUserDto: CreateUserDto) {
    const newUser = this.usersRepository.create(createUserDto);

    return newUser;
  }

  findAll() {
    const users = this.usersRepository.findAll();

    return users;
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new EntityNotFoundError(`User with id '${id}' was not found.`);
    }

    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = this.usersRepository.update(id, updateUserDto);

    return updatedUser;
  }

  remove(id: string) {
    return this.usersRepository.delete(id);
  }
}
