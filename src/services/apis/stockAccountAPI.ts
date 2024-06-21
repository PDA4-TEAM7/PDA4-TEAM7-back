import { HantuBaseApi } from "./hantuBaseAPI";

const CANO = ""; //DUMMY: db account
const ACNT_PRDT_CD = "01"; //DUMMY: db account

export interface IStock {
  pdno: string;
  prdt_name: string;
  trad_dvsn_name: string;
  bfdy_buy_qty: string;
  bfdy_sll_qty: string;
  thdt_buyqty: string;
  thdt_sll_qty: string;
  hldg_qty: string;
  ord_psbl_qty: string;
  pchs_avg_pric: string;
  pchs_amt: string;
  prpr: string;
  evlu_amt: string;
  evlu_pfls_amt: string;
  evlu_pfls_rt: string;
  evlu_erng_rt: string;
  loan_dt: string;
  loan_amt: string;
  stln_slng_chgs: string;
  expd_dt: string;
  fltt_rt: string;
  bfdy_cprs_icdc: string;
  item_mgna_rt_name: string;
  grta_rt_name: string;
  sbst_pric: string;
  stck_loan_unpr: string;
}
export interface IAccountInquireBalance {
  output1: IStock[];
  output2: {
    dnca_tot_amt: string;
    nxdy_excc_amt: string;
    prvs_rcdl_excc_amt: string;
    cma_evlu_amt: string;
    bfdy_buy_amt: string;
    thdt_buy_amt: string;
    nxdy_auto_rdpt_amt: string;
    bfdy_sll_amt: string;
    thdt_sll_amt: string;
    d2_auto_rdpt_amt: string;
    bfdy_tlex_amt: string;
    thdt_tlex_amt: string;
    tot_loan_amt: string;
    scts_evlu_amt: string;
    tot_evlu_amt: string;
    nass_amt: string;
    fncg_gld_auto_rdpt_yn: string;
    pchs_amt_smtl_amt: string;
    evlu_amt_smtl_amt: string;
    evlu_pfls_smtl_amt: string;
    tot_stln_slng_chgs: string;
    bfdy_tot_asst_evlu_amt: string;
    asst_icdc_amt: string;
    asst_icdc_erng_rt: string;
  };
}
export class StockAccountApi extends HantuBaseApi {
  async inquireBalance(cano: string) {
    const resp = await this.fetcher.get(
      `/uapi/domestic-stock/v1/trading/inquire-balance?CANO=${cano}&ACNT_PRDT_CD=${ACNT_PRDT_CD}&AFHR_FLPR_YN=N&OFL_YN=N&INQR_DVSN=01&UNPR_DVSN=01&FUND_STTL_ICLD_YN=N&FNCG_AMT_AUTO_RDPT_YN=N&PRCS_DVSN=01&CTX_AREA_FK100=&CTX_AREA_NK100=`
    );

    return resp.data;
  }
}
