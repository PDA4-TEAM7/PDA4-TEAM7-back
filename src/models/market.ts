import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from 'sequelize-typescript';

export interface marketAttributes {
    market_id?: number;
    name?: string;
    country?: string;
}

@Table({ tableName: 'market', timestamps: true })
export class market extends Model<marketAttributes, marketAttributes> implements marketAttributes {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT })
    @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
    market_id?: number;
    @Column({ allowNull: true, type: DataType.STRING(255) })
    name?: string;
    @Column({ allowNull: true, type: DataType.STRING(255) })
    country?: string;
}
