import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArduinoModule } from './arduino/arduino.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ParkingModule } from './parking/parking.module';
import { RootMongooseModule } from './database/database.config';
import { UsersModule } from './users/users.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { StorageService } from './storage/storage.service';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    RootMongooseModule,
    ArduinoModule,
    AuthModule,
    ParkingModule,
    UsersModule,
    VehiclesModule,
  ],
  controllers: [AppController],
  providers: [AppService, StorageService],
})
export class AppModule {
  constructor() {
    const logger = new Logger();
    logger.log('App Module Connected and running.');
  }
}
