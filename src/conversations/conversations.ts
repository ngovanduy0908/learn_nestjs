import { Conversation, User } from 'src/utils/typeorm';
import { CreateConversationParams } from 'src/utils/types';

export interface IConversationsService {
  createConversation(
    user: User,
    conversationParams: CreateConversationParams,
  ): Promise<Conversation>;
  find(id: number): any;
  findConversationById(id: number): Promise<Conversation>;
  findConversationByParticipants(ids: number[]): Promise<Conversation>;
}
