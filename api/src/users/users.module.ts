import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod
} from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/shared/schemas/user.schema';
import { Profile, ProfileSchema } from 'src/shared/schemas/profile.schema';
import { Customer, CustomerSchema } from 'src/shared/schemas/customer.schema';
import { ParkOwner, ParkOwnerSchema } from 'src/shared/schemas/owner.schema';
import { UsersController } from './users.controller';
import {
  UserImage,
  UserImageSchema
} from 'src/shared/schemas/user-image.schema';
import { UploadService } from 'src/storage/uploads.service';
import { StorageService } from 'src/storage/storage.service';
import { UploadMiddleware } from 'src/shared/middlewares/uploads.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GCPStorageConfig } from 'src/storage/storage.config';
import { AggregationService } from 'src/aggregation.service';
import { TransactionService } from 'src/transaction.service';
import { MailService } from 'src/mail/mail.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema
      },
      { name: Profile.name, schema: ProfileSchema },
      { name: UserImage.name, schema: UserImageSchema }
    ]),
    ConfigModule.forFeature(GCPStorageConfig)
  ],
  controllers: [UsersController],
  providers: [
    {
      provide: getModelToken(Customer.name),
      useFactory: (usersModel) =>
        usersModel.discriminator(Customer.name, CustomerSchema),
      inject: [getModelToken(User.name)]
    },
    {
      provide: getModelToken(ParkOwner.name),
      useFactory: (usersModel) =>
        usersModel.discriminator(ParkOwner.name, ParkOwnerSchema),
      inject: [getModelToken(User.name)]
    },
    UsersService,
    UploadService,
    StorageService,
    ConfigService,
    AggregationService,
    TransactionService,
    MailService
  ],
  exports: [UsersService]
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UploadMiddleware).forRoutes(
      {
        path: 'users/set-image',
        method: RequestMethod.POST
      },
      {
        path: 'users/:id/update',
        method: RequestMethod.PUT
      }
    );
  }
}
