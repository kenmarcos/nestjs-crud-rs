import { plainToInstance, Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  validateSync,
} from 'class-validator';

export class Env {
  @Type(() => Number)
  @IsNumber()
  PORT!: number;

  @IsUrl({
    protocols: ['postgres', 'postgresql', 'mysql', 'file'],
    require_tld: false,
  })
  DATABASE_URL!: string;

  @IsString()
  @IsNotEmpty()
  SECRET_KEY!: string;
}

export function validateEnv(config: Record<string, unknown>): Env {
  const env = plainToInstance(Env, config);
  const errors = validateSync(env);

  if (errors.length > 0) {
    const messages = errors.flatMap((error) =>
      Object.values(error.constraints ?? {}).map((message) => `  - ${message}`),
    );

    throw new Error(`Invalid environment variables:\n${messages.join('\n')}`);
  }

  return env;
}
