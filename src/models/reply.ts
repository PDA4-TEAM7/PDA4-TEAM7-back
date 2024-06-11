import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from 'sequelize-typescript';

export interface replyAttributes {
    reply_id?: number;
    comment_id?: number;
    user_id?: number;
    description?: string;
    create_dt?: Date;
}

@Table({ tableName: 'reply', timestamps: false })
export class Reply extends Model<replyAttributes, replyAttributes> implements replyAttributes {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT })
    @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
    reply_id?: number;

    @Column({ allowNull: true, type: DataType.BIGINT })
    @Index({ name: 'comment_id', using: 'BTREE', order: 'ASC', unique: false })
    comment_id?: number;

    @Column({ allowNull: true, type: DataType.BIGINT })
    @Index({ name: 'user_id', using: 'BTREE', order: 'ASC', unique: false })
    user_id?: number;

    @Column({ allowNull: true, type: DataType.STRING(255) })
    description?: string;

    @Column({ allowNull: true, type: DataType.DATE })
    create_dt?: Date;
}
