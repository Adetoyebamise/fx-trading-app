import { Controller, Body, Post, Res } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
    @Res() res: Response,
  ): Promise<any> {
    return this.authService.signIn(authCredentialsDto, res);
  }
}
