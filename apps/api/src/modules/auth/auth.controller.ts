import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';

import { AuthService } from './services/auth/auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { SignInUserDto } from './dto/signin-user.dto';
import { CookieGuard } from './guards/cookie.guard';
import { GetSession } from './decorators/get-user.decorator';
import { SessionValidationResult } from './session-validation-result.type';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {
  }

  @Get('csrf')
  csrfToken(@Req() request: Request): { csrfToken: string } {
    return { csrfToken: request.csrfToken() };
  }

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<void> {
    return this.authService.signUp(createUserDto);
  }

  @Post('signin')
  async signIn(@Body() signInUserDto: SignInUserDto, @Res({ passthrough: true }) response: Response): Promise<void> {
    const { id: token, expiresAt } = await this.authService.signIn(signInUserDto);

    response.cookie('session', token, { httpOnly: true, sameSite: 'lax', expires: expiresAt, path: '/' });
  }

  @Post('signout')
  @UseGuards(CookieGuard)
  async signout(@GetSession() session: SessionValidationResult, @Res({ passthrough: true }) response: Response): Promise<void> {
    response.clearCookie('session', { path: '/' });

    await this.authService.signOut(session.session.id);
  }
}
