import { DataSource, Repository } from 'typeorm';
import { Wallet } from './wallet.entity';

export class WalletRepository {
  private WalletRepository: Repository<Wallet>;

  constructor(private readonly datasource: DataSource) {
    this.WalletRepository = this.datasource.getRepository(Wallet);
  }
}
