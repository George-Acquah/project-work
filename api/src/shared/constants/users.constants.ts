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

const FETCH_USERS_PROFILES_BY_USER_AGGREGATION: _IAggregationFields<_TUser> = {
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
    }
  ],
  unwind_fields: ['profile', 'user_image'],
  project_fields: ['_id', 'email', 'phone_number', 'profile', 'user_image'],
  field_names: ['email', 'userType', 'profile.first_name', 'profile.last_name'] // Add more fields as needed
};

export const usersFilterFields: (keyof _TUser)[] = [
  'email',
  'userType',
  'phone_number',
  'profile.first_name' as any,
  'profile.last_name'
];

export {
  FETCH_USERS_BY_ADMIN_AGGREGATION,
  FETCH_USERS_PROFILES_BY_USER_AGGREGATION
};
