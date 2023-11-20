import { INestApplication, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { Server, ServerOptions } from 'socket.io';
import { _TSocketWithAuth } from './shared/interfaces/custom-request.interface';
import { _IReservationPayload } from './shared/interfaces/jwt_payload.interface';

export class SocketIOAdapter extends IoAdapter {
  private logger = new Logger(SocketIOAdapter.name);
  constructor(
    private app: INestApplication,
    private configService: ConfigService,
  ) {
    super(app);
  }

  createIOServer(port: number, options?: ServerOptions) {
    const clientPort = parseInt(this.configService.get('CLIENT_PORT'));

    const cors = {
      origin: [
        `http://localhost:${clientPort}`,
        new RegExp(`^http:\/\/192\.168\.1\.([1-9]|[1-9]\d):${clientPort}$`),
      ],
    };

    this.logger.log(
      'Configuring SocketIO Server with Custom CORS option',
      cors,
    );

    const optionsWithCors: ServerOptions = {
      ...options,
      cors,
    };

    const jwtService = this.app.get(JwtService);
    const server: Server = super.createIOServer(port, optionsWithCors);

    server.of('parkings').use(createTokenmiddleware(jwtService, this.logger));

    return server;
  }
}

const createTokenmiddleware =
  (jwtService: JwtService, logger: Logger) =>
  (socket: _TSocketWithAuth, next) => {
    const token =
      socket.handshake.auth.token || socket.handshake.headers['authorization'];
    logger.debug(`Validating auth token before connection: ${token}`);

    try {
      const payload: _IReservationPayload = jwtService.verify(token);

      socket.vehicle_id = payload.vehicle_id;
      socket.slot_id = payload.slot_id;
      socket.reservation_id = payload.sub.reservation_id;

      next();
    } catch {
      next(new Error('FORBIDDEN'));
    }
  };
