import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './user/user.entity';
import { Role } from './role/role.entity';
import { WalletModule } from './wallet/wallet.module';
import { CurrencyModule } from './currency/currency.module';
import { FxModule } from './fx/fx.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'postgres',
      entities: [User, Role],
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
    AuthModule,
    WalletModule,
    CurrencyModule,
    FxModule,
    TransactionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
