import axios from "axios";
import qs from "qs";
import { Stock_history } from "../models/stock_history";
import { Stock } from "../models/stock";
import * as dotenv from "dotenv";

dotenv.config();

function getTodayDate(): string {
  const date = new Date();
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}${month}${day}`;
}

async function fetchDataAndUpdateDatabase(marketId: string): Promise<void> {
  const payload = {
    bld: "dbms/MDC/STAT/standard/MDCSTAT03901",
    locale: "ko_KR",
    mktId: marketId,
    trdDd: getTodayDate(),
    money: "1",
    csvxls_isNo: "false",
  };

  const config = {
    headers: {
      Accept: "application/json, text/javascript, */*; q=0.01",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
    },
  };

  try {
    const response = await axios.post(
      "http://data.krx.co.kr/comm/bldAttendant/getJsonData.cmd",
      qs.stringify(payload),
      config
    );
    const items = response.data.block1;

    for (const item of items) {
      const closingPrice = parseInt(item.TDD_CLSPRC.replace(/,/g, ""), 10);

      const stock = await Stock.findOne({
        where: { code: item.ISU_SRT_CD },
      });

      if (stock) {
        const stockHistory = await Stock_history.findOne({
          where: { stock_id: stock.stock_id },
        });

        if (stockHistory) {
          stockHistory.now_price = closingPrice;
          stockHistory.closing_price = closingPrice;
          stockHistory.update_dt = new Date();
          await stockHistory.save();
        } else {
          console.log(
            `No record found in stock_history for stock ID: ${stock.stock_id}`
          );
        }
      } else {
        console.log(
          `No record found in stock for ISU_SRT_CD: ${item.ISU_SRT_CD}`
        );
      }
    }
  } catch (error) {
    console.error("Error during the API call or database update:", error);
  }
}

export async function fetchKospiData(): Promise<void> {
  await fetchDataAndUpdateDatabase("STK");
}

export async function fetchKosdaqData(): Promise<void> {
  await fetchDataAndUpdateDatabase("KSQ");
}
