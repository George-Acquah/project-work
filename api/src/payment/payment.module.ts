import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PaymentConfig } from 'src/shared/configs/payment.config';
import { PaymentService } from './payment.service';
import { PaymentsController } from './payment.controller';
import { RootHttpModule } from 'src/shared/modules/http.module';
import { JwtService } from '@nestjs/jwt';
import { ParkingModule } from 'src/parking/parking.module';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Transaction,
  TransactionSchema
} from 'src/shared/schemas/transaction.schema';

@Module({
  imports: [
    ConfigModule.forFeature(PaymentConfig),
    RootHttpModule,
    ParkingModule,
    MongooseModule.forFeature([
      {
        name: Transaction.name,
        schema: TransactionSchema
      }
    ])
  ],
  controllers: [PaymentsController],
  providers: [PaymentService, JwtService]
})
export class PaymentsModule {}
