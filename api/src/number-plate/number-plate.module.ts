import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { NumberPlateController } from './number-plate.controller';
import { NumberPlateService } from './number-plate.service';
import { AggregationService } from 'src/aggregation.service';
import { ParkingModule } from 'src/parking/parking.module';
import { ConfigModule } from '@nestjs/config';
import { ApiKeyGuard } from 'src/shared/guards/api-key.guard';

@Module({
  imports: [
    ParkingModule,
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot([
      {
        ttl: 60, // Time to live in seconds
        limit: 1 // Maximum number of requests within the ttl
      }
    ])
  ],
  controllers: [NumberPlateController],
  providers: [NumberPlateService, AggregationService, ApiKeyGuard]
})
export class NumberPlateModule {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
