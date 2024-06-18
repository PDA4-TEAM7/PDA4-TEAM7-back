import { Sequelize } from "sequelize-typescript";
import { type Dialect } from "sequelize";
import * as dotenv from "dotenv";
dotenv.config();
const port = parseInt(process.env.DB_PORT || "3306");
console.log("Database Port:", process.env.DB_PORT);
const sequelize = new Sequelize({
  database: process.env.DB_DBNAME as string,
  username: process.env.DB_USERNAME as string,
  password: process.env.DB_PASSWORD as string,
  host: process.env.DB_HOST as string,
  port: port,
  dialect: process.env.DB_DIALECT as Dialect,
  timezone: "+09:00", // 한국 표준시 (KST) 설정
  dialectOptions: {
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
  },
});

export default sequelize;
