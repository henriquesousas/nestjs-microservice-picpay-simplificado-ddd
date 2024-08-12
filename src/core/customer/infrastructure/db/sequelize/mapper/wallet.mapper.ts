import { Wallet, WalletId } from '../../../../domain/entity/wallet';
import { WalletTypeOrmModel } from '../models/wallet-typeorm.model';

export class WalletMapper {
  static toOrmModel(entity: Wallet, customerId: string): WalletTypeOrmModel {
    return WalletTypeOrmModel.build({
      walletId: entity.getUUid().id,
      balance: entity.balance,
      customerId,
    });
  }

  static toEntity(model: WalletTypeOrmModel): Wallet {
    return new Wallet({
      walletId: new WalletId(model.walletId),
      balance: model.balance,
    });
  }
}
