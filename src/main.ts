import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Project Ong API')
    .setDescription('API para gerenciamento de ONGs e voluntários')
    .setVersion('1.0')
    .addTag('auth', 'Autenticação de usuários')
    .addTag('users', 'Operações relacionadas aos usuários')
    .addTag('projects', 'Operações relacionadas aos projetos de voluntariado')
    .addTag('campaigns', 'Operações relacionadas às campanhas de doação')
    .addTag('ratings', 'Operações relacionadas às avaliações')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  console.log(`🚀 Server is running on port ${port}`);
}
void bootstrap();
