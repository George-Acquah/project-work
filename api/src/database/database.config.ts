import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

const RootMongooseModule = MongooseModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    uri: configService.get<string>(
      process.env.NODE_ENV === 'production'
        ? 'MONGODB_URI_PROD'
        : 'MONGODB_URI_DEV',
    ),
  }),
  inject: [ConfigService],
});

export { RootMongooseModule };
