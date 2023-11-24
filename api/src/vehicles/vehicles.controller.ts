import {
  Body,
  Controller,
  MaxFileSizeValidator,
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
import { ConfigService } from '@nestjs/config';

@Controller('customer/vehicle')
export class VehiclesController {
  constructor(
    private vehicleService: VehiclesService,
    private readonly uploadsService: UploadService,
    private configService: ConfigService,
  ) {}

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
      const { vehicleImageBucket } = this.configService.get('GCPStorageConfig');
      const images = await this.uploadsService.uploadFilesToDrive(
        files,
        vehicleImageBucket,
      );
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
