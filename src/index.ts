import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import config from "./config/index.config";
import { initializeDatabase } from "./models/index";

import { StockAccountApi } from "./services/apis/stockAccountAPI";
import router from "./routes/index";
import { insertExcelDataToDb } from "./utils/addStockdb";
import cookieParser from "cookie-parser";
import decodeTokenMiddleware from "./middleware/decodeTokenMiddleware";
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

// 서버 시작 함수
const startServer = async () => {
  app.listen(config.port, async () => {
    try {
      await initializeDatabase(); // 모델 초기화와 동기화
    } catch (error) {
      console.error("Server startup failed:", error);
      return; // 데이터베이스 초기화 실패시 서버를 시작하지 않음
    }
    console.log(`Server running on http://localhost:${config.port}`);
  });
};

export { startServer };
