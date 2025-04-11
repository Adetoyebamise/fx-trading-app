import { Injectable } from '@nestjs/common';
import { Wallet } from './wallet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { Currency } from '../currency/currency.entity';
import { UserRepository } from '../user/user.repository';
import { WalletRepository } from './wallet.repository';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private walletRepository: WalletRepository,
    private userRepository: UserRepository,
  ) {}

  async getUserWalletBalanceByCurrency(
    userId: string,
    currencyId: string,
  ): Promise<User | null> {
    return this.userRepository.findOneByUserId(userId);
  }
}
