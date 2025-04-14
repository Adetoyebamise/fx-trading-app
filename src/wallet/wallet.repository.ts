import { DataSource, Repository } from 'typeorm';
import { Wallet } from './wallet.entity';

export class WalletRepository {
  private WalletRepository: Repository<Wallet>;

  constructor(private readonly datasource: DataSource) {
    this.WalletRepository = this.datasource.getRepository(Wallet);
  }

  async create(walletData: Partial<Wallet>): Promise<Wallet> {
    return await this.WalletRepository.create(walletData);
  }

  async save(wallet: Wallet): Promise<Wallet> {
    return await this.WalletRepository.save(wallet);
  }

  async findOneByUserId(userId: string): Promise<Wallet | null> {
    return await this.WalletRepository.findOne({
      where: { user: { id: userId } },
    });
  }
  async findOneByCurrencyId(currencyId: string): Promise<Wallet | null> {
    return await this.WalletRepository.findOne({
      where: { currency: { id: Number(currencyId) } },
    });
  }
  async findOneByUserIdAndCurrencyId(
    userId: string,
    currencyId: string,
  ): Promise<Wallet | null> {
    return await this.WalletRepository.findOne({
      where: { user: { id: userId }, currency: { id: Number(currencyId) } },
    });
  }

  async findOneById(id: string): Promise<Wallet | null> {
    return await this.WalletRepository.findOne({
      where: { id: Number(id) },
    });
  }
}
