import { UserType } from '../enums/users.enum';
import { _IDbUserImage, _IUserImage } from '../interfaces/images.interface';
import {
  _ICustomer,
  _IDbProfile,
  _IParkOwner,
  _ISanitizedCustomer,
  _ISanitizedParkOwner,
  _ISanitizedProfile,
  _TSanitizedUser,
  _TUser,
} from '../interfaces/users.interface';
import { sanitizeVehicles } from './vehicles.utils';

export function sanitizeUserImage(image: _IDbUserImage): _IUserImage {
  const { _id, file_id, filename, mimetype, userId } = image;

  return {
    _id: _id.toString() as string,
    file_id,
    filename,
    mimetype,
    userId,
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
  };
}

export function sanitizeUser(user: _TUser): _TSanitizedUser {
  if (user.userType === UserType.CUSTOMER) {
    const { _id, email, profile, userType, vehicles, rankings } =
      user as _ICustomer;
    const image = user?.image;
    const sanitizedUser: _ISanitizedCustomer = {
      _id: _id.toString(),
      email,
      userType,
      profile: sanitizeProfile(profile),
      vehicles: sanitizeVehicles(vehicles) || [],
      rankings,
      image: image ? sanitizeUserImage(image) : null,
    };
    return sanitizedUser;
  }

  const { _id, email, profile, userType, centers, rankings } =
    user as _IParkOwner;
  const image = user?.image;
  const sanitizedUser: _ISanitizedParkOwner = {
    _id: _id.toString(),
    email,
    userType,
    profile: sanitizeProfile(profile),
    centers,
    rankings,
    image: image ? sanitizeUserImage(image) : null,
  };
  return sanitizedUser;
}

function generateRandomTextAndLength() {
  const minLength = 7;
  const maxLength = 15;
  const length = Math.floor(
    Math.random() * (maxLength - minLength + 1) + minLength,
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

// export const getMoment = (duration: number) => {
//   const currentTime = moment();
//   console.log('moment on server: ', currentTime.valueOf());

//   const futureTime = currentTime.add(duration, 'minutes');

//   const expiresIn = futureTime.valueOf();

//   return expiresIn;
// };

function getExpirationTime(minutes: number) {
  const currentTime = new Date().getTime();
  const expirationTime = currentTime + minutes * 60000; // 1 minute = 60000 milliseconds
  return expirationTime;
}

export function updateUserFields(
  applicant: Partial<_ICustomer | _IParkOwner>,
  data: Partial<_ICustomer | _IParkOwner>,
) {
  // if (data.username) {
  //   applicant.username = data.username;
  // }
  if (data.email) {
    applicant.email = data.email;
  }
}

export { getExpirationTime };
