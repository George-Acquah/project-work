import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Customer,
  CustomerSchema,
  ParkOwner,
  ParkOwnerSchema,
  User,
  UserSchema,
} from 'src/shared/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
        discriminators: [
          { name: ParkOwner.name, schema: ParkOwnerSchema },
          { name: Customer.name, schema: CustomerSchema },
        ],
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
