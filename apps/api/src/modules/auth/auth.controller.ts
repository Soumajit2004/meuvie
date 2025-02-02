import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { CreateUserDto } from '../user/dto/create-user.dto';
import { SignInUserDto } from './dto/request/signin-user.dto';
import { CookieGuard } from './guards/cookie.guard';
import { GetSession } from './decorators/get-session.decorator';
import { SessionValidationResult } from './types/session-validation-result.type';
import { IAuthService } from './interfaces/services/auth.service.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: IAuthService) {}

  @Get('csrf')
  csrfToken(@Req() request: Request): { csrfToken: string } {
    return { csrfToken: request.csrfToken() };
  }

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<void> {
    return this.authService.signUp(createUserDto);
  }

  @Post('signin')
  async signIn(
    @Body() signInUserDto: SignInUserDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    const { id: token, expiresAt } =
      await this.authService.signIn(signInUserDto);

    response.cookie('session', token, {
      httpOnly: true,
      sameSite: 'lax',
      expires: expiresAt,
      path: '/',
    });
  }

  @Delete('signout')
  @UseGuards(CookieGuard)
  async signout(
    @GetSession() session: SessionValidationResult,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    response.clearCookie('session', { path: '/' });

    await this.authService.signOut(session.session.id);
  }
}
