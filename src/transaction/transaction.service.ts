import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionService {
  async getTransactionHistory(userId: string) {
    return [
      {
        id: 1,
        userId,
        amount: 100,
        currency: 'USD',
        date: new Date(),
      },
      {
        id: 2,
        userId,
        amount: 200,
        currency: 'EUR',
        date: new Date(),
      },
    ];
  }
}
