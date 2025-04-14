import { DataSource, Repository } from 'typeorm';
import { Currency } from './currency.entity';

export class CurrencyRepository {
  private CurrencyRepository: Repository<Currency>;

  constructor(private readonly datasource: DataSource) {
    this.CurrencyRepository = this.datasource.getRepository(Currency);
  }

  async findeOneById(id: string): Promise<Currency | null> {
    return await this.CurrencyRepository.findOne({
      where: { id: Number(id) },
    });
  }
}
