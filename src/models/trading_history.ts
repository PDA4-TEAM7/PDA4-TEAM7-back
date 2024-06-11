import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from 'sequelize-typescript';

export interface trading_historyAttributes {
    trading_id?: number;
    account_id?: number;
    stock_id?: number;
    sls_buy_divsn?: number;
    trade_dt?: string;
    tot_ccl_qty?: number;
    tot_ccl_amt?: number;
}

@Table({ tableName: 'trading_history', timestamps: false })
export class trading_history
    extends Model<trading_historyAttributes, trading_historyAttributes>
    implements trading_historyAttributes
{
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT })
    @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
    trading_id?: number;
    @Column({ allowNull: true, type: DataType.BIGINT })
    @Index({ name: 'account_id', using: 'BTREE', order: 'ASC', unique: false })
    account_id?: number;
    @Column({ allowNull: true, type: DataType.BIGINT })
    @Index({ name: 'stock_id', using: 'BTREE', order: 'ASC', unique: false })
    stock_id?: number;
    @Column({ allowNull: true, type: DataType.INTEGER })
    sls_buy_divsn?: number;
    @Column({ allowNull: true, type: DataType.DATEONLY })
    trade_dt?: string;
    @Column({ allowNull: true, type: DataType.INTEGER })
    tot_ccl_qty?: number;
    @Column({ allowNull: true, type: DataType.INTEGER })
    tot_ccl_amt?: number;
}
