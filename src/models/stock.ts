import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  AllowNull,
  BelongsTo,
  HasMany,
  HasOne,
} from "sequelize-typescript";
import { Market } from "./market";
import { Stock_in_account } from "./stock_in_account";
import { Trading_history } from "./trading_history";
import { Stock_history } from "./stock_history";

export interface stockAttributes {
  stock_id?: number;
  market_id?: number;
  name?: string;
  code?: string;
  listing_dt?: Date;
  delisting_dt?: Date;
  listing?: boolean;
}

@Table({ tableName: "stock", timestamps: true })
export class Stock
  extends Model<stockAttributes, stockAttributes>
  implements stockAttributes
{
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT })
  @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
  stock_id?: number;

  @ForeignKey(() => Market)
  @Column({ allowNull: true, type: DataType.BIGINT })
  @Index({ name: "market_id", using: "BTREE", order: "ASC", unique: false })
  market_id?: number;

  @Column({ allowNull: false, type: DataType.STRING(255) })
  name?: string;

  @Column({ allowNull: false, type: DataType.STRING })
  code?: string;

  @Column({ allowNull: true, type: DataType.DATE })
  listing_dt?: Date;

  @Column({ allowNull: true, type: DataType.DATE })
  delisting_dt?: Date;

  @Column({ allowNull: true, type: DataType.BOOLEAN })
  listing?: boolean;

  @BelongsTo(() => Market)
  market!: Market;

  @HasMany(() => Stock_in_account)
  stock_in_account!: Stock_in_account;

  @HasMany(() => Trading_history)
  trading_history!: Trading_history;

  //   주식 현재가와 일 대 일(오직 하나) 관계
  @HasMany(() => Stock_history)
  stock_history!: Stock_history;
}
