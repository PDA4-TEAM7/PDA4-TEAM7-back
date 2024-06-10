import { Model, Column, Table, DataType } from 'sequelize-typescript';

@Table({
    timestamps: true,
    tableName: 'Accounts',
})
export class Account extends Model {
    @Column({
        type: DataType.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    })
    account_id!: number;

    @Column({
        type: DataType.BIGINT,
        autoIncrement: true,
    })
    uid!: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: true,
    })
    app_key!: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: true,
    })
    secret_key!: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    account_number!: string;

    @Column({
        type: DataType.BIGINT,
        allowNull: true,
    })
    pchs_amt_smtl_amt!: number;

    @Column({
        type: DataType.BIGINT,
        allowNull: true,
    })
    evlu_amt_smtl_amt!: number;

    @Column({
        type: DataType.BIGINT,
        allowNull: true,
    })
    evlu_pfls_smtl_amt!: number;
}
