import { _ILookup } from '../interfaces/responses.interface';
import { _IDbVehicleNew } from '../interfaces/vehicles.interface';
import { _IAggregationFields } from './interface';

export const vehicleLookups: _ILookup[] = [
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
    as: 'vehicle_registration',
    foreignField: 'vehicle'
  }
];

export const FETCH_VEHICLES_BY_ADMIN_AGGREGATION: _IAggregationFields<_IDbVehicleNew> =
  {
    lookups: vehicleLookups,
    unwind_fields: ['vehicle_registration'],
    project_fields: [
      'vehicle_no',
      'vehicleType',
      'make',
      'isVerified',
      'vehicleModel',
      'yearOfManufacture',
      'color',
      'vehicle_images',
      'vehicle_insurance',
      'vehicle_registration',
      'driver'
    ],
    count_fields: []
  };
