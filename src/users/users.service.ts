import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
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

  update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = this.usersRepository.update(id, updateUserDto);

    return updatedUser;
  }

  remove(id: string) {
    return this.usersRepository.delete(id);
  }
}
