import { Account } from "../models/account";
import { StockAccountApi } from "./apis/stockAccountAPI";
import { Stock_in_account } from "../models/stock_in_account";
import { Stock } from "../models/stock";
import { Trading_history } from "../models/trading_history";
import { setDateByOrd } from "../utils/time";

export const updateStockInAccount = async (account: Account) => {
  if (!account.account_number) {
    console.error(`Account number is missing for account ID: ${account.account_id}`);
    return;
  }

  try {
    const stockAccountApi = new StockAccountApi(account.app_key, account.app_secret, account.access_token);
    const inquirePriceRes = await stockAccountApi.inquireBalance(account.account_number);
    const stocks = inquirePriceRes.output1;

    for (const data of stocks) {
      const stock = await Stock.findOne({ where: { code: data.pdno } });
      if (stock) {
        await Stock_in_account.upsert({
          account_id: account.account_id,
          stock_id: stock.stock_id,
          market_id: 1,
          hldg_qty: data.hldg_qty,
          pchs_amt: data.pchs_amt,
          evlu_amt: data.evlu_amt,
          evlu_pfls_amt: data.evlu_pfls_amt,
        });
      }
    }

    const accountAsset = inquirePriceRes.output2[0];
    account.pchs_amt_smtl_amt = accountAsset.pchs_amt_smtl_amt;
    account.evlu_amt_smtl_amt = accountAsset.evlu_amt_smtl_amt;
    account.evlu_pfls_smtl_amt = accountAsset.evlu_pfls_smtl_amt;
    await account.save();
  } catch (error) {
    console.error(`Failed to update stock in account for account ${account.account_number}`, error);
  }
};

export const updateTradingHistory = async (account: Account) => {
  if (!account.account_number) {
    console.error(`Account number is missing for account ID: ${account.account_id}`);
    return;
  }

  try {
    const stockAccountApi = new StockAccountApi(account.app_key, account.app_secret, account.access_token);
    const tradingHistoryRes = await stockAccountApi.inquireDailyCCLD(account.account_number);

    for (const data of tradingHistoryRes) {
      const stock = await Stock.findOne({ where: { code: data.pdno } });
      if (stock) {
        await Trading_history.create({
          account_id: account.account_id,
          stock_id: stock.stock_id,
          sll_buy_dvsn_cd: data.sll_buy_dvsn_cd,
          trade_dt: setDateByOrd(data.ord_dt, data.ord_tmd),
          tot_ccld_qty: data.tot_ccld_qty,
          tot_ccld_amt: data.tot_ccld_amt,
          evlu_pfls_amt: data.evlu_pfls_amt || null,
          evlu_pfls_rt: data.evlu_pfls_rt || null,
        });
      }
    }
  } catch (error) {
    console.error(`Failed to update trading history for account ${account.account_number}`, error);
  }
};
