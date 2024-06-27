import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  BelongsTo,
  AutoIncrement,
} from "sequelize-typescript";
import { Portfolio } from "./portfolio";
import { Account } from "./account";
import { User } from "./user";

export interface RecencyHistoryAttributes {
  portfolio_id: number;
  account_id: number;
  uid?: number;
  name?: string;
  sll_buy_dvsn_cd?: string;
  tot_ccld_qty?: string;
  tot_ccld_amt?: string;
  avg_prvs?: string;
  trade_dt?: Date;
}

@Table({ tableName: "recencyhistory", timestamps: true })
export class RecencyHistory
  extends Model<RecencyHistoryAttributes, RecencyHistoryAttributes>
  implements RecencyHistoryAttributes
{
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT })
  @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
  trading_id!: number;

  @ForeignKey(() => Portfolio)
  @Column({ type: DataType.BIGINT })
  portfolio_id!: number;

  @ForeignKey(() => Account)
  @Column({ type: DataType.BIGINT })
  account_id!: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.BIGINT })
  uid?: number;

  @Column({ allowNull: true, type: DataType.STRING(30) })
  name?: string;

  @Column({ allowNull: true, type: DataType.STRING(30) })
  sll_buy_dvsn_cd?: string;

  @Column({ allowNull: true, type: DataType.STRING(30) })
  tot_ccld_qty?: string;

  @Column({ allowNull: true, type: DataType.STRING(30) })
  tot_ccld_amt?: string;

  @Column({ allowNull: true, type: DataType.STRING(30) })
  avg_prvs?: string;

  @Column({ allowNull: true, type: DataType.DATE })
  trade_dt?: Date;

  @BelongsTo(() => Portfolio)
  portfolio!: Portfolio;

  @BelongsTo(() => Account)
  account!: Account;
}
