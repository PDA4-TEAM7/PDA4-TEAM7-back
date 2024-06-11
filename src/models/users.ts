// models/users.ts

import { Model, Column, Table, DataType, HasMany } from 'sequelize-typescript';
import { Account } from './accounts';

@Table({
    timestamps: true,
    tableName: 'user',
})
export class User extends Model {
    @Column({
        type: DataType.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    })
    uid!: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    user_id!: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    userName!: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    auth_token!: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    password!: string;

    @Column({
        type: DataType.BIGINT,
        allowNull: true,
    })
    credit!: number;

    @HasMany(() => Account)
    account!: Account[];
}
