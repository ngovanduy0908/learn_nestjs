import { Conversation } from './entities/Conversation';
import { Message } from './entities/Messages';
import { Session } from './entities/Session';
import { User } from './entities/User';

const entities = [User, Session, Conversation, Message];

export { User, Session, Conversation, Message };

export default entities;
