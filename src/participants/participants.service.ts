import { IParticipantsService } from './participants';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Participant } from 'src/utils/typeorm';
import {
  CreateParticipantParams,
  FindParticipantParams,
} from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class ParticipantsService implements IParticipantsService {
  constructor(
    @InjectRepository(Participant)
    private readonly participantRepository: Repository<Participant>,
  ) {}

  findParticipant(params: FindParticipantParams): Promise<Participant | null> {
    return this.participantRepository.findOne(params);
  }

  createParticipant(params: CreateParticipantParams): Promise<Participant> {
    const participant = this.participantRepository.create(params);
    return this.participantRepository.save(participant);
  }

  findParticipantConversations(id: number) {
    console.log(`findParticipantConversation: ${id}`);
    return this.participantRepository
      .createQueryBuilder('participant')
      .leftJoinAndSelect('participant.conversations', 'conversation')
      .where('participant.id = :id', { id })
      .leftJoinAndSelect('conversation.participants', 'participants')
      .leftJoin('participants.user', 'user')
      .addSelect(['user.firstName', 'user.lastName', 'user.email', 'user.id'])
      .getRawOne();
  }
}
