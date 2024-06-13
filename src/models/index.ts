import { Sequelize } from 'sequelize-typescript';
import sequelize from '../config/db.config';

import { User } from './user';
import { Account } from './account';
import { Calendar } from './calendar';
import { Comment } from './comment';
import { Market } from './market';
import { Portfolio } from './portfolio';
import { Reply } from './reply';
import { Stock_in_account } from './stock_in_account';
import { Stock } from './stock';
import { Sub_portfolio } from './sub_portfolio';
import { Trading_history } from './trading_history';
import { Stock_history } from './stock_history';

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
sequelize.addModels([
    User,
    Account,
    Calendar,
    Comment,
    Market,
    Stock,
    Stock_in_account,
    Portfolio,
    Reply,
    Sub_portfolio,
    Trading_history,
    Stock_history,
]);

export const initializeDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.sync({ force: false }); // 데이터베이스와 모델 동기화
        console.log('Database synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        throw error; // 에러를 던져서 서버 시작을 중단시킬 수 있음
    }
};
