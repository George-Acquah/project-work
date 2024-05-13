/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ConflictException,
  Injectable,
  Logger,
  NotAcceptableException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AggregationService } from 'src/aggregation.service';
import {
  _ICloudRes,
  _IDbVehicleImage
} from 'src/shared/interfaces/images.interface';
import { _ILookup } from 'src/shared/interfaces/responses.interface';
import {
  _IAddVehicle,
  _IDbVehicle,
  _IDbVehicleInsurance,
  _IDbVehicleNew,
  _IDbVehicleRegistration,
  _INewVehicle,
  _IVehicle,
  _IVehicleNew
} from 'src/shared/interfaces/vehicles.interface';
import { VehicleImage } from 'src/shared/schemas/vehicle-image.schema';
import { VehicleInsurance } from 'src/shared/schemas/vehicle-insurance.schema';
import { VehicleRegistration } from 'src/shared/schemas/vehicle-registration.schema';
import { Vehicle } from 'src/shared/schemas/vehicle.schema';
import {
  sanitizeVehicles,
  sanitizevehicle
} from 'src/shared/utils/vehicles.utils';
import { StorageService } from 'src/storage/storage.service';

@Injectable()
export class VehiclesService {
  private logger = new Logger();
  constructor(
    @InjectModel(Vehicle.name) private vehicleModel: Model<_IDbVehicleNew>,
    @InjectModel(VehicleImage.name)
    private vehicleImageModel: Model<_IDbVehicleImage[]>,
    @InjectModel(VehicleInsurance.name)
    private vehicleInsuranceModel: Model<_IDbVehicleInsurance>,
    @InjectModel(VehicleRegistration.name)
    private vehicleRegistrationModel: Model<_IDbVehicleRegistration>,
    private storageService: StorageService, //might be used in verifying vehicle no
    private readonly aggregationService: AggregationService
  ) {}

  // async getAllVehicles(
  //   query: string,
  //   page = 1,
  //   limit = 5
  // ): Promise<_IVehicle[]> {
  //   try {
  //     const fieldNames = ['vehicle_no']; // Field to be used for matching the query

  //     // Fetch vehicles with images populated for a subset initially
  //     const vehicles = await this.aggregationService.fetchFilteredDocuments(
  //       this.vehicleModel,
  //       fieldNames,
  //       query,
  //       page,
  //       limit,
  //       'images',
  //       3
  //     );

  //     console.log(vehicles);

  //     // Return sanitized vehicles
  //     return sanitizeVehicles(vehicles);
  //   } catch (error) {
  //     // Handle the error gracefully
  //     console.error('An error occurred while fetching vehicles:', error);
  //     throw error; // Rethrow the error to be handled by the caller
  //   }
  // }

  async getVehiclesWithVirtuals(
    query?: string,
    page = 1,
    limit = 5
  ): Promise<_IVehicleNew[]> {
    const match_fields = ['vehicle_no'];
    const lookups: _ILookup[] = [
      {
        from: 'vehicleimages',
        as: 'vehicle_images',
        foreignField: 'vehicle'
      },
      {
        from: 'vehicleinsurances',
        as: 'vehicle_insurance',
        foreignField: 'vehicle'
      },
      {
        from: 'vehicleregistrations',
        as: 'vehicle_registrations',
        foreignField: 'vehicle'
      }
    ];
    const vehiclesWithVirtuals: _IVehicleNew[] =
      await this.aggregationService.virtualFieldsPipeline(
        this.vehicleModel,
        match_fields,
        query,
        lookups,
        page,
        limit
      );
    console.log(vehiclesWithVirtuals);

    return vehiclesWithVirtuals;
  }

  // async getDriverVehicles(driver: string): Promise<_IVehicle[]> {
  //   try {
  //     const vehicles = await this.vehicleModel
  //       .find({ driver })
  //       .populate('images');
  //     return sanitizeVehicles(vehicles);
  //   } catch (error) {
  //     throw new Error(error.message);
  //   }
  // }

  // async getSingleVehicle(id: string): Promise<_IVehicle> {
  //   try {
  //     const vehicle = await this.vehicleModel
  //       .findById(new Types.ObjectId(id))
  //       .populate('images');
  //     return sanitizevehicle(vehicle);
  //   } catch (error) {
  //     throw new Error(error.message);
  //   }
  // }

  async addVehicleImages(images: _ICloudRes[]): Promise<_IDbVehicleImage[]> {
    try {
      const dbImages = images.map((image) => {
        console.log(image);
        const { publicUrl, ...res } = image;
        return res;
      });

      const savedImages = await this.vehicleImageModel.create(dbImages);

      return savedImages as unknown as _IDbVehicleImage[];
    } catch (error) {
      throw new Error('An Error Occurred while saving Images');
    }
  }

  async newVehicle(data: _INewVehicle) {
    try {
      return await this.vehicleModel.create(data);
    } catch (error) {
      throw new NotAcceptableException(error.message);
    }
  }

  // async addVehicle(
  //   driver: string,
  //   data: _IAddVehicle,
  //   img: any[]
  // ): Promise<_IVehicle> {
  //   const { vehicle_no } = data;

  //   const images = await this.addVehicleImages(img);
  //   // Check if the vehicle already exists
  //   const existingVehicle = await this.vehicleModel.findOne({ vehicle_no });

  //   if (existingVehicle) {
  //     await this.vehicleModel.updateOne(
  //       { _id: existingVehicle._id },
  //       { $push: { images: { $each: images } } }
  //     );

  //     return sanitizevehicle(existingVehicle);
  //   }

  //   // Vehicle doesn't exist, create a new one
  //   const newVehicle = await this.newVehicle({
  //     vehicle_no,
  //     isVerified: false,
  //     hasSlot: false,
  //     images,
  //     driver
  //   });

  //   await newVehicle.save();
  //   return sanitizevehicle(newVehicle);
  // }
}
