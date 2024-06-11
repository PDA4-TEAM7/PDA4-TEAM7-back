// models/users.ts

import { Model, Column, Table, DataType } from 'sequelize-typescript';

@Table({
    timestamps: true,
    tableName: 'Users',
})
export class User extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id!: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    username!: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    password!: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: true,
    })
    email?: string;
}
