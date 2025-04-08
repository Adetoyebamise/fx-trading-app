import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AppError } from '../errors/appError';
import { ECONFLICT, ErrorUserExists, descriptions } from '../errors/index';
import * as bcrypt from 'bcrypt';

export class UserRepository {
  private userRepository: Repository<User>;

  constructor(private readonly datasource: DataSource) {
    this.userRepository = this.datasource.getRepository(User);
  }

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { email, password } = authCredentialsDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.userRepository.create({
      email,
      password: hashedPassword,
    });

    await this.userRepository.save(user).catch((err) => {
      if (err && err.code === '23505') {
        throw new AppError({
          errorType: ECONFLICT,
          appErrorCode: ErrorUserExists,
          error: descriptions.ErrorUserExists,
        });
      }
    });

    console.log('SavedUser:', user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ email });
  }
}
