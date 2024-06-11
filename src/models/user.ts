import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey, AllowNull, HasMany } from 'sequelize-typescript';
import { Account } from './account';
import { Sub_portfolio } from './sub_portfolio';
export interface userAttributes {
    uid?: number;
    user_id?: string;
    username?: string;
    auth_token?: string;
    password?: string;
    credit?: number;
    join?: Date;
}

@Table({ tableName: 'user', timestamps: true })
export class User extends Model<userAttributes, userAttributes> implements userAttributes {
    @Column({
        primaryKey: true,
        autoIncrement: true,
        type: DataType.BIGINT,
    })
    @Index({
        name: 'PRIMARY',
        using: 'BTREE',
        order: 'ASC',
        unique: true,
    })
    uid?: number;

    @Column({
        allowNull: false,
        unique: true,
        type: DataType.STRING(255),
    })
    user_id?: string;

    @Column({
        allowNull: false,
        unique: true,
        type: DataType.STRING(255),
    })
    username?: string;

    @Column({
        allowNull: true,
        type: DataType.STRING(255),
    })
    auth_token?: string;

    @Column({
        allowNull: false,
        type: DataType.STRING(255),
    })
    password?: string;

    @Column({
        allowNull: true,
        type: DataType.BIGINT,
    })
    credit?: number;

    @Column({
        allowNull: false,
        type: DataType.DATE,
    })
    join_dt?: Date;

    @HasMany(() => Account)
    accounts!: Account[];

    @HasMany(() => Sub_portfolio)
    sub_portfolio!: Sub_portfolio;
    // @HasMany(() => Sub_portfolio)
    // sub_portfolio!: Sub_portfolio[];
}
