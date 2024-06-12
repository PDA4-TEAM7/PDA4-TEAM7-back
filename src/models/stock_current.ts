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

export interface stockHistoryAttributes {
  stock_id?: number;
  market_id?: number;
  now_price?: number;
  closing_price?: number;
  update_dt?: Date;
}

@Table({ tableName: "stock_current", timestamps: true })
export class Stock_history
  extends Model<stockHistoryAttributes, stockHistoryAttributes>
  implements stockHistoryAttributes
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

  @Column({ allowNull: true, type: DataType.BIGINT })
  update_dt?: Date;

  @BelongsTo(() => Stock)
  market!: Stock;
}
