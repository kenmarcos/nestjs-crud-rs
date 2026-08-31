import { Global, Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Global()
@Module({
  providers: [PrismaService], // "NestJS, crie a instância do PrismaService aqui detro do módulo do Prisma"
  exports: [PrismaService], //  "NestJS, compartilhe ESSA MESMA instância com quem importar o módulo do Prisma"
})
export class PrismaModule {}
