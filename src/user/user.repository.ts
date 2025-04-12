import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from '../auth/dto/auth-credentials.dto';
import { Nodemailer } from '../services/NodeMailer/service';
import { AppError } from '../errors/appError';
import { ECONFLICT, ErrorUserExists, descriptions } from '../errors/index';
import * as bcrypt from 'bcrypt';
import { AlphaNumeric } from 'src/utils/helper';

export class UserRepository {
  private userRepository: Repository<User>;
  private sendEmailToUser: Nodemailer;

  constructor(private readonly datasource: DataSource) {
    this.userRepository = this.datasource.getRepository(User);
    this.sendEmailToUser = new Nodemailer();
  }

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { email, password } = authCredentialsDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.userRepository.create({
      email,
      password: hashedPassword,
    });

    const emailToken = AlphaNumeric(4);
    const html = `<h1>Welcome to our Fx trading platform</h1><p>Thanks for signing up, ${email} , Please verify your account with this Code ${emailToken}</p>`;

    const sendEmailToUser = await this.sendEmailToUser.sendEmailToUser(
      email,
      html,
    );
    user.emailToken = emailToken;
    await this.userRepository.save(user).catch((err) => {
      if (err && err.code === '23505') {
        throw new AppError({
          errorType: ECONFLICT,
          appErrorCode: ErrorUserExists,
          error: descriptions.ErrorUserExists,
        });
      }
    });

    console.log('sendEmailToUser:', sendEmailToUser);
    console.log('SavedUser:', user);
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
