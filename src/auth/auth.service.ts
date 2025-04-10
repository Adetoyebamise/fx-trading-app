import { Response } from 'express';
import { generateJWT } from '../utils/helper';
import { UserAuthObject } from '../utils/helper';
import { Injectable } from '@nestjs/common';
import {
  AuthCredentialsDto,
  AuthCredentialsSignInDto,
  AuthCredentialsVerifyUserDto,
} from './dto/auth-credentials.dto';
import { UserRepository } from '../user/user.repository';
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
    authCredentialsSignInDto: AuthCredentialsSignInDto,
    res: Response,
  ): Promise<Response | void> {
    try {
      const { email, password } = authCredentialsSignInDto;
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

  async verifyUser(
    authCredentialsVerifyUserDto: AuthCredentialsVerifyUserDto,
  ): Promise<any> {
    try {
      const { email, emailToken } = authCredentialsVerifyUserDto;
      const user = await this.userRepository.findOneByEmailToken(emailToken);

      if (!user) {
        throw new AppError({
          errorType: EINVALID,
          appErrorCode: '',
          error: descriptions.ErrorRequestDenied,
        });
      }

      // If the verifiableUser exists, update the email verification status
      user.emailToken = '';
      user.isVerified = true;

      // user = await this.userRepository.save(user);

      return user;
    } catch (error) {
      throw new AppError({
        errorType: EINVALID,
        appErrorCode: '',
        error: descriptions.ErrorRequestDenied,
      });
    }
  }
}
