import { Response } from 'express';
import { generateJWT } from '../utils/helper';
import { UserAuthObject } from '../utils/helper';
import { Injectable } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';
import { AppError } from '../errors/appError';
import { EINVALID, descriptions } from '../errors/index';
import * as bcrypt from 'bcrypt';
import { Res } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const user = await this.userRepository.createUser(authCredentialsDto);
    return user;
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
    res: Response,
  ): Promise<Response | void> {
    try {
      const { email, password } = authCredentialsDto;
      const user = await this.userRepository.findByEmail(email);
      console.log('user', user);
      if (!user) {
        throw new AppError({
          errorType: EINVALID,
          appErrorCode: '',
          error: descriptions.ErrorUsernameOrPassword,
        });
      }

      //If user exists, validate Password
      const valid = await bcrypt.compare(user.password, password);
      console.log('valid', valid);

      if (valid) {
        throw new AppError({
          errorType: EINVALID,
          appErrorCode: '',
          error: descriptions.ErrorUsernameOrPassword,
        });
      }

      const payload: UserAuthObject = {
        id: user.id,
        email: user.email,
      };
      const jwt = generateJWT(process.env.JWT_KEY || '', payload);

      res.status(200).json({
        status: 'success',
        message: 'login successful',
        data: { token: jwt, user: payload },
      });
    } catch (e) {
      throw new AppError({
        errorType: EINVALID,
        appErrorCode: '',
        error: descriptions.ErrorRequestDenied,
      });
    }
  }
}
