import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Account } from './account';
import { Sub_portfolio } from './sub_portfolio';

export interface portfolioAttributes {
    portfolio_id?: number;
    account_id?: number;
    published?: boolean;
    price?: number;
    update_dt?: Date;
    create_dt?: Date;
    title?: string;
    description?: string;
}

@Table({ tableName: 'portfolio', timestamps: true })
export class Portfolio extends Model<portfolioAttributes, portfolioAttributes> implements portfolioAttributes {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT })
    @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
    portfolio_id?: number;

    @ForeignKey(() => Account)
    @Column({ allowNull: true, type: DataType.BIGINT })
    @Index({ name: 'account_id', using: 'BTREE', order: 'ASC', unique: false })
    account_id?: number;

    @Column({ allowNull: true, type: DataType.BOOLEAN })
    published?: boolean;

    @Column({ allowNull: true, type: DataType.INTEGER })
    price?: number;

    @Column({ allowNull: true, type: DataType.DATEONLY })
    update_dt?: Date;

    @Column({ allowNull: true, type: DataType.DATEONLY })
    create_dt?: Date;

    @Column({ allowNull: true, type: DataType.STRING(20) })
    title?: string;

    @Column({ allowNull: true, type: DataType.STRING(255) })
    description?: string;

    @BelongsTo(() => Account)
    account!: Account;

    @HasMany(() => Sub_portfolio)
    sub_portfolio!: Sub_portfolio;
}
