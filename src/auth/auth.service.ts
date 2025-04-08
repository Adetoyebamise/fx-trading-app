import { Injectable } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';
import { AppError } from '../errors/appError';
import { EINVALID, descriptions } from '../errors/index';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const user = await this.userRepository.createUser(authCredentialsDto);
    return user;
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
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

    return 'Login Succesful';
  }
}
