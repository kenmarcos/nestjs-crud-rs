import { PrismaPg } from '@prisma/adapter-pg';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma/client';
import { EnvService } from '../env/env.service';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);

  constructor(envService: EnvService) {
    const adapter = new PrismaPg({
      connectionString: envService.get('DATABASE_URL'),
    });
    super({ adapter });
  }

  async onModuleInit() {
    try {
      await this.$queryRaw`SELECT 1`;

      this.logger.log('Database connected successfully.');
    } catch (error) {
      this.logger.error('Failed to connect to the database.', error);

      throw error;
    }
  }
}
