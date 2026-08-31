import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { EntityNotFoundInterceptor } from './interceptors/entity-not-found.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // permite que o Nest faça transformação dos valores recebidos de acordo com o tipo definido no DTO
      whitelist: true, // remove propriedades que não possuem decorators de validação no DTO
      forbidNonWhitelisted: true, // rejeita propriedades que não possuem decorators de validação no DTO
    }),
  );

  // Interceptors
  app.useGlobalInterceptors(new EntityNotFoundInterceptor());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
