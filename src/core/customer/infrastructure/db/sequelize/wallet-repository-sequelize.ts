import { CustomerId } from '../../../domain/entity/customer';
import { Wallet } from '../../../domain/entity/wallet';
import { WalletTypeOrmModel } from './models/wallet-typeorm.model';
import {
  UpdateWalletDto,
  WalletRepository,
} from '../../../domain/repository/wallet.repository';
import { Injectable } from '@nestjs/common';
import { UnitOfWork } from '../../../../../../libs/common/src/core/application/unit-of-work';
import { WalletMapper } from './mapper/wallet.mapper';
import { Op } from 'sequelize';

@Injectable()
export class WalletRepositorySequelize implements WalletRepository {
  constructor(
    readonly walletModel: typeof WalletTypeOrmModel,
    readonly uow: UnitOfWork,
  ) {}

  async findByIds(ids: CustomerId[]): Promise<Wallet[]> {
    const models = await this.walletModel.findAll({
      where: {
        customerId: {
          [Op.in]: ids.map((id) => id.id),
        },
      },
    });
    return models.map((m) => WalletMapper.toEntity(m));
  }

  async save(data: UpdateWalletDto[]): Promise<void> {
    data.map(async (dto) => {
      const model = WalletMapper.toOrmModel(
        dto.wallet,
        dto.customerId.id,
      ).toJSON();
      const [affectedRows] = await this.walletModel.update(model, {
        where: { customerId: dto.customerId.id },
        transaction: this.uow.getTransaction(),
      });
    });
  }
}
