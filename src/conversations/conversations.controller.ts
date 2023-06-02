import { Controller, Inject, Post, Body, Get, Param } from '@nestjs/common';
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

  @Post()
  createConversation(
    @AuthUser() user: User,
    @Body() createConversationsPayload: CreateConversationDto,
  ) {
    console.log('createConversation');

    return this.conversationsService.createConversation(
      user,
      createConversationsPayload,
    );
  }

  @Get()
  async getConversations(@AuthUser() { id }: User) {
    return this.conversationsService.getConversations(id);
  }

  @Get(':id')
  async getConversationById(@Param('id') id: number) {
    const conversation = await this.conversationsService.findConversationById(
      id,
    );
    return conversation;
  }
}
