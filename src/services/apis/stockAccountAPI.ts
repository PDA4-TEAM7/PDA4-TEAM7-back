import { HantuBaseApi } from "./hantuBaseAPI";
const { HANTU_TR_ID_M_TRADING, HANTU_TR_ID_M } = process.env;
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
      `/uapi/domestic-stock/v1/trading/inquire-balance?CANO=${cano}&ACNT_PRDT_CD=${ACNT_PRDT_CD}&AFHR_FLPR_YN=N&OFL_YN=N&INQR_DVSN=01&UNPR_DVSN=01&FUND_STTL_ICLD_YN=N&FNCG_AMT_AUTO_RDPT_YN=N&PRCS_DVSN=01&CTX_AREA_FK100=&CTX_AREA_NK100=`,
      { headers: { tr_id: HANTU_TR_ID_M } }
    );
    console.log("trading : ", resp);
    return resp.data;
  }

  // cano : 계좌번호
  async inquireDailyCCLD(cano: string) {
    let CTX_AREA_FK100 = ""; //최초시 공란, 그 이후 데이터는 이전 조회 Ouput의 CTX_AREA_FK100 값
    let CTX_AREA_NK100 = ""; //최초시 공란, 그 이후 데이터는 이전 조회 Ouput의 CTX_AREA_NK100 값
    const INQR_STRT_DT = "20240601"; // 조회 시작날짜
    const INQR_END_DT = "20240621"; // 조회 종료날짜
    const SLL_BUY_DVSN_CD = "00"; //매수매도 구분 00전체 01매도 02매수
    const INQR_DVSN = "00"; //조회구분 00역순 01정순
    const INQR_DVSN_3 = "00"; //00전체 01 현금
    let maxCnt = 10;
    let cnt = 0;
    let tradingDatas: any[] = [];
    while (cnt < maxCnt) {
      const resp = await this.fetcher.get(
        `/uapi/domestic-stock/v1/trading/inquire-daily-ccld?CANO=${cano}&ACNT_PRDT_CD=${ACNT_PRDT_CD}&INQR_STRT_DT=${INQR_STRT_DT}&INQR_END_DT=${INQR_END_DT}&SLL_BUY_DVSN_CD=${SLL_BUY_DVSN_CD}&INQR_DVSN=${INQR_DVSN}&PDNO=&CCLD_DVSN=${"01"}&ORD_GNO_BRNO=&ODNO=&INQR_DVSN_3=${INQR_DVSN_3}&INQR_DVSN_1=&CTX_AREA_FK100=${CTX_AREA_FK100}&CTX_AREA_NK100=${CTX_AREA_NK100}&AFHR_FLPR_YN=&OFL_YN=N&UNPR_DVSN=01&FUND_STTL_ICLD_YN=N&FNCG_AMT_AUTO_RDPT_YN=N&PRCS_DVSN=01`,
        { headers: { tr_id: HANTU_TR_ID_M_TRADING } }
      );
      console.log("거래내역 : ", resp.data.output1);
      console.log("거래output2:", resp.data.output2);
      console.log("message : ", resp.data.msg1);
      console.log("nk : ", resp.data.ctx_area_nk100);
      CTX_AREA_FK100 = resp.data.ctx_area_fk100;
      CTX_AREA_NK100 = resp.data.ctx_area_nk100;
      cnt++;
      tradingDatas = [...tradingDatas, ...resp.data.output1];
      if (!CTX_AREA_NK100.trim()) {
        console.log("종료:", CTX_AREA_NK100.trim());
        break;
      } else {
        console.log("다음값: ", CTX_AREA_NK100.trim());
      }
    }

    return tradingDatas;
  }
}
