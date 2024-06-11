import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from 'sequelize-typescript';

export interface accountAttributes {
    account_id?: number;
    uid?: number;
    app_key?: string;
    app_secret?: string;
    account_number?: string;
    pchs_amt_sml_amt?: number;
    evlu_amt?: number;
    evlu_pfls_sml_amt?: number;
}

@Table({ tableName: 'account', timestamps: true })
export class account extends Model<accountAttributes, accountAttributes> implements accountAttributes {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT })
    @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
    account_id?: number;
    @Column({ allowNull: true, type: DataType.BIGINT })
    @Index({ name: 'uid', using: 'BTREE', order: 'ASC', unique: false })
    uid?: number;
    @Column({ allowNull: true, type: DataType.STRING(255) })
    app_key?: string;
    @Column({ allowNull: true, type: DataType.STRING(255) })
    app_secret?: string;
    @Column({ allowNull: true, type: DataType.STRING(255) })
    account_number?: string;
    @Column({ allowNull: true, type: DataType.BIGINT })
    pchs_amt_sml_amt?: number;
    @Column({ allowNull: true, type: DataType.BIGINT })
    evlu_amt?: number;
    @Column({ allowNull: true, type: DataType.BIGINT })
    evlu_pfls_sml_amt?: number;
}
