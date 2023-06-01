import { Body, Controller, Inject, Post, Get } from '@nestjs/common';
import { Routes, Services } from 'src/utils/types';
import { IAuthService } from './auth';
import { CreateUserDto } from './dtos/CreateUser.dto';

@Controller(Routes.AUTH)
export class AuthController {
  constructor(@Inject(Services.AUTH) private authService: IAuthService) {}

  @Post('register')
  registerUser(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
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
