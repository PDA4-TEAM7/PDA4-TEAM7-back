import { Op } from "sequelize"; // Sequelize의 Op를 사용해야 합니다.
import { Sub_portfolio } from "../models/sub_portfolio";
import { RecencyHistory, RecencyHistoryAttributes } from "../models/recencyhistory";

class recencyAPI {
  static async getMySubPortfolioInfo(uid: string) {
    try {
      const portfolios = await Sub_portfolio.findAll({
        attributes: ["portfolio_id"],
        where: {
          uid: uid,
          can_sub: 1,
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
      const portfolioIds = portfolios.map((p) => p.portfolio_id); // portfolio_id만 추출합니다.
      console.log("portfolioIdsportfolioIdsportfolioIdsportfolioIds" + portfolioIds);
      // portfolioIds를 사용하여 해당하는 모든 RecencyHistory를 조회합니다.
      const recencyHistories: RecencyHistoryAttributes[] = await RecencyHistory.findAll({
        where: {
          portfolio_id: {
            [Op.in]: portfolioIds as number[], // Op.in을 사용해 배열 안의 id들로 검색합니다.
          },
        },
      });

      return recencyHistories; // 검색된 히스토리를 반환합니다.
    } catch (error) {
      console.error("Error fetching trading histories:", error);
      throw error;
    }
  }
}

export default recencyAPI;
