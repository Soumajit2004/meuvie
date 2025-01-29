import { Body, Controller, Post, Res } from '@nestjs/common';

import { AuthService } from './services/auth/auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { SignInUserDto } from './dto/signin-user.dto';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {
  }

  @Post('/signup')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<void> {
    return this.authService.signUp(createUserDto);
  }

  @Post('/signin')
  async signIn(@Body() signInUserDto: SignInUserDto, @Res({ passthrough: true }) res: Response): Promise<void> {
    const { id: token, expiresAt } = await this.authService.signIn(signInUserDto);

    console.log(`session=${token}; HttpOnly; SameSite=Lax; Expires=${expiresAt.toUTCString()}; Path=/`);

    res.headers.set(
      'Set-Cookie',
      `session=${token}; HttpOnly; SameSite=Lax; Expires=${expiresAt.toUTCString()}; Path=/`,
    );

  }
}
