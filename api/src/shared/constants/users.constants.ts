import { _ILookup } from '../interfaces/responses.interface';
import { _TUser } from '../interfaces/users.interface';
import { _IAggregationFields } from './interface';

const FETCH_USERS_BY_ADMIN_AGGREGATION: _IAggregationFields<_TUser> = {
  lookups: [
    {
      from: 'profiles',
      as: 'profile',
      foreignField: 'user'
    },
    {
      from: 'userimages',
      as: 'user_image',
      foreignField: 'user'
    },
    {
      from: 'vehicles',
      as: 'vehicles',
      foreignField: 'driver'
    },
    {
      from: 'parkingcenters',
      as: 'centers',
      foreignField: 'owner'
    }
  ],
  unwind_fields: ['profile', 'user_image'],
  project_fields: [
    '_id',
    'email',
    'userType',
    'createdAt',
    'updatedAt',
    'isVerified',
    'phone_number',
    'profile',
    'user_image'
  ],
  count_fields: ['vehicles', 'centers'],
  field_names: ['email', 'userType', 'profile.first_name', 'profile.last_name'] // Add more fields as needed
};

export { FETCH_USERS_BY_ADMIN_AGGREGATION };
