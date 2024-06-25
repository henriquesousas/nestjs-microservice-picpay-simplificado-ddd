import { Uuid } from '../../../../@shared/value-object/uuid';
import { Wallet, WalletId } from '../../../domain/value-object/wallet';
import { WalletModel } from './wallet.model';

export class WalletMapper {
  static toModel(entity: Wallet, customerId: string): WalletModel {
    return WalletModel.build({
      walletId: entity.entityId.id,
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
