import { Prisma } from '../../generated/prisma/client';

export class User implements Prisma.UserUncheckedCreateInput {
  id?: string | undefined;
  email!: string;
  name?: string | null | undefined;
}
