import {
  Body,
  Controller,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { AddVehicleDto } from './dtos/add-vehicle.dto';
import { VehiclesService } from './vehicles.service';
import { User } from 'src/shared/decorators/user.decorator';
import { _ISanitizedCustomer } from 'src/shared/interfaces/users.interface';
import { VehicleAuthGuard } from 'src/shared/guards/vehicles.guard';
import { UploadService } from 'src/storage/uploads.service';
import { ApiResponse } from 'src/shared/services/api-responses';

@Controller('customer/vehicle')
export class VehiclesController {
  constructor(
    private vehicleService: VehiclesService,
    private readonly uploadsService: UploadService,
  ) {}

  @UseGuards(VehicleAuthGuard)
  @Get()
  async getAllVehicles() {
    const vehicles = await this.vehicleService.getAllVehicles();
    return new ApiResponse(200, 'Fetched vehicles Successfully', vehicles);
  }

  @UseGuards(VehicleAuthGuard)
  @Get('driver')
  async getVehiclesOfDriver(@User() driver: _ISanitizedCustomer) {
    try {
      const vehicles = await this.vehicleService.getDriverVehicles(driver._id);
      return new ApiResponse(200, 'Fetched vehicles Successfully', vehicles);
    } catch (error) {
      return new ApiResponse(error.statusCode, error.message, {});
    }
  }

  @UseGuards(VehicleAuthGuard)
  @Get(':id')
  async getSinglevehicle(@Param() id: string) {
    try {
      const vehicles = await this.vehicleService.getSingleVehicle(id);
      return new ApiResponse(200, 'Fetched vehicles Successfully', vehicles);
    } catch (error) {
      return new ApiResponse(error.statusCode, error.message, {});
    }
  }

  @UseGuards(VehicleAuthGuard)
  @Post('add')
  async addVehicle(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          // ... Set of file validator instances here
          new MaxFileSizeValidator({ maxSize: 2000 * 1024 }),
        ],
      }),
    )
    files: Express.Multer.File[],
    @Body() vehicleData: AddVehicleDto,
    @User() customer: _ISanitizedCustomer,
  ) {
    try {
      const images = await this.uploadsService.uploadFilesToDrive(files);
      if (images.length < 1) {
        return new ApiResponse(400, 'No images were uploaded.', {});
      }
      const result = await this.vehicleService.addVehicle(
        customer._id,
        vehicleData,
        images,
      );

      return new ApiResponse(200, 'Vehicle added successfully', result);
    } catch (error) {
      return new ApiResponse(
        error.statusCode || 400,
        error.message || 'An error ocurred while adding your vehicle',
        {},
      );
    }
  }
}
