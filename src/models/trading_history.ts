import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Account } from "./account";
import { Stock } from "./stock";

export interface trading_historyAttributes {
  trading_id?: number;
  account_id?: number;
  stock_id?: number;
  sll_buy_dvsn_cd?: string; //01: 매도 02:매수
  trade_dt?: Date;
  tot_ccld_qty?: string;
  tot_ccld_amt?: string;
}

@Table({ tableName: "trading_history", timestamps: false })
export class Trading_history
  extends Model<trading_historyAttributes, trading_historyAttributes>
  implements trading_historyAttributes
{
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT })
  @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
  trading_id?: number;

  @ForeignKey(() => Account)
  @Column({ allowNull: true, type: DataType.BIGINT })
  @Index({ name: "account_id", using: "BTREE", order: "ASC", unique: false })
  account_id?: number;

  @ForeignKey(() => Stock)
  @Column({ allowNull: true, type: DataType.BIGINT })
  @Index({ name: "stock_id", using: "BTREE", order: "ASC", unique: false })
  stock_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(30) })
  sll_buy_dvsn_cd?: string;

  @Column({ allowNull: true, type: DataType.DATE })
  trade_dt?: Date;

  @Column({ allowNull: true, type: DataType.STRING(30) })
  tot_ccld_qty?: string;

  @Column({ allowNull: true, type: DataType.STRING(30) })
  tot_ccld_amt?: string;

  @BelongsTo(() => Account)
  account!: Account;

  @BelongsTo(() => Stock)
  stock!: Stock;
}
