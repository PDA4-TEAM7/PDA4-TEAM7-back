import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Portfolio } from './portfolio';
import { User } from './user';
import { DATE } from 'sequelize';

export interface sub_portfolioAttributes {
    portfolio_id?: number;
    uid?: number;
    st_dt?: Date;
    ed_dt?: Date;
    can_sub?: boolean;
}

@Table({ tableName: 'sub_portfolio', timestamps: true })
export class Sub_portfolio
    extends Model<sub_portfolioAttributes, sub_portfolioAttributes>
    implements sub_portfolioAttributes
{
    @ForeignKey(() => Portfolio)
    @Column({ allowNull: false, type: DataType.BIGINT })
    @Index({ name: 'portfolio_id', using: 'BTREE', order: 'ASC', unique: false })
    portfolio_id?: number;

    @ForeignKey(() => User)
    @Column({ allowNull: false, type: DataType.BIGINT })
    @Index({ name: 'uid', using: 'BTREE', order: 'ASC', unique: false })
    uid?: number;

    @Column({ allowNull: false, type: DataType.DATE })
    st_dt?: Date;

    @Column({ allowNull: false, type: DataType.DATE })
    ed_dt?: Date;

    @Column({ allowNull: false, type: DataType.BOOLEAN })
    can_sub?: boolean;

    @BelongsTo(() => Portfolio)
    portfolio!: Portfolio;

    @BelongsTo(() => User)
    user!: User;
}
