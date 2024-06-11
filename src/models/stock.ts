import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

export interface stockAttributes {
    stock_id?: number;
    market_id?: number;
    name?: string;
    listing_dt?: string;
    delisting_dt?: string;
    listing?: number;
    rprpr?: number;
}

@Table({ tableName: "stock", timestamps: false })
export class stock extends Model<stockAttributes, stockAttributes> implements stockAttributes {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT })
    @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
    stock_id?: number;
    @Column({ allowNull: true, type: DataType.BIGINT })
    @Index({ name: "market_id", using: "BTREE", order: "ASC", unique: false })
    market_id?: number;
    @Column({ allowNull: true, type: DataType.STRING(255) })
    name?: string;
    @Column({ allowNull: true, type: DataType.DATEONLY })
    listing_dt?: string;
    @Column({ allowNull: true, type: DataType.DATEONLY })
    delisting_dt?: string;
    @Column({ allowNull: true, type: DataType.TINYINT })
    listing?: number;
    @Column({ allowNull: true, type: DataType.BIGINT })
    rprpr?: number;
}