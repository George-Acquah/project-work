import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ParkingModule } from './parking/parking.module';
import { RootMongooseModule } from './database/database.config';
import { UsersModule } from './users/users.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { StorageService } from './storage/storage.service';
import { ImagesModule } from './images/images.module';
import { MailModule } from './mail/mail.module';
import { NumberPlateModule } from './number-plate/number-plate.module';
import { RootHttpModule } from './shared/modules/http.module';
import { PaymentsModule } from './payment/payment.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    RootMongooseModule,
    RootHttpModule,
    AuthModule,
    ParkingModule,
    UsersModule,
    VehiclesModule,
    ImagesModule,
    MailModule,
    NumberPlateModule,
    PaymentsModule
  ],
  controllers: [AppController],
  providers: [AppService, StorageService]
})
export class AppModule {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
