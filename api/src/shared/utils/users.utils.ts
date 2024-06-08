import { UserType } from '../enums/users.enum';
import { _IDbUserImage, _IUserImage } from '../interfaces/images.interface';
import { _IParkingCenter } from '../interfaces/slot.interface';
import {
  _ICustomer,
  _ICustomerRankings,
  _IDbProfile,
  _IOwnerRankings,
  _IParkOwner,
  _ISanitizedCustomer,
  _ISanitizedParkOwner,
  _ISanitizedProfile,
  _TSanitizedUser
} from '../interfaces/users.interface';
import { _IDbVehicle } from '../interfaces/vehicles.interface';
import { sanitizeVehicles } from './vehicles.utils';

export function sanitizeUserImage(image: _IDbUserImage): _IUserImage {
  const { _id, file_id, filename, mimetype, userId } = image;

  return {
    _id: _id.toString() as string,
    file_id,
    filename,
    mimetype,
    userId
  };
}

function sanitizeProfile(profile: _IDbProfile): _ISanitizedProfile {
  return {
    _id: profile._id || null,
    first_name: profile.first_name || null,
    last_name: profile.last_name || null,
    contact_no: profile.contact_no || null,
    area: profile.area || null,
    city: profile.city || null,
    state: profile.state || null,
    pinCode: profile.pinCode || null,
    user: profile.user
  };
}

export function sanitizeUser(user: any): _TSanitizedUser {
  if (user.userType === UserType.CUSTOMER) {
    const { _id, email, phone_number, userType, isVerified } =
      user as _ICustomer;
    const image = user?.image as _IDbUserImage;
    const vehicles = user?.vehicles as _IDbVehicle[];
    const profile = user?.profile as _IDbProfile;
    const rankings = user?.rankings as _ICustomerRankings;
    const sanitizedUser: _ISanitizedCustomer = {
      _id: _id.toString(),
      email,
      userType,
      isVerified,
      phone_number,
      profile: profile ? sanitizeProfile(profile) : null,
      vehicles: vehicles ? sanitizeVehicles(vehicles) : [],
      rankings,
      image: image ? sanitizeUserImage(image) : null
    };
    return sanitizedUser;
  }

  const { _id, email, userType, isVerified } = user as _IParkOwner;
  const image = user?.image;
  const profile = user?.profile as _IDbProfile;
  const rankings = user?.rankings as _IOwnerRankings;
  const centers = user?.centers as _IParkingCenter[];
  const sanitizedUser: _ISanitizedParkOwner = {
    _id: _id.toString(),
    email,
    userType,
    isVerified,
    profile: profile ? sanitizeProfile(profile) : null,
    centers,
    rankings,
    image: image ? sanitizeUserImage(image) : null
  };
  return sanitizedUser;
}

function generateRandomTextAndLength() {
  const minLength = 7;
  const maxLength = 15;
  const length = Math.floor(
    Math.random() * (maxLength - minLength + 1) + minLength
  );

  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomText = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomText += characters.charAt(randomIndex);
  }

  return { text: randomText, length };
}

export function appendRandomTextAndLength(parameter: string) {
  const { text, length } = generateRandomTextAndLength();
  return `${text}/${parameter}%${length}`;
}

function getExpirationTime(minutes: number) {
  const currentTime = new Date().getTime();
  const expirationTime = currentTime + minutes * 60000; // 1 minute = 60000 milliseconds
  return expirationTime;
}

export function updateUserFields(
  applicant: Partial<_ICustomer | _IParkOwner>,
  data: Partial<_ICustomer | _IParkOwner>
) {
  // if (data.username) {
  //   applicant.username = data.username;
  // }
  if (data.email) {
    applicant.email = data.email;
  }
}

export { getExpirationTime };
