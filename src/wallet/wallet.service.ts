import { Injectable } from '@nestjs/common';
import { Wallet } from './wallet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { Currency } from '../currency/currency.entity';
import { UserRepository } from '../user/user.repository';
import { WalletRepository } from './wallet.repository';
import { CurrencyRepository } from '../currency/currency.repository';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private userRepository: UserRepository,
    private walletRepository: WalletRepository,
    private currencyRepository: CurrencyRepository,
  ) {}

  async getUserWalletBalanceByCurrency(
    userId: string,
    currencyId: string,
  ): Promise<User | null> {
    return this.userRepository.findOneByUserId(userId);
  }

  async fundWallet(
    userId: string,
    currencyId: string,
    amount: number,
  ): Promise<Wallet | null> {
    const user = await this.userRepository.findOneByUserId(userId);
    const currency = await this.currencyRepository.findeOneById(currencyId);

    if (!user || !currency) {
      return null;
    }

    const wallet = await this.walletRepository.findOneByUserIdAndCurrencyId(
      userId,
      currencyId,
    );

    if (wallet) {
      wallet.balance += amount;
      return await this.walletRepository.save(wallet);
    } else {
      const newWallet = await this.walletRepository.create({
        user,
        currency,
        balance: amount,
      });
      return await this.walletRepository.save(newWallet);
    }
  }
  async convertWallet(
    userId: string,
    currencyId: string,
    amount: number,
  ): Promise<Wallet | null> {
    const user = await this.userRepository.findOneByUserId(userId);
    const currency =
      await this.walletRepository.findOneByCurrencyId(currencyId);

    if (!user || !currency) {
      return null;
    }

    const wallet = await this.walletRepository.findOneByUserIdAndCurrencyId(
      userId,
      currencyId,
    );

    if (wallet && wallet.balance >= amount) {
      wallet.balance -= amount;
      return this.walletRepository.save(wallet);
    } else {
      return null;
    }
  }

  async tradeWallet(
    userId: string,
    currencyId: string,
    amount: number,
  ): Promise<Wallet | null> {
    const user = await this.userRepository.findOneByUserId(userId);
    const currency =
      await this.walletRepository.findOneByCurrencyId(currencyId);

    if (!user || !currency) {
      return null;
    }

    const wallet = await this.walletRepository.findOneByUserIdAndCurrencyId(
      userId,
      currencyId,
    );

    if (wallet && wallet.balance >= amount) {
      wallet.balance -= amount;
      return this.walletRepository.save(wallet);
    } else {
      return null;
    }
  }
}
