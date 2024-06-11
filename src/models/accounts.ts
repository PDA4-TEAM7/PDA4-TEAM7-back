import { Model, Column, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './users';

@Table({
    timestamps: true,
    tableName: 'account',
})
export class Account extends Model {
    @Column({
        type: DataType.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    })
    account_id!: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.BIGINT,
        allowNull: false,
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
    app_secret!: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    account_number!: string;

    //매입금액합계금액 - 총구매한 금액
    @Column({
        type: DataType.BIGINT,
        allowNull: true,
    })
    pchs_amt_smtl_amt!: number;


    //평가금액합계금액
    @Column({
        type: DataType.BIGINT,
        allowNull: true,
    })
    evlu_amt_smtl_amt!: number;

    //평가손익합계금액
    @Column({
        type: DataType.BIGINT,
        allowNull: true,
    })
    evlu_pfls_smtl_amt!: number;

    @BelongsTo(() => User)
    user!: User;
}
