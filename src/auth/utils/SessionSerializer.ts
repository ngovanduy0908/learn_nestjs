import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { IUserService } from 'src/users/user';
import { Services } from 'src/utils/constants';
import { User } from 'src/utils/typeorm';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject(Services.USERS)
    private readonly userService: IUserService,
  ) {
    super();
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  serializeUser(user: User, done: Function) {
    console.log(user);
    console.log('SerializeUser');
    done(null, user);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  async deserializeUser(user: User, done: Function) {
    // console.log('DeserializeUser');
    const userDb = await this.userService.findUser({ id: user.id });
    // console.log('tra ve nguoi dung: ', userDb);
    return userDb ? done(null, userDb) : done(null, null);
  }
}
