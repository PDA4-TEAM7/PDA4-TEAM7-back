import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from 'sequelize-typescript';

export interface sub_portfolioAttributes {
    portfolio_id?: number;
    uid?: number;
    st_dt?: string;
    ed_dt?: string;
}

@Table({ tableName: 'sub_portfolio', timestamps: false })
export class sub_portfolio
    extends Model<sub_portfolioAttributes, sub_portfolioAttributes>
    implements sub_portfolioAttributes
{
    @Column({ allowNull: true, type: DataType.BIGINT })
    @Index({ name: 'portfolio_id', using: 'BTREE', order: 'ASC', unique: false })
    portfolio_id?: number;
    @Column({ allowNull: true, type: DataType.BIGINT })
    @Index({ name: 'uid', using: 'BTREE', order: 'ASC', unique: false })
    uid?: number;
    @Column({ allowNull: true, type: DataType.DATEONLY })
    st_dt?: string;
    @Column({ allowNull: true, type: DataType.DATEONLY })
    ed_dt?: string;
}
