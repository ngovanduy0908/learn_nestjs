import { Controller, Inject, Body, Post } from '@nestjs/common';
import { IMessageService } from './message';
import { Routes, Services } from 'src/utils/constants';
import { AuthUser } from 'src/utils/decorator';
import { User } from 'src/utils/typeorm';
import { CreateMessageDto } from './dtos/CreateMessage.dto';

@Controller(Routes.MESSAGES)
export class MessageController {
  constructor(
    @Inject(Services.MESSAGES) private readonly messageService: IMessageService,
  ) {}

  @Post()
  createMessage(
    @AuthUser() user: User,
    @Body() createMessageDto: CreateMessageDto,
  ) {
    return this.messageService.createMessage({ ...createMessageDto, user });
  }
}
