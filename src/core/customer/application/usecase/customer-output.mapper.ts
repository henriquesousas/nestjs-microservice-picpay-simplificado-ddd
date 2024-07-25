import { Document } from '../../domain/document';
import { DocumentType } from '../../domain/document-type';
import { Customer } from '../../domain/entity/customer';
import { Wallet } from '../../domain/entity/wallet';

export type WalleteOutput = {
  wallet_id: string;
  balance: number;
};

export type DocumentOutput = {
  number: string;
  type: DocumentType;
};

export type CustomerOutput = {
  customer_id: string;
  first_name: string;
  sur_name: string;
  email: string;
  wallet: WalleteOutput;
  document: DocumentOutput;
  canTransfer: boolean;
  created_at: Date;
};

export class CustomerOutputMapper {
  static toOutput(entity: Customer): CustomerOutput {
    return {
      customer_id: entity.props.customerId?.id!,
      first_name: entity.props.name.getfirstName,
      sur_name: entity.props.name.getSurName,
      email: entity.props.email.getEmail(),
      document: {
        number: entity.props.document.getValue(),
        type: entity.props.document.getType(),
      },
      wallet: WalleteOutputMapper.toOutput(entity.props.wallet!),
      canTransfer: entity.canMakeTransfer(),
      created_at: entity.props.createdAt!,
    };
  }
}

export class WalleteOutputMapper {
  static toOutput(entity: Wallet): WalleteOutput {
    return {
      wallet_id: entity.getUUid().id!,
      balance: entity.balance!,
    };
  }
}

export class DocumentOutputMapper {
  static toOutput(entity: Document): DocumentOutput {
    return {
      number: entity.getValue(),
      type: entity.getType(),
    };
  }
}
