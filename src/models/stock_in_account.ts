import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  BelongsTo,
  AllowNull,
} from "sequelize-typescript";
import { Account } from "./account";
import { Market } from "./market";
import { Stock } from "./stock";
export interface stock_in_accountAttributes {
  holdings_id?: number;
  account_id?: number;
  stock_id?: number;
  market_id?: number;
  hldg_qty?: string;
  // 매입 금액
  pchs_amt?: string;
  // 평가 금액
  evlu_amt?: string;
  // 평가 손익 금액
  evlu_pfls_amt?: string;
  // 손익률
  evlu_pfls_rt?: string;
}

@Table({ tableName: "stock_in_account", timestamps: false })
export class Stock_in_account
  extends Model<stock_in_accountAttributes, stock_in_accountAttributes>
  implements stock_in_accountAttributes
{
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT })
  @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
  holdings_id?: number;

  @ForeignKey(() => Account)
  @Column({ allowNull: true, type: DataType.BIGINT })
  @Index({ name: "account_id", using: "BTREE", order: "ASC", unique: false })
  account_id?: number;

  @ForeignKey(() => Stock)
  @Column({ allowNull: true, type: DataType.BIGINT })
  @Index({ name: "stock_id", using: "BTREE", order: "ASC", unique: false })
  stock_id?: number;

  //TODO: 팀원들의 의견듣고 반영하기
  @ForeignKey(() => Market)
  @Column({ allowNull: true, type: DataType.BIGINT })
  market_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(30) })
  hldg_qty?: string;

  @Column({ allowNull: true, type: DataType.STRING(30) })
  pchs_amt?: string;

  @Column({ allowNull: true, type: DataType.STRING(30) })
  evlu_amt?: string;

  @Column({ allowNull: true, type: DataType.STRING(30) })
  evlu_pfls_amt?: string;

  @Column({ allowNull: true, type: DataType.STRING(30) })
  evlu_pfls_rt?: string;

  @BelongsTo(() => Account)
  account!: Account;

  @BelongsTo(() => Stock)
  stock!: Stock;

  @BelongsTo(() => Market)
  market!: Market;
}
