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
    private readonly participantService: Repository<Participant>,
  ) {}

  findParticipant(params: FindParticipantParams): Promise<Participant | null> {
    return this.participantService.findOne(params);
  }

  createParticipant(params: CreateParticipantParams): Promise<Participant> {
    const participant = this.participantService.create(params);
    return this.participantService.save(participant);
  }
}
