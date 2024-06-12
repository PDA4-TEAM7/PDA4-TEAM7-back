import * as fs from 'fs';
import path from 'path';
import * as dotenv from 'dotenv';
dotenv.config();

console.log(__dirname);

const dbConfig = {
    options: {
        dialect: process.env.DB_DIALECT,
        host: process.env.DB_HOST,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DBNAME,
        port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
    },
};

const jsonPath = path.resolve(__dirname, './config/db.config.json');
fs.writeFileSync(jsonPath, JSON.stringify(dbConfig, null, 2));

console.log(`Database config JSON file generated at ${jsonPath}`);
