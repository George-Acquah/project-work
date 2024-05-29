/* eslint-disable prettier/prettier */
import {
  Controller,
  Logger,
  Post,
  Put,
  Body,
  Param,
  Get,
  UseGuards,
  MaxFileSizeValidator,
  ParseFilePipe,
  UploadedFiles,
  Query,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { ParkingCenterService } from './parking-center.service';
import { SlotService } from './slots.service';
import { ApiResponse } from 'src/shared/services/api-responses';
import { User } from 'src/shared/decorators/user.decorator';
import { _ISanitizedCustomer } from 'src/shared/interfaces/users.interface';
import { AddCenterDto, AddSlotDto } from './dtos/add-center.dto';
import { ParkingCenterGuard } from 'src/shared/guards/centers.guard';
import { UploadService } from 'src/storage/uploads.service';
import { ReservationRequestDto } from './dtos/reservation-requests.dto';
import { _IAddCenterAddress, _IReserveSlot } from 'src/shared/interfaces/slot.interface';
import { JwtAuthGuard } from 'src/shared/guards/Jwt.guard';
import { TransformDateInterceptor } from 'src/shared/interceptors/transform-date.interceptor';
import { CreateSlotAddressDto } from './dtos/create-slot-address.dto';

@Controller('owner/parking-center')
export class ParkingCenterController {
  private logger = new Logger(ParkingCenterController.name);

  constructor(
    private readonly parkingService: ParkingCenterService,
    private readonly slotService: SlotService,
    private readonly uploadService: UploadService
  ) {}

  @UseGuards(ParkingCenterGuard)
  @Post()
  async addCenter(
    @Body() data: AddCenterDto,
    @User() owner: _ISanitizedCustomer
  ) {
    try {
      const centerId = await this.parkingService.addCenter(
        owner._id.toString(),
        data
      );
      return new ApiResponse(200, 'Center Added Successfully', centerId);
    } catch (error) {
      this.logger.error(`Error adding parking center: ${error.message}`);
      return new ApiResponse(error.statusCode || 501, error.message, {});
    }
  }

  @Get()
  async getAllParkingCenters(
    @Query('centers') query: string,
    @Query('currentPage') currentPage: number,
    @Query('size') size: number
  ) {
    try {
      this.logger.log(`All Parking Centers`);
      const centers = await this.parkingService.getAllParkingCenters(
        query,
        currentPage,
        size
      );
      return new ApiResponse(200, 'Fetched Parking Centers', centers);
    } catch (error) {
      this.logger.error(`Error getting all parking centers: ${error.message}`);
      throw error;
    }
  }

  @Get('available')
  async getAvailableParkingCenters(
    @Query('centers') query: string,
    @Query('currentPage') currentPage: string,
    @Query('size') size: string
  ) {
    try {
      this.logger.log(`All Parking Centers`);
      const centers = await this.parkingService.getAvailableParkingCenters(
        query,
        parseInt(currentPage),
        parseInt(size)
      );
      return new ApiResponse(200, 'Fetched Available Parking Centers', centers);
    } catch (error) {
      this.logger.error(
        `Error getting available parking centers: ${error.message}`
      );
      throw error;
    }
  }

  @Get('popular')
  async getPopularParkingCenters(
    @Query('centers') query: string,
    @Query('currentPage') currentPage: string,
    @Query('size') size: string
  ) {
    try {
      const centers = await this.parkingService.getPopularParkingCenters(
        query,
        parseInt(currentPage),
        parseInt(size)
      );
      return new ApiResponse(200, 'Fetched Popular Parking Centers', centers);
    } catch (error) {
      this.logger.error(
        `Error getting popular parking centers: ${error.message}`
      );
      throw error;
    }
  }

  @Get('nearby')
  async getNearbyParkingCenters(
    @Query('centers') query: string,
    @Query('currentPage') currentPage: string,
    @Query('size') size: string
  ) {
    try {
      const centers = await this.parkingService.getPopularParkingCenters(
        query,
        parseInt(currentPage),
        parseInt(size)
      );
      return new ApiResponse(200, 'Fetched Nearby Parking Centers', centers);
    } catch (error) {
      this.logger.error(
        `Error fetching nearby parking centers: ${error.message}`
      );
      throw error;
    }
  }

  @Get('slots')
  async getAllSlots(
    @Query('slots') query: string,
    @Query('currentPage') currentPage: number,
    @Query('size') size: number
  ) {
    try {
      this.logger.log(`All Slots`, query, currentPage, size);
      const slots = await this.slotService.getAllSlots();
      return new ApiResponse(200, 'Fetched Slots successfully', slots);
    } catch (error) {
      this.logger.error(`Error getting all slots: ${error.message}`);
      return new ApiResponse(error.statusCode, error.message, {});
    }
  }

  @UseGuards(ParkingCenterGuard)
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

  @UseGuards(ParkingCenterGuard)
  @Post('add-slot/:center_id')
  async addSlot(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          // ... Set of file validator instances here
          new MaxFileSizeValidator({ maxSize: 2000 * 1024 })
        ]
      })
    )
    files: Express.Multer.File[],
    @Body() data: AddSlotDto,
    @Param() param: { center_id: string }
  ) {
    try {
      const { center_id } = param;
      const slotId = await this.slotService.addSlot(center_id, data);

      if (!slotId) {
        return new ApiResponse(500, 'An error has occured', {});
      }

      const images = await this.uploadService.uploadFilesToDrive(files);
      if (images.length < 1) {
        return new ApiResponse(400, 'No images were uploaded.', {});
      }

      const imageRes = await this.slotService.addSlotImages(images, slotId);
      return new ApiResponse(200, 'Added slot to center successfully', {
        slotId,
        imageRes
      });
    } catch (error) {
      this.logger.error(`Error adding slot: ${error.message}`);
      throw error;
    }
  }

  @UseGuards(ParkingCenterGuard)
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

  @UseGuards(ParkingCenterGuard)
  @Post('add-center-image/:center_id')
  async addParkingCenterImage(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          // ... Set of file validator instances here
          new MaxFileSizeValidator({ maxSize: 2000 * 1024 })
        ]
      })
    )
    files: Express.Multer.File[],
    @Param() { center_id }: { center_id: string }
  ) {
    try {
      const images = await this.uploadService.uploadFilesToDrive(files);
      if (images.length < 1) {
        return new ApiResponse(400, 'No images were uploaded.', {});
      }

      await this.parkingService.addCenterImages(images, center_id);
      return new ApiResponse(200, 'Center images added successfully', {});
    } catch (error) {
      this.logger.error(`Error adding center image: ${error.message}`);
      throw error;
    }
  }

  @UseGuards(ParkingCenterGuard)
  @Post('add-slot-image/:slot_id')
  async addSlotImage(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          // ... Set of file validator instances here
          new MaxFileSizeValidator({ maxSize: 2000 * 1024 })
        ]
      })
    )
    files: Express.Multer.File[],
    @Param() { slot_id }: { slot_id: string }
  ) {
    try {
      const images = await this.uploadService.uploadFilesToDrive(files);
      if (images.length < 1) {
        return new ApiResponse(400, 'No images were uploaded.', {});
      }
      await this.slotService.addSlotImages(images, slot_id);
      return new ApiResponse(200, 'Slot images added successfully', {});
    } catch (error) {
      this.logger.error(`Error adding slot image: ${error.message}`);
      return new ApiResponse(error.statusCode || 501, error.message, {});
    }
  }

  @UseGuards(ParkingCenterGuard)
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

  @UseGuards(ParkingCenterGuard)
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
      this.logger.error(`Get A Parking Center: ${centerId}`);
      const center =
        await this.parkingService.getSingleParkingCenterByAggregatiom(centerId);
      return new ApiResponse(200, 'Fetched Center Successfully', center);
    } catch (error) {
      this.logger.error(`Error getting parking center: ${error.message}`);
      return new ApiResponse(error.statusCode || 501, error.message, {});
    }
  }

  //TODO implement and test this endpoint
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

  @UseGuards(ParkingCenterGuard)
  @Post(':center_id/add-address')
  async addCenterAddress(
    @Param('center_id') center_id: string,
    @Body() data: _IAddCenterAddress
  ) {
    try {
      const arg = {
        center_id,
        ...data
      };
      const address = await this.parkingService.addCenterAddress(arg);

      return new ApiResponse(200, 'Address Added Succesfully', address);
    } catch (error) {
      this.logger.error(`Error getting all available slots: ${error.message}`);
      throw error;
    }
  }

  @UseGuards(ParkingCenterGuard)
  @Put(':center_id/update-address')
  async updateCenterAddress(
    @Param('center_id') center_id: string,
    @Query('address_id') address_id: string,
    @Body() data: _IAddCenterAddress
  ) {
    try {
      const arg = {
        center_id,
        ...data
      };
      const address = await this.parkingService.updateCenterAddress(
        arg,
        address_id
      );

      return new ApiResponse(200, 'Address Added Succesfully', address);
    } catch (error) {
      this.logger.error(`Error getting all available slots: ${error.message}`);
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post(':center_id/available-slots')
  @UseInterceptors(TransformDateInterceptor)
  async requestReservation(
    @Param('center_id') centerId: string,
    @Query('currentPage', new ParseIntPipe()) currentPage,
    @Query('size', new ParseIntPipe()) size,
    @Body() data: ReservationRequestDto
  ) {
    try {
      const { start_time, reservation_duration } = data;
      const slotsWithPages = await this.slotService.findAvailableSlots(
        centerId,
        start_time,
        reservation_duration,
        currentPage,
        size
      );
      // const totalPages = await this.slotService.fetchSlotsPage(centerId, size);
      return new ApiResponse(200, 'Fetched Available Slots', slotsWithPages);
    } catch (error) {
      return new ApiResponse(
        error.statusCode || 402,
        `Error getting all available slots: ${error.message}`,
        {}
      );
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
    @Param('slot_id') slotId: string
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

  @UseGuards(ParkingCenterGuard)
  @Post(':center_id/slots/:slot_id/reserve-slot')
  async reserveSlot(
    @Param('center_id') center_id: string,
    @Param('slot_id') slot_id: string,
    @Query('vehicle_id') vehicle_id: string,
    @Body() data: ReservationRequestDto
  ) {
    try {
      this.logger.error(
        `Get Slot Images: ${center_id} ${slot_id} ${vehicle_id}`
      );
      const reservation_data: _IReserveSlot = {
        center_id,
        slot_id,
        vehicle_id,
        start_time: new Date(data.start_time),
        reservation_duration: data.reservation_duration
      };
      const reservation = await this.slotService.reserveParkingSlot(
        reservation_data
      );
      return new ApiResponse(
        200,
        'You have successfully reserved this slot',
        reservation
      );
    } catch (error) {
      this.logger.error(`Error getting slot bookings: ${error.message}`);
      return new ApiResponse(error.statusCode || 501, error.message, {});
    }
  }

  @UseGuards(ParkingCenterGuard)
  @Post(':center_id/slots/:slot_id/add-address')
  async addSlotAddress(
    @Param('center_id') center_id: string,
    @Param('slot_id') slot_id: string,
    @Body() data: CreateSlotAddressDto
  ) {
    try {
      this.logger.error(`Add slot address: ${center_id} ${slot_id}`);

      const response = await this.slotService.createSlotAddress(slot_id, data);
      this.logger.warn(response);

      return new ApiResponse(
        200,
        'You have successfully reserved this slot',
        response
      );
    } catch (error) {
      this.logger.error(`${error.message}`);
      return new ApiResponse(error.statusCode || 501, error.message, {});
    }
  }
  //TODO implement and test this endpoint
  @Get(':center_id/slots/:slot_id/reservations')
  async getAllSlotBookings(
    @Param('center_id') centerId: string,
    @Param('slot_id') slotId: string
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

  @Get(':center_id/slots/:slot_id/reservations/:reservation_id')
  async getSlotBooking(@Param('reservation_id') reservationId: string) {
    try {
      const reservation = await this.slotService.getSlotReservation(
        reservationId
      );
      // return { bookings };
      return new ApiResponse(
        200,
        'Reservation Fetched Successfully',
        reservation
      );
    } catch (error) {
      this.logger.error(`Error getting slot bookings: ${error.message}`);
      return new ApiResponse(error.statusCode || 501, error.message, {});
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':center_id/slots/:slot_id/data')
  async getSlotData(
    @Param('center_id') centerId: string,
    @Param('slot_id') slotId: string
  ) {
    try {
      const slotData = await this.slotService.getSlotData(centerId, slotId);
      return new ApiResponse(200, 'Fetched Data Successfully', slotData);
    } catch (error) {
      return new ApiResponse(error.statusCode || 501, error.message, {});
    }
  }

  //TODO implement and test this endpoint
  @Get(':center_id/slots/:slot_id/images')
  async getSlotImages(
    @Param('center_id') centerId: string,
    @Param('slot_id') slotId: string
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
