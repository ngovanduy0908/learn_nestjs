import { Controller, Inject, Post, Body } from '@nestjs/common';
import { Services } from 'src/utils/constants';
import { IConversationsService } from './conversations';
import { CreateConversationDto } from './dtos/CreateConversation.dto';
import { AuthUser } from 'src/utils/decorator';
import { User } from 'src/utils/typeorm';

@Controller('conversations')
export class ConversationsController {
  constructor(
    @Inject(Services.CONVERSATIONS)
    private readonly conversationsService: IConversationsService,
  ) {}

  @Post('conversations')
  createConversation(
    @AuthUser() user: User,
    @Body() createConversationsPayload: CreateConversationDto,
  ) {
    return this.conversationsService.createConversation(
      user,
      createConversationsPayload,
    );
  }
}
