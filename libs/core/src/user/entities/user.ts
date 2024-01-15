import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserType } from './user.type';
import { Document } from './document';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  firstName: string;

  @Column()
  secondName: string;

  @Column()
  document: Document;

  @Column()
  password: string;

  @Column()
  amount: number;

  @Column({
    type: 'enum',
    enum: UserType,
    default: UserType.COMMON,
  })
  userType: UserType;

  @CreateDateColumn({ type: 'timestamp' })
  createAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  constructor(entity: Partial<User>) {
    Object.assign(this, entity);
  }
}
