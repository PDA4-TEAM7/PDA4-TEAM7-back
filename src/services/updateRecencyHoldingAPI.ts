import { IStock, StockAccountApi } from "./apis/stockAccountAPI";
import { Portfolio } from "../models/portfolio";
import { Account, accountAttributes } from "../models/account";
import { RecencyHoldings } from "../models/recencyholding";
import { Stock } from "../models/stock";
import { Stock_history } from "../models/stock_history";
import { HantuTokenApi, IAccessRes } from "./apis/hantuTokenAPI";
import { formatYYMMDD } from "../utils/time";
import { HantuBaseApi } from "./apis/hantuBaseAPI";
import { RecencyHistory } from "../models/recencyhistory";

const { HANTU_TR_ID_M_TRADING, HANTU_TR_ID_M } = process.env;
const CANO = ""; //DUMMY: db account
const ACNT_PRDT_CD = "01"; //DUMMY: db account
export class UpdateRecencyHoldingAPI extends HantuBaseApi {
  static async getAllPortfolioAccountInfo() {
    try {
      const portfolios = await Portfolio.findAll({
        attributes: ["portfolio_id", "account_id"],
      });
      return portfolios;
    } catch (error) {
      console.error("Error fetching portfolios:", error);
      throw error;
    }
  }

  static async updateAllHoldings() {
    try {
      const portfolios = await this.getAllPortfolioAccountInfo();

      for (const portfolio of portfolios) {
        let account: accountAttributes | null = await Account.findOne({
          where: { account_id: portfolio.account_id },
        });
        if (!account || !account.app_key || !account.app_secret) {
          console.error(`Account not found for ID: ${portfolio.account_id}`);
          continue; // 계정 정보가 없으면 다음 포트폴리오로 넘어감
        }

        // 토큰 API로부터 토큰 갱신
        const tokenApi = new HantuTokenApi();
        const accessRes: IAccessRes = await tokenApi.getToken(account.app_key, account.app_secret);
        if (!accessRes) throw Error("fail to get access Token. check key value");

        const accessToken = accessRes.access_token;
        const accessTokenValidDate = new Date(accessRes.access_token_token_expired);

        // 토큰 정보 업데이트
        await Account.update(
          {
            access_token: accessToken,
            access_token_valid_dt: accessTokenValidDate,
          },
          {
            where: {
              account_id: account.account_id,
            },
          }
        );

        const stockAccountApi = new StockAccountApi(account.app_key, account.app_secret, accessToken);
        if (account.account_number) {
          const inquirePriceRes = await stockAccountApi.inquireBalance(account.account_number);
          const stocks: IStock[] = inquirePriceRes.output1;

          for (const stock of stocks) {
            const stockDetails = await Stock.findOne({
              where: { code: stock.pdno },
            });
            if (!stockDetails) {
              console.error(`Stock not found for code: ${stock.pdno}`);
              continue;
            }

            const stockHistory = await Stock_history.findOne({
              where: { stock_id: stockDetails.stock_id },
            });

            if (!stockHistory || !stockHistory.closing_price) {
              console.error(`Stock history not found for ID: ${stockDetails.stock_id}`);
              continue;
            }
            await RecencyHoldings.create({
              portfolio_id: portfolio.portfolio_id as number,
              account_id: account.account_id,
              uid: account.uid,
              name: stockDetails.name,
              hldg_qty: stock.hldg_qty,
              pchs_amt: stock.pchs_amt,
              evlu_amt: stock.evlu_amt,
              evlu_pfls_amt: stock.evlu_pfls_amt,
              evlu_pfls_rt: stock.evlu_pfls_rt,
              std_idst_clsf_cd_name: stockDetails.std_idst_clsf_cd_name,
              closing_price: stockHistory.closing_price,
            });
          }
        }
      }
    } catch (error) {
      console.error("Error updating holdings:", error);
    }
  }

  static async updateAllHistory() {
    try {
      const portfolios = await this.getAllPortfolioAccountInfo();

      for (const portfolio of portfolios) {
        let account: accountAttributes | null = await Account.findOne({
          where: { account_id: portfolio.account_id },
        });
        if (!account || !account.app_key || !account.app_secret) {
          console.error(`Account not found for ID: ${portfolio.account_id}`);
          continue; // 계정 정보가 없으면 다음 포트폴리오로 넘어감
        }

        // 토큰 API로부터 토큰 갱신
        const tokenApi = new HantuTokenApi();
        const accessRes: IAccessRes = await tokenApi.getToken(account.app_key, account.app_secret);
        if (!accessRes) throw Error("fail to get access Token. check key value");

        const accessToken = accessRes.access_token;
        const accessTokenValidDate = new Date(accessRes.access_token_token_expired);

        // 토큰 정보 업데이트
        await Account.update(
          {
            access_token: accessToken,
            access_token_valid_dt: accessTokenValidDate,
          },
          {
            where: {
              account_id: account.account_id,
            },
          }
        );

        // account로 stockAccountApi 생성
        const stockAccountApi = new StockAccountApi(account.app_key, account.app_secret, accessToken);

        // 오늘 날짜로 거래내역 가져오기
        if (account.account_number) {
          const response = await stockAccountApi.inquireSingleDayCCLD(account.account_number);
          const tradingDatas = await response.flatMap((resp) => resp.output1);
          for (const tradingData of tradingDatas) {
            await RecencyHistory.create({
              portfolio_id: portfolio.portfolio_id as number,
              account_id: account.account_id as number,
              uid: account.uid,
              name: tradingData.prdt_name,
              sll_buy_dvsn_cd: tradingData.sll_buy_dvsn_cd,
              tot_ccld_qty: tradingData.tot_ccld_qty,
              tot_ccld_amt: tradingData.tot_ccld_amt,
              avg_prvs: tradingData.avg_prvs,
              trade_dt: new Date(),
            });
          }
        }
      }
    } catch (error) {
      console.error("Error updating history:", error);
    }
  }
}
