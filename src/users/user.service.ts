import { FindUserParams } from './../utils/types';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUserService } from './user';
import { CreateUserDetails } from 'src/utils/types';
import { User } from 'src/utils/typeorm';
import { hashPassword } from 'src/utils/helpers';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async createUser(userDetails: CreateUserDetails) {
    const existingUser = await this.userRepository.findOne({
      email: userDetails.email,
    });

    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }
    const password = await hashPassword(userDetails.password);
    const newUser = this.userRepository.create({ ...userDetails, password });
    return this.userRepository.save(newUser);
  }

  async findUser(findUserParams: FindUserParams) {
    return this.userRepository.findOne(findUserParams, {
      relations: ['participant'],
    });
  }

  async saveUser(user: User) {
    return this.userRepository.save(user);
  }
}
