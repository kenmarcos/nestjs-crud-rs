import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: 1, name: 'John Doe', email: 'johndoe@gmail.com' },
  ];

  create(createUserDto: CreateUserDto) {
    const id = this.users[this.users.length - 1].id + 1;

    const user: User = {
      id,
      ...createUserDto,
    };

    this.users.push(user);

    return user;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      return 'User not found';
    }

    const userUpdated: User = {
      ...user,
      ...updateUserDto,
    };

    const userUpdatedIndex = this.users.indexOf(user);
    this.users[userUpdatedIndex] = userUpdated;

    return userUpdated;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
