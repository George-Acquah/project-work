import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/shared/schemas/user.schema';
import { Profile, ProfileSchema } from 'src/shared/schemas/profile.schema';
import { Customer, CustomerSchema } from 'src/shared/schemas/customer.schema';
import { ParkOwner, ParkOwnerSchema } from 'src/shared/schemas/owner.schema';
import { UsersController } from './users.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      { name: Profile.name, schema: ProfileSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [
    {
      provide: getModelToken(Customer.name),
      useFactory: (usersModel) =>
        usersModel.discriminator(Customer.name, CustomerSchema),
      inject: [getModelToken(User.name)],
    },
    {
      provide: getModelToken(ParkOwner.name),
      useFactory: (usersModel) =>
        usersModel.discriminator(ParkOwner.name, ParkOwnerSchema),
      inject: [getModelToken(User.name)],
    },
    UsersService,
  ],
  exports: [UsersService],
})
export class UsersModule {}
