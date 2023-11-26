import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import { _TSocketWithAuth } from '../interfaces/custom-request.interface';
import { WSBadRequestException, WSUnknownException } from './ws.exceptions';

@Catch()
export class WSCatchAllExceptionsFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const socket: _TSocketWithAuth = host.switchToWs().getClient();

    if (exception instanceof BadRequestException) {
      const exceptionData = exception.getResponse();

      const wsException = new WSBadRequestException(
        exceptionData['message'] ?? exceptionData ?? exception.name,
      );

      socket.emit('exception', wsException.getError());

      return;
    }

    const wsException = new WSUnknownException(exception.message);
    socket.emit('exception', wsException.getError());
  }
}
