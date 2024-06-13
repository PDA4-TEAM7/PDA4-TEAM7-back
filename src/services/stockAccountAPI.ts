import { HantuBaseApi } from "./hantuBaseAPI";

const CANO = ""; //DUMMY: db account
const ACNT_PRDT_CD = "01"; //DUMMY: db account

export class stockAccountApi extends HantuBaseApi {
  async inquireBalance() {
    const resp = await this.fetcher.get(
      `/uapi/domestic-stock/v1/trading/inquire-balance?CANO=${CANO}&ACNT_PRDT_CD=${ACNT_PRDT_CD}&AFHR_FLPR_YN=N&OFL_YN=N&INQR_DVSN=01&UNPR_DVSN=01&FUND_STTL_ICLD_YN=N&FNCG_AMT_AUTO_RDPT_YN=N&PRCS_DVSN=01&CTX_AREA_FK100=&CTX_AREA_NK100=`
    );

    return resp.data;
  }
}
