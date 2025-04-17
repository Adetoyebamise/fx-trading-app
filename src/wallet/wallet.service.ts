import { Inject, Injectable } from '@nestjs/common';
import { Wallet } from './wallet.entity';
import { User } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import { WalletRepository } from './wallet.repository';
import { CurrencyRepository } from '../currency/currency.repository';
import { USER_REPOSITORY } from '../user/user.constant';
import { AppError } from '../errors/appError';
import { EINVALID, descriptions } from '../errors/index';
import { Response } from 'express';

@Injectable()
export class WalletService {
  constructor(
    @Inject(USER_REPOSITORY)
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
    res: Response,
  ): Promise<void> {
    const user = await this.userRepository.findOneByUserId(userId);
    const currency = await this.currencyRepository.findeOneById(currencyId);
    console.log('user:', user);
    console.log('currency:', currency);

    if (!user || !currency) {
      throw new AppError({
        errorType: EINVALID,
        appErrorCode: '',
        error: descriptions.ErrorRequestDenied,
      });
    }

    const wallet = await this.walletRepository.findOneByUserIdAndCurrencyId(
      userId,
      currencyId,
    );

    console.log('wallet:', wallet);

    if (wallet) {
      wallet.balance += amount;
      await this.walletRepository.save(wallet);
    } else if (wallet === null) {
      throw new AppError({
        errorType: EINVALID,
        appErrorCode: '',
        error: descriptions.ErrorRequestDenied,
      });
    } else {
      const newWallet = await this.walletRepository.create({
        user,
        currency,
        balance: amount,
      });
      const confirmedWallet = await this.walletRepository.save(newWallet);

      res.status(200).json({
        status: 'success',
        message: 'Wallet Details Successfully Created',
        data: confirmedWallet,
      });
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
