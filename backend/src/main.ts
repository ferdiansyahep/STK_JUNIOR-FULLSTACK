import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set global prefix agar semua endpoint dimulai dengan /api
  app.setGlobalPrefix('api');

  // Enable CORS agar frontend Next.js bisa nembak API
  app.enableCors();

  // Aktifkan validasi otomatis dari DTO
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Konfigurasi Swagger Documentation
  const config = new DocumentBuilder()
    .setTitle('STK Menu API')
    .setDescription('The Menu Tree System API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
}
bootstrap();