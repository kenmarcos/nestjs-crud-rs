import { Exclude } from 'class-transformer';
import { Prisma } from '../../generated/prisma/client';

export class User implements Prisma.UserUncheckedCreateInput {
  id?: string | undefined;
  email!: string;
  name!: string;

  @Exclude()
  password!: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
