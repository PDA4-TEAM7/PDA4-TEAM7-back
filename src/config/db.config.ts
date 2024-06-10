import { Sequelize } from 'sequelize-typescript';
import { type Dialect } from 'sequelize';
import * as dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize({
    database: process.env.DB_DBNAME as string,
    username: process.env.DB_USERNAME as string,
    password: process.env.DB_PASSWORD as string,
    host: process.env.DB_HOST as string,
    // port: process.env.DB_PORT as string,
    dialect: process.env.DB_DIALECT as Dialect,
});

export default sequelize;
