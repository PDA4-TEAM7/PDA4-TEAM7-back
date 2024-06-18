import fs from "fs/promises"; // Using fs/promises for async file system operations
import path from "path";
import XLSX from "xlsx";
import { Stock } from "../models/stock";
import { db } from "../models/index";
import { Stock_history } from "../models/stock_history";
import { getKSTNow } from "./time";
// xlsx 파일 경로
const KOSDAQFilePath = path.resolve(__dirname, "../../data/data_0204_20240617.xlsx");

// Excel 파일을 읽고 데이터베이스에 삽입하는 함수
const insertExcelDataToDb = async () => {
  try {
    // Sequelize 모델 동기화
    await fs.access(KOSDAQFilePath);
    console.log(`File found: ${KOSDAQFilePath}`);

    // Read the Excel file
    const workbook = XLSX.readFile(KOSDAQFilePath);
    // await db.sequelize?.sync();
    // Excel 파일 읽기
    const sheetName = workbook.SheetNames[0];
    const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    for (const row of worksheet) {
      // Excel 파일의 각 행에 대한 처리
      // "종목코드", "종목명", "시장구분","업종명", "종가"
      const { 종목코드, 종목명, 시장구분, 업종명, 종가 }: any = row; // Excel 파일의 열 이름에 맞게 수정
      // 데이터베이스에 삽입
      try {
        // const st = await Stock.create({
        //   code: 종목코드,
        //   name: 종목명,
        //   market_id: 1,
        //   listing: true,
        //   std_idst_clsf_cd_name: 업종명,
        // });
        const st = await Stock.findOne({
          where: { code: 종목코드 },
        });
        if (!st) continue;
        //종가 넣기
        await Stock_history.create({
          stock_id: st.stock_id,
          market_id: st.market_id,
          now_price: 종가,
          closing_price: 종가,
          update_dt: new Date(),
        });
        console.log(`Inserted data: ${종목코드} ${종목명} ${시장구분} ${업종명} ${종가}`);
      } catch (err) {
        console.error("Error inserting data:", err);
      }
    }

    console.log("Excel file successfully processed");
  } catch (err) {
    console.error("Error syncing database:", err);
  } finally {
    // db.sequelize?.close();
  }
};

// 함수 호출
//  insertExcelDataToDb();
export { insertExcelDataToDb };
