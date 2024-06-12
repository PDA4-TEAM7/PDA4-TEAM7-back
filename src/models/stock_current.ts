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
import { Stock } from "./stock";
import { Market } from "./market";
// import { Stock_in_account } from "./stock_in_account";
// import { Trading_history } from "./trading_history";

export interface stockCurrentAttributes {
  stock_id?: number;
  market_id?: number;
  now_price?: number;
  closing_price?: number;
}

@Table({ tableName: "stock_current", timestamps: true })
export class Stock_current
  extends Model<stockCurrentAttributes, stockCurrentAttributes>
  implements stockCurrentAttributes
{
  @ForeignKey(() => Stock)
  @Column({ allowNull: true, type: DataType.BIGINT })
  @Index({ name: "stock_id", using: "BTREE", order: "ASC", unique: false })
  stock_id?: number;

  @ForeignKey(() => Market)
  @Column({ allowNull: true, type: DataType.BIGINT })
  @Index({ name: "market_id", using: "BTREE", order: "ASC", unique: false })
  market_id?: number;

  @Column({ allowNull: true, type: DataType.BIGINT })
  now_price?: number;

  @Column({ allowNull: true, type: DataType.BIGINT })
  closing_price?: number;

  @BelongsTo(() => Stock)
  market!: Stock;
}
