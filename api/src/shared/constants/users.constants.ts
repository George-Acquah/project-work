import { _ILookup } from '../interfaces/responses.interface';
import { _TUser } from '../interfaces/users.interface';

interface _IUserAggregation<T> {
  /** test */
  lookups?: _ILookup[];
  unwind_fields?: (keyof T)[];
  project_fields?: (keyof T)[];
  count_fields?: string[];
  field_names?: string[];
}

const FETCH_USERS_BY_ADMIN_AGGREGATION: _IUserAggregation<_TUser> = {
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
