import {
  Controller,
  Inject,
  Body,
  Post,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { IMessageService } from './message';
import { Routes, Services } from 'src/utils/constants';
import { AuthUser } from 'src/utils/decorator';
import { User } from 'src/utils/typeorm';
import { CreateMessageDto } from './dtos/CreateMessage.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
@Controller(Routes.MESSAGES)
export class MessageController {
  constructor(
    @Inject(Services.MESSAGES) private readonly messageService: IMessageService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Post()
  async createMessage(
    @AuthUser() user: User,
    @Body() createMessageDto: CreateMessageDto,
  ) {
    const msg = await this.messageService.createMessage({
      ...createMessageDto,
      user,
    });
    this.eventEmitter.emit('message.create', msg);
    return;
  }

  @Get(':conversationId')
  async getMessagesFromConversation(
    @AuthUser() user: User,
    @Param('conversationId', ParseIntPipe) conversationId: number,
  ) {
    const messages = await this.messageService.getMessagesByConversationId(
      conversationId,
    );

    return { id: conversationId, messages };
  }
}
