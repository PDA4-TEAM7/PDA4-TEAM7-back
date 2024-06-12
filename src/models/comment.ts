import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Portfolio } from './portfolio';
import { User } from './user';
import { Reply } from './reply';

export interface commentAttributes {
    comment_id?: number;
    portfolio_id?: number;
    //
    user_id?: number;
    description?: string;
    create_dt?: Date;
}

@Table({ tableName: 'comment', timestamps: true })
export class Comment extends Model<commentAttributes, commentAttributes> implements commentAttributes {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT })
    @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
    comment_id?: number;

    @ForeignKey(() => Portfolio)
    @Column({ allowNull: true, type: DataType.BIGINT })
    @Index({ name: 'portfolio_id', using: 'BTREE', order: 'ASC', unique: false })
    portfolio_id?: number;

    @ForeignKey(() => User)
    @Column({ allowNull: true, type: DataType.BIGINT })
    @Index({ name: 'user_id', using: 'BTREE', order: 'ASC', unique: false })
    user_id?: number;

    @Column({ allowNull: true, type: DataType.STRING(255) })
    description?: string;

    @Column({ allowNull: true, type: DataType.DATE })
    create_dt?: Date;

    @BelongsTo(() => Portfolio)
    portfolio!: Portfolio;

    @BelongsTo(() => User)
    user!: User;

    @HasMany(() => Reply)
    reply!: Reply;
}
