import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PaymentConfig } from 'src/shared/configs/payment.config';
import { PaymentService } from './payment.service';
import { PaymentsController } from './payment.controller';
import { RootHttpModule } from 'src/shared/modules/http.module';

@Module({
  imports: [ConfigModule.forFeature(PaymentConfig), RootHttpModule],
  controllers: [PaymentsController],
  providers: [PaymentService]
})
export class PaymentsModule {}
