import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Account } from './account';
import { Stock } from './stock';

export interface trading_historyAttributes {
    trading_id?: number;
    account_id?: number;
    stock_id?: number;
    sll_buy_dvsn_cd?: string;
    trade_dt?: Date;
    tot_ccld_qty?: number;
    tot_ccld_amt?: number;
}

@Table({ tableName: 'trading_history', timestamps: true })
export class Trading_history
    extends Model<trading_historyAttributes, trading_historyAttributes>
    implements trading_historyAttributes
{
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT })
    @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
    trading_id?: number;

    @ForeignKey(() => Account)
    @Column({ allowNull: true, type: DataType.BIGINT })
    @Index({ name: 'account_id', using: 'BTREE', order: 'ASC', unique: false })
    account_id?: number;

    @ForeignKey(() => Stock)
    @Column({ allowNull: true, type: DataType.BIGINT })
    @Index({ name: 'stock_id', using: 'BTREE', order: 'ASC', unique: false })
    stock_id?: number;

    @Column({ allowNull: true, type: DataType.STRING })
    sll_buy_dvsn_cd?: string;

    @Column({ allowNull: true, type: DataType.DATE })
    trade_dt?: Date;

    @Column({ allowNull: true, type: DataType.INTEGER })
    tot_ccld_qty?: number;

    @Column({ allowNull: true, type: DataType.INTEGER })
    tot_ccld_amt?: number;

    @BelongsTo(() => Account)
    account!: Account;

    @BelongsTo(() => Stock)
    stock!: Stock;
}
