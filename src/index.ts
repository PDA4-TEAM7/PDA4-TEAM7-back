import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import config from "./config/index.config";
import { initializeDatabase } from "./models/index";
import { stockAccountApi } from "./services/stockAccountAPI";

const app = express();

// 기본 미들웨어
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// 루트 라우트
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the API");
});
app.get("/me", async (req: Request, res: Response) => {
  try {
    const hantuService = new stockAccountApi();
    const data = await hantuService.inquireBalance();
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
