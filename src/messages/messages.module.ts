import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation, Message } from 'src/utils/typeorm';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { Services } from 'src/utils/constants';

@Module({
  imports: [TypeOrmModule.forFeature([Message, Conversation])],
  controllers: [MessageController],
  providers: [
    {
      provide: Services.MESSAGES,
      useClass: MessageService,
    },
  ],
})
export class MessagesModule {}
