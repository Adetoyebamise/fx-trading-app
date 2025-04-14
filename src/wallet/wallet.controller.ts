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
    console.log('wallets:', wallets);
    return wallets;
  }

  @Post('/fund')
  async fundWallet(
    @Body('userId') userId: string,
    @Body('currencyId') currencyId: string,
    @Body('amount') amount: number,
    @Res() res: Response,
  ): Promise<any> {
    const wallets = await this.walletService.fundWallet(
      userId,
      currencyId,
      amount,
    );
    console.log('wallets:', wallets);
    return wallets;
  }

  @Post('/convert')
  async convertWallet(
    @Body('userId') userId: string,
    @Body('currencyId') currencyId: string,
    @Body('amount') amount: number,
    @Res() res: Response,
  ): Promise<any> {
    const wallets = await this.walletService.convertWallet(
      userId,
      currencyId,
      amount,
    );
    console.log('wallets:', wallets);
    return wallets;
  }

  @Post('/trade')
  async tradeWallet(
    @Body('userId') userId: string,
    @Body('currencyId') currencyId: string,
    @Body('amount') amount: number,
    @Res() res: Response,
  ): Promise<any> {
    const wallets = await this.walletService.tradeWallet(
      userId,
      currencyId,
      amount,
    );
    console.log('wallets:', wallets);
    return wallets;
  }
}
