import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from 'sequelize-typescript';

export interface userAttributes {
    uid?: number;
    user_id?: string;
    username?: string;
    auth_token?: string;
    password?: string;
    credit?: number;
}

@Table({ tableName: 'user', timestamps: true })
export class user extends Model<userAttributes, userAttributes> implements userAttributes {
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
        allowNull: true,
        type: DataType.STRING(255),
    })
    user_id?: string;
    @Column({
        allowNull: true,
        type: DataType.STRING(255),
    })
    username?: string;
    @Column({
        allowNull: true,
        type: DataType.STRING(255),
    })
    auth_token?: string;
    @Column({
        allowNull: true,
        type: DataType.STRING(255),
    })
    password?: string;
    @Column({
        allowNull: true,
        type: DataType.BIGINT,
    })
    credit?: number;
}
