import { HantuBaseApi } from "./hantuBaseAPI";

const CANO = ""; //DUMMY: db account
const ACNT_PRDT_CD = "01"; //DUMMY: db account

export interface IStock {
  pdno: string;
  prdt_name: string;
  trad_dvsn_name: string;
  bfdy_buy_qty: number;
  bfdy_sll_qty: number;
  thdt_buyqty: number;
  thdt_sll_qty: number;
  hldg_qty: number;
  ord_psbl_qty: number;
  pchs_avg_pric: string;
  pchs_amt: number;
  prpr: number;
  evlu_amt: number;
  evlu_pfls_amt: number;
  evlu_pfls_rt: string;
  evlu_erng_rt: string;
  loan_dt: string;
  loan_amt: number;
  stln_slng_chgs: number;
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
    dnca_tot_amt: number;
    nxdy_excc_amt: number;
    prvs_rcdl_excc_amt: number;
    cma_evlu_amt: number;
    bfdy_buy_amt: number;
    thdt_buy_amt: number;
    nxdy_auto_rdpt_amt: number;
    bfdy_sll_amt: number;
    thdt_sll_amt: number;
    d2_auto_rdpt_amt: number;
    bfdy_tlex_amt: number;
    thdt_tlex_amt: number;
    tot_loan_amt: number;
    scts_evlu_amt: number;
    tot_evlu_amt: number;
    nass_amt: number;
    fncg_gld_auto_rdpt_yn: string;
    pchs_amt_smtl_amt: number;
    evlu_amt_smtl_amt: number;
    evlu_pfls_smtl_amt: number;
    tot_stln_slng_chgs: number;
    bfdy_tot_asst_evlu_amt: number;
    asst_icdc_amt: number;
    asst_icdc_erng_rt: string;
  }[];
}
export class StockAccountApi extends HantuBaseApi {
  async inquireBalance(cano: string) {
    const resp = await this.fetcher.get(
      `/uapi/domestic-stock/v1/trading/inquire-balance?CANO=${cano}&ACNT_PRDT_CD=${ACNT_PRDT_CD}&AFHR_FLPR_YN=N&OFL_YN=N&INQR_DVSN=01&UNPR_DVSN=01&FUND_STTL_ICLD_YN=N&FNCG_AMT_AUTO_RDPT_YN=N&PRCS_DVSN=01&CTX_AREA_FK100=&CTX_AREA_NK100=`
    );

    return resp.data;
  }
}
