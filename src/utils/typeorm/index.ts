import { Conversation } from './entities/Conversation';
import { Participant } from './entities/Participant';
import { Session } from './entities/Session';
import { User } from './entities/User';

const entities = [User, Session, Participant, Conversation];

export { User, Session, Participant, Conversation };

export default entities;
