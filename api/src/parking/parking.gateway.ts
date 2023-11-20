import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Namespace } from 'socket.io';
import { _TSocketWithAuth } from 'src/shared/interfaces/custom-request.interface';

@WebSocketGateway({
  namespace: 'parkings',
})
export class ParkingsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(ParkingsGateway.name);
  // @WebSocketServer() server: Server;
  @WebSocketServer() io: Namespace;

  afterInit(): void {
    this.logger.log('Socket.IO Gateway initialized');
  }

  handleConnection(client: _TSocketWithAuth) {
    const sockets = this.io.sockets;

    this.logger.debug(
      `Socket Connected with slot ID: ${client.slot_id}, vehicle ID: ${client.vehicle_id}, reservation ID: ${client.reservation_id}`,
    );

    this.logger.log(`WS Client connected with id: ${client.id}`);
    this.logger.debug(`Number of connected sockets: ${sockets.size}`);

    this.io.emit('hello', `from ${client.id}`);
  }

  handleDisconnect(client: _TSocketWithAuth) {
    const sockets = this.io.sockets;

    this.logger.debug(
      `Socket Connected with slot ID: ${client.slot_id}, vehicle ID: ${client.vehicle_id}, reservation ID: ${client.reservation_id}`,
    );

    this.logger.log(`WS Client disconnected with id: ${client.id}`);
    this.logger.debug(`Number of connected sockets: ${sockets.size}`);
  }

  @SubscribeMessage('sensorData')
  handleSensorData(client: any, data: any) {
    // Process and broadcast sensor data
    this.logger.log('Received sensor data:', data);
    // this.server.emit('sensor  Data', data);
  }
}
