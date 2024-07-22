import { setupSequelize } from '../../../../../../../libs/common/src/core/config/setup-sequelize';
import { Uuid } from '../../../../../../../libs/common/src/core/domain/value-object/uuid';
import { UnitOfWorkSequelize } from '../../../../../../../libs/common/src/nestjs/database/sequelize/unit-of-work.sequelize';
import {
  CustomerId,
  TransactionId,
  TransactionType,
} from '../../../../domain/entity/transaction';
import { TransactionBuilder } from '../../../../domain/transaction.builder';
import { TransactionModel } from '../model/transaction.model';
import { TransactionRepositorySequelize } from '../transaction-repository.sequelize';

describe('TransactionRepositoruSequelize Unit Tests', () => {
  let _sut: TransactionRepositorySequelize;
  let _unitOfWork: UnitOfWorkSequelize;
  const sequelize = setupSequelize({ models: [TransactionModel] });

  beforeEach(() => {
    _unitOfWork = new UnitOfWorkSequelize(sequelize.sequelize);
    _sut = new TransactionRepositorySequelize(TransactionModel, _unitOfWork);
  });

  describe('Insert', () => {
    it('should insert a new transaction', async () => {
      const transaction = new TransactionBuilder({
        transaction_id: new TransactionId(),
        type: TransactionType.TRANSFERENCE,
        sender: new CustomerId(),
        amount: 10,
      })
        .withReceiver(new CustomerId())
        .build();

      await _sut.insert(transaction);
      const data = await TransactionModel.findByPk(transaction.getUUid().id);

      expect(data?.dataValues.receiver).toBe(transaction.props.receiver?.id);
    });
  });

  describe('findById', () => {
    it('should find a transaction by id', async () => {
      const transaction = new TransactionBuilder({
        transaction_id: new TransactionId(),
        type: TransactionType.TRANSFERENCE,
        sender: new CustomerId(),
        amount: 10,
      })
        .withReceiver(new CustomerId())
        .build();

      await _sut.insert(transaction);
      const data = await _sut.findById(transaction.getUUid().id);

      expect(data?.props.sender.id).toBe(transaction.props.sender?.id);
    });

    it('should return  null when transaction not found', async () => {
      const data = await _sut.findById(new Uuid().id);
      expect(data).toBeFalsy();
    });
  });
});
