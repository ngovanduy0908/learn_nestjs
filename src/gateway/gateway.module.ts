import { Module } from '@nestjs/common';
import { MessagesingGateway } from './gateway';
import { GatewaySessionManager } from './gateway.session';
import { Services } from 'src/utils/constants';

@Module({
  providers: [
    MessagesingGateway,
    {
      provide: Services.GATEWAY_SESSION_MANAGER,
      useClass: GatewaySessionManager,
    },
  ],
})
export class GatewayModule {}
