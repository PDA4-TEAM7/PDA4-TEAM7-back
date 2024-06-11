import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from 'sequelize-typescript';

export interface commentAttributes {
    comment_id?: number;
    portfolio_id?: number;
    user_id?: number;
    description?: string;
    create_dt?: string;
}

@Table({ tableName: 'comment', timestamps: true })
export class comment extends Model<commentAttributes, commentAttributes> implements commentAttributes {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT })
    @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
    comment_id?: number;
    @Column({ allowNull: true, type: DataType.BIGINT })
    @Index({ name: 'portfolio_id', using: 'BTREE', order: 'ASC', unique: false })
    portfolio_id?: number;
    @Column({ allowNull: true, type: DataType.BIGINT })
    @Index({ name: 'user_id', using: 'BTREE', order: 'ASC', unique: false })
    user_id?: number;
    @Column({ allowNull: true, type: DataType.STRING(255) })
    description?: string;
    @Column({ allowNull: true, type: DataType.DATEONLY })
    create_dt?: string;
}
