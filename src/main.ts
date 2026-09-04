import 'dotenv/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DomainErrorFilter } from './filters/domain-error.filter';

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

  // Filters
  app.useGlobalFilters(new DomainErrorFilter());

  // Interceptors
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
