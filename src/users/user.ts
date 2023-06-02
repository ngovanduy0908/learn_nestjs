import { User } from 'src/utils/typeorm';
import { FindUserParams } from './../utils/types';
import { CreateUserDetails } from 'src/utils/types';

export interface IUserService {
  createUser(userDetails: CreateUserDetails): Promise<User>;

  findUser(findUserParams: FindUserParams): Promise<User>;
  saveUser(user: User): Promise<User>;
}
