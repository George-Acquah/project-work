import { WsException } from '@nestjs/websockets';
import { _TWSException } from '../interfaces/custom-request.interface';
import { _EWSExceptionTypes } from '../enums/general.enum';

class WSTypeException extends WsException {
  readonly type: _TWSException;

  constructor(type: _TWSException, message: string | unknown) {
    const error = {
      type,
      message,
    };
    super(error);
    this.type = type;
  }
}

class WSBadRequestException extends WSTypeException {
  constructor(message: string | unknown) {
    super(_EWSExceptionTypes.BAD_REQUEST, message);
  }
}

class WSUnauthorizedException extends WSTypeException {
  constructor(message: string | unknown) {
    super(_EWSExceptionTypes.UNAUTHORIZED, message);
  }
}

class WSUnknownException extends WSTypeException {
  constructor(message: string | unknown) {
    super(_EWSExceptionTypes.UNKNOWN, message);
  }
}

export {
  WSBadRequestException,
  WSUnauthorizedException,
  WSUnknownException,
  WSTypeException,
};
