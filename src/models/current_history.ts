import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Portfolio } from "./portfolio";
import { Account } from "./account";
import { User } from "./user";

export interface current_historyAttributes {
  trading_id: number;
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

@Table({ tableName: "current_history", timestamps: false })
export class Current_history
  extends Model<current_historyAttributes, current_historyAttributes>
  implements current_historyAttributes
{
  @Column({ primaryKey: true, type: DataType.BIGINT })
  @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
  trading_id!: number;

  @ForeignKey(() => Portfolio)
  @Column({ type: DataType.BIGINT })
  @Index({ name: "FK_portfolio_TO_current_history_1", using: "BTREE", order: "ASC", unique: false })
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
