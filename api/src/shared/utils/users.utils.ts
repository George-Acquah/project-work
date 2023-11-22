import { UserType } from '../enums/users.enum';
import {
  _ICustomer,
  _IParkOwner,
  _ISanitizedCustomer,
  _ISanitizedParkOwner,
  _TSanitizedUser,
  _TUser,
} from '../interfaces/users.interface';

export function sanitizeUser(user: _TUser): _TSanitizedUser {
  if (user.userType === UserType.CUSTOMER) {
    const { _id, email, profile, userType, vehicles, rankings } =
      user as _ICustomer;
    const sanitizedUser: _ISanitizedCustomer = {
      _id: _id.toString(),
      email,
      userType,
      profile,
      vehicles,
      rankings,
    };
    return sanitizedUser;
  }

  const { _id, email, profile, userType, rankings, centers } =
    user as _IParkOwner;
  console.log(_id);
  const sanitizedUser: _ISanitizedParkOwner = {
    _id: _id.toString(),
    email,
    userType,
    profile,
    centers,
    rankings,
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
