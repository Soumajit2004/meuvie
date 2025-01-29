import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';

import { AuthService } from './services/auth/auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { SignInUserDto } from './dto/signin-user.dto';
import { CookieGuard } from './guards/cookie.guard';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {
  }

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<void> {
    return this.authService.signUp(createUserDto);
  }

  @Post('signin')
  async signIn(@Body() signInUserDto: SignInUserDto, @Res({ passthrough: true }) response: Response): Promise<void> {
    const { id: token, expiresAt } = await this.authService.signIn(signInUserDto);

    response.cookie('session', token, {httpOnly: true,sameSite: 'lax', expires: expiresAt, path: '/'});
  }

  @Get('test')
  @UseGuards(CookieGuard)
  async test(): Promise<string> {
    return 'Hello, world!';
  }
}
