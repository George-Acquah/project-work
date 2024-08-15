/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AggregationService } from 'src/aggregation.service';
import { _IDbSlotReservation } from 'src/shared/interfaces/slot.interface';
import { SlotReservation } from 'src/shared/schemas/slot-reservation.schema';

@Injectable()
export class NumberPlateService {
  constructor(
    @InjectModel(SlotReservation.name)
    private slotReservationModel: Model<_IDbSlotReservation>,
    private readonly aggregationService: AggregationService
  ) {}
  async verifyNumberPlate(number_plate: string): Promise<boolean> {
    const verifiedPlate =
      await this.aggregationService.checkIfNumberPlateExistsAggregation(
        this.slotReservationModel,
        number_plate
      );
    console.log(verifiedPlate);
    if (verifiedPlate) {
      return true;
    }
    return false;
  }
}
