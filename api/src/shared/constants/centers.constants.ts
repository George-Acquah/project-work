import { _ILookup } from '../interfaces/responses.interface';
import { _IDbParkingCenter } from '../interfaces/slot.interface';
import { _IAggregationFields } from './interface';

export const parkingCentersLookup: _ILookup[] = [
  {
    from: 'slots',
    as: 'slots',
    localField: '_id',
    foreignField: 'center_id'
  },
  {
    from: 'centerimages',
    as: 'center_images',
    localField: '_id',
    foreignField: 'center_id'
  },
  {
    from: 'centerdata',
    as: 'center_data',
    localField: '_id',
    foreignField: 'center_id'
  },
  {
    from: 'centeraddresses',
    as: 'center_address',
    localField: '_id',
    foreignField: 'center_id'
  }
];

export const setPopularParkingCenterFields = {
  availableSlotsCount: {
    $size: {
      $filter: {
        input: '$slots',
        as: 'slot',
        cond: { $eq: ['$$slot.isAvailable', true] }
      }
    }
  }
};

export const FETCH_POPULAR_CENTERS_AGGREGATION: _IAggregationFields<_IDbParkingCenter> =
  {
    lookups: parkingCentersLookup,
    // deepLookups: deepReservationsLookup,
    unwind_fields: ['center_address', 'center_data'],
    // deep_unwind_fields: ['driver'],
    project_fields: [
      'center_name',
      'description',
      'type',
      'owner',
      'center_address',
      'center_data',
      'center_images',
      'slots'
    ],
    count_fields: []
  };
