import { _ILookup } from '../interfaces/responses.interface';
import { _IDbParkingCenter, _IDbSlot } from '../interfaces/slot.interface';
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

export const slotsLookup: _ILookup[] = [
  {
    from: 'parkingcenters',
    as: 'center',
    localField: 'center_id',
    foreignField: '_id'
  },
  {
    from: 'slotimages',
    as: 'slot_images',
    localField: '_id',
    foreignField: 'slot_id'
  },
  {
    from: 'slotdata',
    as: 'slot_data',
    localField: '_id',
    foreignField: 'slot_id'
  },
  {
    from: 'slotaddresses',
    as: 'slot_address',
    localField: '_id',
    foreignField: 'slot_id'
  }
];

const deepSlotsLookup: _ILookup[] = [
  {
    from: 'users',
    as: 'center_owner',
    foreignField: '_id',
    localField: 'owner'
  },
  {
    from: 'profiles',
    as: 'owner_profile',
    foreignField: 'user',
    localField: 'owner'
  }
];

const deepParkingCentersLookup: _ILookup[] = [
  {
    from: 'users',
    as: 'center_owner',
    foreignField: '_id',
    localField: 'owner'
  },
  {
    from: 'profiles',
    as: 'owner_profile',
    foreignField: 'user',
    localField: 'owner'
  }
];

export const setReservationFields = {
  slot_name: '$slot.slot_name',
  vehicle_no: '$vehicle.vehicle_no'
};

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

export const FETCH_SLOTS_AGGREGATION: _IAggregationFields<_IDbSlot> = {
  lookups: slotsLookup,
  // deepLookups: deepParkingCentersLookup,
  unwind_fields: ['slot_address', 'slot_data', 'center' as unknown as any],
  // deep_unwind_fields: ['slot_owner', 'owner_profile'],
  project_fields: [
    'slot_name',
    'description',
    'type',
    // 'owner',
    'slot_address',
    'slot_data',
    'center',
    'slot_images' as unknown as any
    // 'slots',
    // 'owner_profile',
    // 'slot_owner' as unknown as any
  ],
  count_fields: []
};

export const FETCH_POPULAR_CENTERS_AGGREGATION: _IAggregationFields<_IDbParkingCenter> =
  {
    lookups: parkingCentersLookup,
    deepLookups: deepParkingCentersLookup,
    unwind_fields: ['center_address', 'center_data'],
    deep_unwind_fields: ['center_owner', 'owner_profile'],
    project_fields: [
      'center_name',
      'description',
      'type',
      // 'owner',
      'center_address',
      'center_data',
      'center_images',
      'slots',
      'owner_profile',
      'center_owner' as unknown as any
    ],
    count_fields: []
  };

export const centersFilterFields: (keyof _IDbParkingCenter)[] = [
  'center_name',
  'type',
  'description',
  'type',
  'center_address'
];

export const slotsFilterFields: (keyof _IDbSlot)[] = [
  'slot_name',
  'type',
  'description',
  'type',
  'slot_address'
];
