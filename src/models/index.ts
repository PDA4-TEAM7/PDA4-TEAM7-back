// models/index.ts

import { Sequelize } from 'sequelize-typescript';
import sequelize from '../config/db.config';
import { User } from './users';
import { Account } from './accounts';

export interface DB {
    sequelize: Sequelize;
    Sequelize: typeof Sequelize;
}

export const db: Partial<DB> = {
    sequelize,
    Sequelize,
};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// 모든 모델을 여기서 등록
sequelize.addModels([User,Account]);

User.hasMany(Account, {
    foreignKey: 'uid',
    sourceKey: 'uid',
  });
  
Account.belongsTo(User, {
    foreignKey: 'uid',
    targetKey: 'uid',
  });

export const initializeDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.sync(); // 데이터베이스와 모델 동기화
        console.log('Database synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        throw error; // 에러를 던져서 서버 시작을 중단시킬 수 있음
    }
};
