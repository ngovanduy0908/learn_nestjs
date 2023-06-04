import {
  OnGatewayConnection,
  WebSocketGateway,
  MessageBody,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

import { OnEvent } from '@nestjs/event-emitter';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000'],
  },
})
export class MessagingGateway implements OnGatewayConnection {
  handleConnection(client: Socket, ...args: any[]) {
    console.log('New InComing Connection');
    console.log(client.id);
    client.emit('connected', { status: 'good' });
  }

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('createMessage')
  handleCreateMessage(@MessageBody() data: any) {
    console.log('create message');
  }

  @OnEvent('message.create')
  handleMessageCreateEvent(payload: any) {
    console.log('Inside message.create');
    console.log(payload);
    this.server.emit('onMessage', payload);
  }
}
