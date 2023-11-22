import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AddVehicleDto } from './dtos/add-vehicle.dto';
import { VehiclesService } from './vehicles.service';
import { User } from 'src/shared/decorators/user.decorator';
import { _ISanitizedCustomer } from 'src/shared/interfaces/users.interface';
import { JwtAuthGuard } from 'src/shared/guards/Jwt.guard';

@Controller('customer/vehicle')
export class VehiclesController {
  constructor(private vehicleService: VehiclesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async addVehicle(
    @Body() vehicleData: AddVehicleDto,
    @User() customer: _ISanitizedCustomer,
  ) {
    //TODO add new vehicle to customer vehicles
    const image = 'some-random-test-image'; // Image ID returned by cloud provider
    return await this.vehicleService.addVehicle(customer, vehicleData, image);
  }
}
