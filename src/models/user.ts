import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey, AllowNull, HasMany } from "sequelize-typescript";
import { Account } from "./account";
import { Sub_portfolio } from "./sub_portfolio";
import { Comment } from "./comment";
import bcrypt from "bcrypt";

export interface userAttributes {
  uid?: number;
  user_id?: string;
  username?: string;
  auth_token?: string;
  password?: string;
  credit?: number;
  join_dt?: Date;
  introduce?: string;
}

async function hashPassword(user: User) {
  if (user.password) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
}

@Table({
  tableName: "user",
  timestamps: false,
  hooks: {
    beforeCreate: async (user: User) => {
      await hashPassword(user);
      user.join_dt = new Date();
      user.introduce = `안녕하세요 ${user.username}입니다.`;
    },
    beforeUpdate: async (user: User, options) => {
      if (user.changed("password")) {
        await hashPassword(user);
      }
    },
  },
})
export class User extends Model<userAttributes, userAttributes> implements userAttributes {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
  })
  @Index({
    name: "PRIMARY",
    using: "BTREE",
    order: "ASC",
    unique: true,
  })
  uid?: number;

  @Column({
    allowNull: false,
    unique: true,
    type: DataType.STRING(255),
  })
  user_id?: string;

  @Column({
    allowNull: false,
    unique: true,
    type: DataType.STRING(255),
  })
  username?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(255),
  })
  auth_token?: string;

  @Column({
    allowNull: false,
    type: DataType.STRING(255),
  })
  password?: string;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
    defaultValue: 0,
  })
  credit?: number;

  @Column({
    allowNull: false,
    type: DataType.DATE,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
  })
  join_dt?: Date;

  @Column({
    allowNull: true,
    type: DataType.STRING(255),
  })
  introduce?: string;

  @HasMany(() => Account)
  accounts!: Account[];

  @HasMany(() => Sub_portfolio)
  sub_portfolio!: Sub_portfolio;

  @HasMany(() => Comment)
  comment!: Comment;
}
