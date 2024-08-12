/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments
} from 'class-validator';

export function IsPhoneNumber(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isPhoneNumber',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          console.log('value: ', value);
          // Check if the phone number starts with 0
          const startsWithZero = value.startsWith('0');
          // Check if the phone number is exactly 10 digits long
          const isTenDigits = /^\d{10}$/.test(value);

          return startsWithZero && isTenDigits;
        },
        defaultMessage(args: ValidationArguments) {
          return 'Phone number must start with 0 and be exactly 10 digits long';
        }
      }
    });
  };
}

export function IsE164PhoneNumber(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isE164PhoneNumber',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          // Check if the phone number is in E164 format
          const isE164 = /^\+?[1-9]\d{1,14}$/.test(value);
          return isE164;
        },
        defaultMessage(args: ValidationArguments) {
          return 'Phone number must be in valid E164 format';
        }
      }
    });
  };
}
