import { Op } from "sequelize"; // Sequelize의 Op를 사용해야 합니다.
import { Sub_portfolio } from "../models/sub_portfolio";
import { RecencyHistory, RecencyHistoryAttributes } from "../models/recencyhistory";
import { Stock } from "../models/stock";
import { Stock_in_account } from "../models/stock_in_account";
import { RecencyHoldings, RecencyHoldingsAttributes } from "../models/recencyholding";
import sequelize from "sequelize";

class recencyAPI {
  static async getMySubPortfolioInfo(uid: string) {
    try {
      const portfolios = await Sub_portfolio.findAll({
        attributes: ["portfolio_id"],
        where: {
          uid: uid,
          can_sub: true || 1,
        },
      });
      return portfolios;
    } catch (error) {
      console.error("Error fetching portfolios:", error);
      throw error;
    }
  }

  static async getMySubRecencyTradingHistory(uid: string) {
    try {
      const portfolios = await this.getMySubPortfolioInfo(uid);
      const portfolioIds = portfolios.map((p) => p.portfolio_id);
      const recencyHistories: RecencyHistoryAttributes[] = await RecencyHistory.findAll({
        where: {
          portfolio_id: {
            [Op.in]: portfolioIds as number[],
          },
        },
      });

      return recencyHistories;
    } catch (error) {
      console.error("Error fetching trading histories:", error);
      throw error;
    }
  }

  static async getStockInfoByAccountId(account_id: number, name: string) {
    try {
      const stockId = await Stock.findOne({
        where: {
          name: name,
        },
      });
      const stockInAccout = await Stock_in_account.findOne({
        where: {
          stock_id: stockId?.stock_id,
          account_id: account_id,
        },
      });
      const stockInfo = await RecencyHistory.findOne({
        where: {
          account_id: account_id,
          name: name,
        },
      });
      return stockInAccout;
    } catch (error) {
      console.log(error);
    }
  }

  static async getInvestIdstTop5(uid: string) {
    const portfolios = await this.getMySubPortfolioInfo(uid);
    const portfolioIds = portfolios.map((p) => p.portfolio_id);
    const attributes = Object.keys(RecencyHoldings.getAttributes());
    // const recencyHoldings: RecencyHoldingsAttributes[] = await RecencyHoldings.findAll({
    //   attributes: [...attributes, [sequelize.fn("COUNT", sequelize.col("*")), "total_count"]],
    //   where: {
    //     portfolio_id: {
    //       [Op.in]: portfolioIds as number[],
    //     },
    //   },
    //   group: ["std_idst_clsf_cd_name"],
    //   order: [[sequelize.literal("total_count"), "DESC"]],
    //   limit: 5,
    // });
    const recencyHoldingsData = await RecencyHoldings.findAll({
      attributes: [
        ["std_idst_clsf_cd_name", "group"],
        [sequelize.literal(`COUNT(DISTINCT name)`), "value"], // 직접적인 SQL 문을 사용하여 고유 주식 수 계산
      ],
      group: ["std_idst_clsf_cd_name"],
      order: [[sequelize.literal("value"), "DESC"]], // 고유 주식 수를 기준으로 내림차순 정렬
      limit: 5,
    });
    console.log(recencyHoldingsData);
    return recencyHoldingsData;
  }
}

export default recencyAPI;
