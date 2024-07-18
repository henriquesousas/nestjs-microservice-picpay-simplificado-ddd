import { Wallet, WalletId } from '../../../../domain/entity/wallet';
import { WalletModel } from '../models/wallet.model';

export class WalletMapper {
  static toOrmModel(entity: Wallet, customerId: string): WalletModel {
    return WalletModel.build({
      walletId: entity.getUUid().id,
      balance: entity.balance,
      customerId,
    });
  }

  static toEntity(model: WalletModel): Wallet {
    return new Wallet({
      walletId: new WalletId(model.walletId),
      balance: model.balance,
    });
  }
}
