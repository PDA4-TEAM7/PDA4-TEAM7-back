import { Router, Request, Response } from "express";
const { spawn } = require("child_process");
const path = require("path");

export default (router: Router) => {
  router.post("/backtest", (req: Request, res: Response) => {
    const data = JSON.stringify(req.body);
    console.log(`Sending data to Python script: ${data}`); // 로그 추가

    const scriptPath = path.join(__dirname, "../services/apis/stock_backtest.py");
    const pythonProcess = spawn("python3", [scriptPath]);

    let resultString = "";

    pythonProcess.stdout.on("data", (data: Buffer) => {
      resultString += data.toString();
    });

    pythonProcess.stderr.on("data", (data: Buffer) => {
      console.error(`stderr: ${data}`);
    });

    pythonProcess.on("close", (code: number) => {
      if (code !== 0) {
        console.error(`Python script exited with code ${code}`);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        try {
          const result = JSON.parse(resultString);
          res.json(result);
        } catch (error) {
          console.error("Failed to parse Python response:", error);
          res.status(500).json({ error: "Failed to parse Python response" });
        }
      }
    });

    pythonProcess.stdin.write(data);
    pythonProcess.stdin.end();
  });
};
