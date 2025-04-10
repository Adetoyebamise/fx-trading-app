import { Controller, Body, Post, Res } from '@nestjs/common';
import {
  AuthCredentialsDto,
  AuthCredentialsSignInDto,
  AuthCredentialsVerifyUserDto,
} from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body() authCredentialsSignInDto: AuthCredentialsSignInDto,
    @Res() res: Response,
  ): Promise<any> {
    return this.authService.signIn(authCredentialsSignInDto, res);
  }

  @Post('/verify')
  verifyUser(
    @Body() authCredentialsVerifyUserDto: AuthCredentialsVerifyUserDto,
    @Res() res: Response,
  ): Promise<any> {
    return this.authService.verifyUser(authCredentialsVerifyUserDto);
  }
}
