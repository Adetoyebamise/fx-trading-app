import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from '../auth/dto/auth-credentials.dto';
import { Nodemailer } from '../services/NodeMailer/service';
import { AppError } from '../errors/appError';
import { ECONFLICT, ErrorUserExists, descriptions } from '../errors/index';
import * as bcrypt from 'bcrypt';
import { AlphaNumeric } from 'src/utils/helper';
import { Role } from '../role/role.entity';
import { Currency } from '../currency/currency.entity';
import { Wallet } from '../wallet/wallet.entity';
import { WalletRepository } from '../wallet/wallet.repository';
import { HttpException } from '@nestjs/common';

export class UserRepository {
  private userRepository: Repository<User>;
  private roleRepository: Repository<Role>;
  private currencyRepository: Repository<Currency>;
  private walletRepository: Repository<Wallet>;
  private sendEmailToUser: Nodemailer;

  constructor(private readonly datasource: DataSource) {
    this.userRepository = this.datasource.getRepository(User);
    this.roleRepository = this.datasource.getRepository(Role);
    this.currencyRepository = this.datasource.getRepository(Currency);
    this.walletRepository = this.datasource.getRepository(Wallet);
    this.sendEmailToUser = new Nodemailer();
  }

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    try {
      const { email, password } = authCredentialsDto;
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = this.userRepository.create({
        email,
        password: hashedPassword,
      });
      // Assign default role (if needed)
      const defaultRole = await this.roleRepository.findOneBy({ name: 'User' });
      console.log('defaultRole:', defaultRole);
      if (!defaultRole) {
        throw new AppError({
          errorType: ECONFLICT,
          appErrorCode: 'DefaultRoleNotFound',
          error: 'Default role not found',
        });
      }
      user.role = defaultRole;

      // Assign default currency (e.g. USD)
      const defaultCurrency = await this.currencyRepository.findOneBy({
        code: 'USD',
      });

      console.log('defaultCurrency:', defaultCurrency);

      if (!defaultCurrency) {
        throw new AppError({
          errorType: ECONFLICT,
          appErrorCode: 'DefaultCurrencyNotFound',
          error: 'Default currency not found',
        });
      }
      user.currency = defaultCurrency;

      const emailToken = AlphaNumeric(4);

      user.emailToken = emailToken;

      await this.userRepository.save(user);

      // Create wallet for user
      const wallet = this.walletRepository.create({
        user: user,
        currency: defaultCurrency,
        balance: 0.0,
      });

      console.log('wallet:', wallet);
      await this.walletRepository.save(wallet);

      console.log('emailToken:', emailToken);
      const html = `<h1>Welcome to our Fx trading platform</h1><p>Thanks for signing up, ${email} , Please verify your account with this Code ${emailToken}</p>`;

      const sendEmailToUser = await this.sendEmailToUser.sendEmailToUser(
        email,
        html,
      );

      console.log('sendEmailToUser:', sendEmailToUser);
      console.log('SavedUser:', user);
    } catch (err) {
      if (err && err.code === '23505') {
        throw new AppError({
          errorType: ECONFLICT,
          appErrorCode: ErrorUserExists,
          error: descriptions.ErrorUserExists,
        });
      }
      if (err.code === '3992') {
        throw new HttpException('Custom error message', 3992);
      }
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ email });
  }

  async findOneByEmailToken(emailToken: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { emailToken } });
  }

  async findOneByUserId(userId: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { id: userId },
      relations: ['currency'],
      // select: ['id', 'balance'],
    });
  }

  async save(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }
}
