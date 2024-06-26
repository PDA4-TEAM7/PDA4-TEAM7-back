import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { Account } from "./models/account";
import config from "./config/index.config";
import { initializeDatabase } from "./models/index";
import { StockAccountApi } from "./services/apis/stockAccountAPI";
import router from "./routes/index";
import cookieParser from "cookie-parser";
import decodeTokenMiddleware from "./middleware/decodeTokenMiddleware";
import { fetchKospiData, fetchKosdaqData } from "./scheduler/updateStockData";
import { UpdateRecencyHoldingAPI } from "./services/updateRecencyHoldingAPI";
import cron from "node-cron";
import { Trading_history } from "./models/trading_history";

import { getAllAccounts } from "./controllers/account";
import { updateStockInAccount, updateTradingHistory } from "./services/newUpdateAPI";

import * as dotenv from "dotenv";
dotenv.config();
const app = express();
// 기본 미들웨어
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Add this line to use cookie-parser

// CORS설정

app.use(cors({ origin: process.env.CORS_ORIGIN_URL, credentials: true }));
// stock, stock_history 채우는 파일
// insertExcelDataToDb();

app.use(decodeTokenMiddleware); // 전역 미들웨어 설정
// 루트 라우트
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the API");
});

app.use("/api", router());

//DUMMY : 한투 테스트용 api 나중에 지울예정
app.get("/me", async (req: Request, res: Response) => {
  try {
    const hantuService = new StockAccountApi();
    const data = await hantuService.inquireBalance("");
    console.log(data);
    res.send(data);
  } catch (err) {
    console.log(err);
    res.send(`fail : ${err}`);
  }
});

// 에러 핸들링 미들웨어
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// 모든 계좌에 대해 크론잡 실행 함수
const executeForAllAccounts = async (job: (account: Account) => Promise<void>) => {
  const accounts = await getAllAccounts();
  for (const account of accounts) {
    await job(account); // 각 계좌에 대해 작업 수행
  }
};

// 서버 시작 함수
const startServer = async () => {
  app.listen(config.port, async () => {
    try {
      await initializeDatabase(); // 모델 초기화와 동기화

      // 크론잡 설정: 매일 오후 3시 30분에 fetchKospiData 실행 (한국 표준시 기준)
      cron.schedule(
        "30 15 * * 1-5",
        async () => {
          console.log("Running fetchKospiData at 3:30 PM KST");
          await fetchKospiData();
        },
        {
          scheduled: true,
          timezone: "Asia/Seoul",
        }
      );

      // 크론잡 설정: 매일 오후 3시 35분에 fetchKosdaqData 실행 (한국 표준시 기준)
      cron.schedule(
        "35 15 * * 1-5",
        async () => {
          console.log("Running fetchKosdaqData at 3:35 PM KST");
          await fetchKosdaqData();
        },
        {
          scheduled: true,
          timezone: "Asia/Seoul",
        }
      );

      cron.schedule(
        //updateRecency Info
        "40 15 * * 1-5",
        async () => {
          console.log("Running updateRecencyData at 3:40 PM KST");
          await UpdateRecencyHoldingAPI.updateAllHoldings();
        },
        {
          scheduled: true,
          timezone: "Asia/Seoul",
        }
      );
      cron.schedule(
        //updateRecency Info
        "45 15 * * 1-5",
        async () => {
          console.log("Running updateRecencyData at 3:45 PM KST");
          await UpdateRecencyHoldingAPI.updateAllHistory();
        },
        {
          scheduled: true,
          timezone: "Asia/Seoul",
        }
      );

      //매일 오후 3시 50분에 updateStockInAccount
      cron.schedule(
        "50 15 * * 1-5",
        async () => {
          console.log("Running updateStockInAccount at 3:50 PM KST");
          await executeForAllAccounts(updateStockInAccount);
        },
        {
          scheduled: true,
          timezone: "Asia/Seoul",
        }
      );

      //매일 오후 3시 55분에 updateTradingHistory
      cron.schedule(
        "55 15 * * 1-5",
        async () => {
          console.log("Running updateTradingHistory at 3:55 PM KST");
          await Trading_history.destroy({
            where: {},
            truncate: true,
          });
          await executeForAllAccounts(updateTradingHistory);
        },
        {
          scheduled: true,
          timezone: "Asia/Seoul",
        }
      );
    } catch (error) {
      console.error("Server startup failed:", error);
      return; // 데이터베이스 초기화 실패시 서버를 시작하지 않음
    }
    console.log(`Server running on http://localhost:${config.port}`);
  });
};

export { startServer };
