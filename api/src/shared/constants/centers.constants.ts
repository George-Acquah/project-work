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
    as: 'slot_owner',
    foreignField: '_id',
    localField: 'center.owner'
  },
  {
    from: 'centerimages',
    as: 'slot_images',
    foreignField: 'center_id',
    localField: 'center._id'
  },
  {
    from: 'profiles',
    as: 'owner_profile',
    foreignField: 'user',
    localField: 'center.owner'
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

export const setSlotForReservationFields = {
  image: {
    $arrayElemAt: ['$slot_images.file_id', 0]
  }
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
  deepLookups: deepSlotsLookup,
  unwind_fields: ['slot_address', 'slot_data', 'center' as unknown as any],
  deep_unwind_fields: ['slot_owner', 'owner_profile'],
  project_fields: [
    'slot_name',
    'description',
    'type',
    'slot_address',
    'isVerified',
    'minutePrice',
    'isAvailable',
    'slot_data',
    'center',
    'slot_images' as unknown as any,
    'owner_profile',
    'slot_owner'
  ],
  count_fields: []
};

export const FETCH_SLOTS_FOR_RESERVATION: _IAggregationFields<_IDbSlot> = {
  lookups: [
    {
      from: 'centerimages',
      localField: 'center_id',
      foreignField: 'center_id',
      as: 'slot_images'
    }
  ],
  project_fields: ['image', 'minutePrice' as unknown as any],
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
      'center_address',
      'isVerified',
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
