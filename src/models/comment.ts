import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey, BelongsTo, HasMany, Default } from 'sequelize-typescript';
import { Portfolio } from './portfolio';
import { User } from './user';
import { Reply } from './reply';

export interface commentAttributes {
    comment_id?: number;
    portfolio_id?: number;
    user_id?: number;
    description?: string;
    create_dt?: Date;
    update_dt?:Date;
    is_update?:Boolean;
    
}

@Table({ tableName: 'comment', timestamps: false })
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

    @Column({allowNull: true, type: DataType.DATE})
    update_dt?: Date;

    @Default(false)
    @Column({allowNull: true, type: DataType.BOOLEAN})
    is_update?: Boolean;

    @BelongsTo(() => Portfolio)
    portfolio!: Portfolio;

    @BelongsTo(() => User)
    user!: User;

    @HasMany(() => Reply)
    reply!: Reply;
}
