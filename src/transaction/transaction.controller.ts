import { Controller, Get, Query } from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Get()
  async getTransactionHistory(@Query('userId') userId: string) {
    return this.transactionService.getTransactionHistory(userId);
  }
}
