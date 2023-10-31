import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { swaggerOptions } from './infra/nestjs/config/swagger';
import { ValidationPipe } from '@nestjs/common';
import { GlobalExceptionHandler } from './infra/nestjs/modules/errors/global-exception-handler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      stopAtFirstError: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new GlobalExceptionHandler(app.get(HttpAdapterHost)));

  app.enableCors();

  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('doc', app, document);

  await app.listen(3333);
}
bootstrap();
