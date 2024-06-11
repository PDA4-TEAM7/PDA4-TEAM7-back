import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from 'sequelize-typescript';

export interface portfolioAttributes {
    portfolio_id?: number;
    account_id?: number;
    published?: number;
    price?: number;
    update_dt?: string;
    create_dt?: string;
    title?: string;
    description?: string;
}

@Table({ tableName: 'portfolio', timestamps: false })
export class portfolio extends Model<portfolioAttributes, portfolioAttributes> implements portfolioAttributes {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT })
    @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
    portfolio_id?: number;
    @Column({ allowNull: true, type: DataType.BIGINT })
    @Index({ name: 'account_id', using: 'BTREE', order: 'ASC', unique: false })
    account_id?: number;
    @Column({ allowNull: true, type: DataType.TINYINT })
    published?: number;
    @Column({ allowNull: true, type: DataType.INTEGER })
    price?: number;
    @Column({ allowNull: true, type: DataType.DATEONLY })
    update_dt?: string;
    @Column({ allowNull: true, type: DataType.DATEONLY })
    create_dt?: string;
    @Column({ allowNull: true, type: DataType.STRING(20) })
    title?: string;
    @Column({ allowNull: true, type: DataType.STRING(255) })
    description?: string;
}
