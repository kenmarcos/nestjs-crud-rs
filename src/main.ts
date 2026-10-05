import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DomainErrorFilter } from './filters/domain-error.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { EnvService } from './env/env.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(EnvService);

  app.setGlobalPrefix('api');

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

  // Doc
  const config = new DocumentBuilder()
    .setTitle('Nest.js CRUD Documentation')
    .setDescription('Basic user management API.')
    .setVersion('1.0.0')
    .addBearerAuth() // adiciona o botão "Authorize" no Swagger UI
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, documentFactory, { useGlobalPrefix: true });

  const port = configService.get('PORT');
  await app.listen(port);
}
bootstrap();
