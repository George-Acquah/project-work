import { Module } from '@nestjs/common';
import { StorageService } from 'src/storage/storage.service';
import { ImagesController } from './images.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [StorageService],
  controllers: [ImagesController]
})
export class ImagesModule {}
// export class ImagesModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(UploadMiddleware).forRoutes({
//       path: 'customer/vehicle/add',
//       method: RequestMethod.POST
//     });
//   }
// }
