import { Controller, Body, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { WalletService } from './wallet.service';
import { Get, Query } from '@nestjs/common';

@Controller('wallet')
export class WalletController {
  constructor(private walletService: WalletService) {}

  @Get('/:userId')
  async getUserWalletBalanceByCurrency(
    @Query('currencyId') currencyId: string,
    userId: any,
    @Res() res: Response,
  ): Promise<any> {
    const wallets = await this.walletService.getUserWalletBalanceByCurrency(
      userId,
      currencyId,
    );
    return wallets;
  }
}
