import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
// import { SocketIOAdapter } from './socket-io-adapter';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = parseInt(configService.get('PORT')) ?? 8080;
  const clientPort = parseInt(configService.get('CLIENT_PORT'));
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: [
      `https://admin-p4oeztn5a-georgeacquahs-projects.vercel.app`,
      new RegExp(`^http:\/\/192\.168\.43\.([1-9]|[1-9]\d):${clientPort}$`),
      new RegExp(
        `^https:\/\/admin-p4oeztn5a-georgeacquahs-projects\.vercel\.app$`
      )
    ]
  });

  // app.useWebSocketAdapter(new SocketIOAdapter(app, configService));

  await app.listen(port, () => {
    logger.log(`Server is running on port ${port}`);
  });
}
bootstrap();
