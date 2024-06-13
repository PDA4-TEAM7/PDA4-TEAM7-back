import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from 'sequelize-typescript';

export interface calendarAttributes {
    calendar_id?: number;
    timeFrame?: string;
    dataFrame?: string;
    calendarData?: string;
    newsData?: string;
    majorData?: string;
    indexDay?: string;
    kospi?: string;
    kospi200?: string;
    us500?: string;
    usTech?: string;
    dax?: string;
    dollarIndex?: string;
}

@Table({ tableName: 'calendar', timestamps: false })
export class Calendar extends Model<calendarAttributes, calendarAttributes> implements calendarAttributes {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT })
    @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
    calendar_id?: number;

    @Column({ allowNull: true, type: DataType.STRING(255) })
    timeFrame?: string;

    @Column({ allowNull: true, type: DataType.STRING(255) })
    dataFrame?: string;

    @Column({ allowNull: true, type: DataType.STRING(255) })
    calendarData?: string;

    @Column({ allowNull: true, type: DataType.STRING(255) })
    newsData?: string;

    @Column({ allowNull: true, type: DataType.STRING(255) })
    majorData?: string;

    @Column({ allowNull: true, type: DataType.STRING(255) })
    indexDay?: string;

    @Column({ allowNull: true, type: DataType.STRING(255) })
    kospi?: string;

    @Column({ allowNull: true, type: DataType.STRING(255) })
    kospi200?: string;

    @Column({ allowNull: true, type: DataType.STRING(255) })
    us500?: string;

    @Column({ allowNull: true, type: DataType.STRING(255) })
    usTech?: string;

    @Column({ allowNull: true, type: DataType.STRING(255) })
    dax?: string;

    @Column({ allowNull: true, type: DataType.STRING(255) })
    dollarIndex?: string;
}
