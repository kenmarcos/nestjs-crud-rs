import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { EntityNotFoundError } from '../errors/entity-not-found.error';
import { UsersRepository } from './repositories/users.repository';

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

  findOne(id: string) {
    const user = this.usersRepository.findById(id);

    return user;
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   const user = this.users.find((user) => user.id === id);

  //   if (!user) {
  //     throw new EntityNotFoundError(`User with id #${id} was not found.`);
  //   }

  //   const userUpdated: User = {
  //     ...user,
  //     ...updateUserDto,
  //   };

  //   const userUpdatedIndex = this.users.indexOf(user);
  //   this.users[userUpdatedIndex] = userUpdated;

  //   return userUpdated;
  // }

  // remove(id: number) {
  //   const user = this.users.find((user) => user.id === id);

  //   if (!user) {
  //     throw new EntityNotFoundError(`User with id #${id} was not found.`);
  //   }

  //   const userUpdatedIndex = this.users.indexOf(user);
  //   this.users.splice(userUpdatedIndex, 1);
  // }
}
