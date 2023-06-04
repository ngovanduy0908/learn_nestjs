import {
  PrimaryGeneratedColumn,
  Entity,
  ManyToOne,
  CreateDateColumn,
  Column,
} from 'typeorm';
import { User } from './User';
import { Conversation } from './Conversation';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  content: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: number;

  @ManyToOne(() => User, (user) => user.messages)
  author: User;

  @ManyToOne(() => Conversation, (conversation) => conversation.messages)
  conversation: Conversation;
}
