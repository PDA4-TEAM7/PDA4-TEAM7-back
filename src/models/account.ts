import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  BelongsTo,
  HasMany,
  HasOne,
} from "sequelize-typescript";
import { User } from "./user";
import { Stock_in_account } from "./stock_in_account";
import { Trading_history } from "./trading_history";
import { Portfolio } from "./portfolio";
export interface accountAttributes {
  account_id?: number;
  uid?: number;
  app_key?: string;
  app_secret?: string;
  account_number?: string;
  access_token?: string;
  access_token_valid_dt?: Date;
  pchs_amt_smtl_amt?: number;
  evlu_amt_smtl_amt?: number;
  evlu_pfls_smtl_amt?: number;
}

@Table({ tableName: "account", timestamps: false })
export class Account extends Model<accountAttributes, accountAttributes> implements accountAttributes {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT })
  @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
  account_id?: number;

  @ForeignKey(() => User)
  @Column({ allowNull: true, type: DataType.BIGINT })
  @Index({ name: "uid", using: "BTREE", order: "ASC", unique: false })
  uid?: number;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  app_key?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  app_secret?: string;

  @Column({ allowNull: true, type: DataType.TEXT })
  access_token?: string;

  @Column({ allowNull: true, type: DataType.DATE })
  access_token_valid_dt?: Date;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  account_number?: string;

  @Column({ allowNull: true, type: DataType.BIGINT })
  // 매입금액합계금액
  pchs_amt_smtl_amt?: number;

  @Column({ allowNull: true, type: DataType.BIGINT })
  // 평가금액합계금액
  evlu_amt_smtl_amt?: number;

  @Column({ allowNull: true, type: DataType.BIGINT })
  // 평가손익합계금액
  evlu_pfls_smtl_amt?: number;

  @BelongsTo(() => User)
  user!: User;

  @HasMany(() => Stock_in_account)
  stock_in_account!: Stock_in_account;

  @HasMany(() => Trading_history)
  trading_history!: Trading_history;

  @HasOne(() => Portfolio)
  portfolio!: Portfolio;
}
