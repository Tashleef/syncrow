// device.gateway.ts
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({})
export class DeviceGateway {
  @WebSocketServer()
  server: Server;

  sendDeviceEvent(event: string, payload: any) {
    this.server.emit(event, payload);
  }
}
