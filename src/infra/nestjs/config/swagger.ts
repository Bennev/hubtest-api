import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerOptions = new DocumentBuilder()
  .setTitle('Hubtest API')
  .setDescription('Hubtest API developed by Matheus Benevides')
  .setVersion('1.0')
  .addTag('user')
  .addTag('auth')
  .addTag('company')
  .addTag('location')
  .build();
