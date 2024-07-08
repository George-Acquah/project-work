import { _ILookup } from '../interfaces/responses.interface';
import { _IDbSlotReservation } from '../interfaces/slot.interface';
import { _IAggregationFields } from './interface';

export const reservationsLookup: _ILookup[] = [
  {
    from: 'slots',
    as: 'slot',
    foreignField: '_id',
    localField: 'slot_id'
  },
  {
    from: 'vehicles',
    as: 'vehicle',
    foreignField: '_id',
    localField: 'vehicle_id'
  }
];

const deepReservationsLookup: _ILookup[] = [
  {
    from: 'slotimages',
    as: 'slot_image',
    foreignField: 'slot_id',
    localField: 'slot._id'
  },
  {
    from: 'users',
    as: 'driver',
    foreignField: '_id',
    localField: 'vehicle.driver'
  }
];

export const setReservationFields = {
  slot_name: '$slot.slot_name',
  vehicle_no: '$vehicle.vehicle_no'
};

export const FETCH_RESERVATIONS_BY_ADMIN_AGGREGATION: _IAggregationFields<_IDbSlotReservation> =
  {
    lookups: reservationsLookup,
    deepLookups: deepReservationsLookup,
    unwind_fields: ['slot', 'vehicle' as unknown as any],
    deep_unwind_fields: ['driver'],
    project_fields: [
      'cost_of_reservation',
      'duration_of_reservation',
      'end_time',
      'start_time',
      'time_of_reservation',
      'wait_time',
      'driver',
      'slot_name',
      'vehicle_no',
      'slot_image' as unknown as any
    ],
    count_fields: []
  };
