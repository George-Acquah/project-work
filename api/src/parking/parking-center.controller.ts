import {
  Controller,
  Logger,
  Post,
  Put,
  Body,
  Param,
  Get,
} from '@nestjs/common';
import { ParkingCenterService } from './parking-center.service';
import { SlotService } from './slots.service';
import { ApiResponse } from 'src/shared/services/api-responses';
import { User } from 'src/shared/decorators/user.decorator';
import { _ISanitizedCustomer } from 'src/shared/interfaces/users.interface';

@Controller('owner/parking-center')
export class ParkingCenterController {
  private logger = new Logger(ParkingCenterController.name);

  constructor(
    private readonly parkingService: ParkingCenterService,
    private readonly slotService: SlotService,
  ) {}

  @Post()
  async addCenter(@Body() data: any, @User() owner: _ISanitizedCustomer) {
    try {
      const centerId = await this.parkingService.addCenter(
        owner._id.toString(),
        data,
      );
      return new ApiResponse(200, 'Center Added Successfully', centerId);
    } catch (error) {
      this.logger.error(`Error adding parking center: ${error.message}`);
      return new ApiResponse(error.statusCode || 501, error.message, {});
    }
  }

  @Get()
  async getAllParkingCenters() {
    try {
      this.logger.log(`All Parking Centers`);
      const centers = await this.parkingService.getAllParkingCenters();
      return new ApiResponse(200, 'Fetched Parking Centers', centers);
    } catch (error) {
      this.logger.error(`Error getting all parking centers: ${error.message}`);
      throw error;
    }
  }

  @Put()
  async updateCenter(@Body() data: any) {
    try {
      // await this.parkingService.updateCenter(data);
      this.logger.log(`Update Center ${data}`);
      return { message: 'Parking center updated successfully' };
    } catch (error) {
      this.logger.error(`Error updating parking center: ${error.message}`);
      throw error;
    }
  }

  @Post('add-slot')
  async addSlot(@Body() data: any) {
    try {
      const slotId = await this.slotService.addSlot(data.center_id, data.slot);
      return { slotId };
    } catch (error) {
      this.logger.error(`Error adding slot: ${error.message}`);
      throw error;
    }
  }

  @Put('update-slot')
  async updateSlot(@Body() data: any) {
    try {
      // await this.slotService.updateSlot(data);
      this.logger.error(`Update Slot: ${data}`);
      return { message: 'Slot updated successfully' };
    } catch (error) {
      this.logger.error(`Error updating slot: ${error.message}`);
      throw error;
    }
  }

  @Post('add-center-image')
  async addParkingCenterImage(@Body() data: any) {
    try {
      // await this.parkingService.addCenterImage(data);
      this.logger.error(`Add Center Image: ${data}`);
      return { message: 'Center image added successfully' };
    } catch (error) {
      this.logger.error(`Error adding center image: ${error.message}`);
      throw error;
    }
  }

  @Post('add-slot-image/:slot_id')
  async addSlotImage(@Body() data: any, @Param() slot_id: string) {
    try {
      await this.slotService.addSlotImages(data, slot_id);
      return { message: 'Slot image added successfully' };
    } catch (error) {
      this.logger.error(`Error adding slot image: ${error.message}`);
      throw error;
    }
  }

  @Post('add-slot-data')
  async addSlotData(@Body() data: any) {
    try {
      // await this.slotService.addSlotData(data);
      this.logger.error(`Add Slot Data: ${data}`);
      return { message: 'Slot data added successfully' };
    } catch (error) {
      this.logger.error(`Error adding slot data: ${error.message}`);
      throw error;
    }
  }

  @Put('update-slot-data')
  async updateSlotData(@Body() data: any) {
    try {
      // await this.slotService.updateSlotData(data);
      this.logger.error(`Update Slot Data: ${data}`);
      return { message: 'Slot data updated successfully' };
    } catch (error) {
      this.logger.error(`Error updating slot data: ${error.message}`);
      throw error;
    }
  }

  @Get(':center_id')
  async getParkingCenter(@Param('center_id') centerId: string) {
    try {
      const center = await this.parkingService.getSingleParkingCenter(centerId);
      this.logger.error(`Get A Parking Center: ${centerId}`);
      return new ApiResponse(200, 'Fetched Center Successfully', center);
    } catch (error) {
      this.logger.error(`Error getting parking center: ${error.message}`);
      return new ApiResponse(error.statusCode || 501, error.message, {});
    }
  }

  @Get(':center_id/images')
  async getCenterImages(@Param('center_id') centerId: string) {
    try {
      // const images = await this.parkingService.getCenterImages(centerId);
      this.logger.error(`Get Center Images: ${centerId}`);
      // return { images };
    } catch (error) {
      this.logger.error(`Error getting center images: ${error.message}`);
      return new ApiResponse(error.statusCode || 501, error.message, {});
    }
  }

  @Get(':center_id/slots')
  async getSlotsForCenter(@Param('center_id') centerId: string) {
    try {
      const slots = await this.slotService.getSlotsForCenter(centerId);
      return new ApiResponse(200, 'Fetched Slots Successfully', slots);
    } catch (error) {
      this.logger.error(`Error getting slots for center: ${error.message}`);
      return new ApiResponse(error.statusCode || 501, error.message, {});
    }
  }

  @Get(':center_id/slots/:slot_id')
  async getSlotDetails(
    @Param('center_id') centerId: string,
    @Param('slot_id') slotId: string,
  ) {
    try {
      this.logger.error(`Get Slot Images: ${centerId} ${slotId}`);
      const slot = await this.slotService.getSlotDetails(centerId, slotId);
      return new ApiResponse(200, 'Fetched Slot Successfully', slot);
    } catch (error) {
      this.logger.error(`Error getting slot details: ${error.message}`);
      return new ApiResponse(error.statusCode || 501, error.message, {});
    }
  }

  @Get(':center_id/slots/:slot_id/bookings')
  async getSlotBookings(
    @Param('center_id') centerId: string,
    @Param('slot_id') slotId: string,
  ) {
    try {
      this.logger.error(`Get Slot Images: ${centerId} ${slotId}`);
      // const bookings = await this.slotService.getSlotBookings(centerId, slotId);
      // return { bookings };
    } catch (error) {
      this.logger.error(`Error getting slot bookings: ${error.message}`);
      return new ApiResponse(error.statusCode || 501, error.message, {});
    }
  }

  @Get(':center_id/slots/:slot_id/data')
  async getSlotData(
    @Param('center_id') centerId: string,
    @Param('slot_id') slotId: string,
  ) {
    try {
      this.logger.error(`Get Slot Images: ${centerId} ${slotId}`);
      const slotData = await this.slotService.getSlotData(centerId, slotId);
      return new ApiResponse(200, 'Fetched Data Successfully', slotData);
    } catch (error) {
      this.logger.error(`Error getting slot data: ${error.message}`);
      return new ApiResponse(error.statusCode || 501, error.message, {});
    }
  }

  @Get(':center_id/slots/:slot_id/images')
  async getSlotImages(
    @Param('center_id') centerId: string,
    @Param('slot_id') slotId: string,
  ) {
    try {
      // const images = await this.slotService.getSlotImages(centerId, slotId);
      this.logger.error(`Get Slot Images: ${centerId} ${slotId}`);
      // return { images };
    } catch (error) {
      this.logger.error(`Error getting slot images: ${error.message}`);
      return new ApiResponse(error.statusCode || 501, error.message, {});
    }
  }
}
