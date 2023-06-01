import { Body, Controller, Inject, Post, Get } from '@nestjs/common';
import { Routes, Services } from 'src/utils/constants';
import { IAuthService } from './auth';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { IUserService } from 'src/users/user';

@Controller(Routes.AUTH)
export class AuthController {
  constructor(
    @Inject(Services.AUTH) private authService: IAuthService,
    @Inject(Services.USERS) private userService: IUserService,
  ) {}

  @Post('register')
  registerUser(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    this.userService.createUser(createUserDto);
    return 'this is create user';
  }

  @Post('login')
  login() {
    return 'this is func login';
  }

  @Get('status')
  status() {
    return 'this is func status';
  }

  @Post('logout')
  logout() {
    return 'this is func logout';
  }
}
