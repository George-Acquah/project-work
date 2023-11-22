import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';

const RootMongooseModule = MongooseModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => {
    const uri = configService.get<string>(
      process.env.NODE_ENV === 'production'
        ? 'MONGODB_URI_PROD'
        : 'MONGODB_URI_DEV',
    );

    try {
      await mongoose.connect(uri);

      console.log('MongoDB connected successfully:', uri);

      // Optionally, log connection details if needed
      return {
        uri,
      };
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw error; // Rethrow the error to indicate connection failure
    }
  },
  inject: [ConfigService],
});

export { RootMongooseModule };
