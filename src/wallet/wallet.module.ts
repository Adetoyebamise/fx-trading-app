import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { DataSource } from 'typeorm';
import { WalletRepository } from './wallet.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './wallet.entity';
import { User } from '../user/user.entity';
import { Currency } from 'src/currency/currency.entity';
import { UserRepository } from 'src/user/user.repository';
import { CurrencyRepository } from 'src/currency/currency.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Wallet, User, Currency])],
  providers: [
    WalletService,
    {
      provide: WalletRepository,
      useFactory: (dataSource: DataSource) => {
        return new WalletRepository(dataSource);
      },
      inject: [DataSource],
    },
    {
      provide: UserRepository,
      useFactory: (dataSource: DataSource) => {
        return new UserRepository(dataSource);
      },
      inject: [DataSource],
    },
    {
      provide: CurrencyRepository,
      useFactory: (dataSource: DataSource) => {
        return new CurrencyRepository(dataSource);
      },
      inject: [DataSource],
    },
  ],
  exports: [WalletRepository],
  controllers: [WalletController],
})
export class WalletModule {}
