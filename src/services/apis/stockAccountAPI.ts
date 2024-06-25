import { formatYYMMDD } from "../../utils/time";
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
// 일자별 거래내역 output1에 대한 응답
export interface ITradingData {
  ord_dt: string;
  ord_gno_brno: string;
  odno: string;
  orgn_odno: string;
  ord_dvsn_name: string;
  sll_buy_dvsn_cd: string;
  sll_buy_dvsn_cd_name: string;
  pdno: string;
  prdt_name: string;
  ord_qty: string;
  ord_unpr: string;
  ord_tmd: string;
  tot_ccld_qty: string;
  avg_prvs: string;
  cncl_yn: string;
  tot_ccld_amt: string;
  loan_dt: string;
  ordr_empno: string;
  ord_dvsn_cd: string;
  cncl_cfrm_qty: string;
  rmn_qty: string;
  rjct_qty: string;
  ccld_cndt_name: string;
  inqr_ip_addr: string;
  cpbc_ordp_ord_rcit_dvsn_cd: string;
  cpbc_ordp_infm_mthd_dvsn_cd: string;
  infm_tmd: string;
  ctac_tlno: string;
  prdt_type_cd: string;
  excg_dvsn_cd: string;
  cpbc_ordp_mtrl_dvsn_cd: string;
  ord_orgno: string;
  rsvn_ord_end_dt: string;
}
// 일자별 거래내역 전체에 대한 응답
export interface ITradingResponse {
  ctx_area_fk100: string;
  ctx_area_nk100: string;
  output1: ITradingData[];
  output2: {
    tot_ord_qty: string;
    tot_ccld_qty: string;
    tot_ccld_amt: string;
    prsm_tlex_smtl: string;
    pchs_avg_pric: string;
  };
  rt_cd: string;
  msg_cd: string;
  msg1: string;
}
export class StockAccountApi extends HantuBaseApi {
  async inquireBalance(cano: string) {
    const resp = await this.fetcher.get(
      `/uapi/domestic-stock/v1/trading/inquire-balance?CANO=${cano}&ACNT_PRDT_CD=${ACNT_PRDT_CD}&AFHR_FLPR_YN=N&OFL_YN=N&INQR_DVSN=01&UNPR_DVSN=01&FUND_STTL_ICLD_YN=N&FNCG_AMT_AUTO_RDPT_YN=N&PRCS_DVSN=01&CTX_AREA_FK100=&CTX_AREA_NK100=`,
      { headers: { tr_id: HANTU_TR_ID_M } }
    );
    console.log("inquire balance : ", resp.data);
    return resp.data;
  }

  // cano : 계좌번호
  async inquireDailyCCLD(cano: string) {
    let CTX_AREA_FK100 = ""; //최초시 공란, 그 이후 데이터는 이전 조회 Ouput의 CTX_AREA_FK100 값
    let CTX_AREA_NK100 = ""; //최초시 공란, 그 이후 데이터는 이전 조회 Ouput의 CTX_AREA_NK100 값
    const currentDate = new Date();
    const INQR_END_DT = formatYYMMDD(currentDate); // 조회 시작날짜
    currentDate.setMonth(currentDate.getMonth() - 3);
    const INQR_STRT_DT = formatYYMMDD(currentDate); // 조회 종료날짜
    const SLL_BUY_DVSN_CD = "00"; //매수매도 구분 00전체 01매도 02매수
    const INQR_DVSN = "00"; //조회구분 00역순 01정순
    const INQR_DVSN_3 = "00"; //00전체 01 현금

    let maxCnt = 10;
    let cnt = 0;
    let tradingDatas: any[] = [];
    //1. 데이터 연속적으로 조회
    try {
      await getTranding(CTX_AREA_NK100, this.fetcher);
      async function getTranding(nk: string, fetcher: any) {
        const resp = await fetcher.get(
          `/uapi/domestic-stock/v1/trading/inquire-daily-ccld?CANO=${cano}&ACNT_PRDT_CD=${ACNT_PRDT_CD}&INQR_STRT_DT=${INQR_STRT_DT}&INQR_END_DT=${INQR_END_DT}&SLL_BUY_DVSN_CD=${SLL_BUY_DVSN_CD}&INQR_DVSN=${INQR_DVSN}&PDNO=&CCLD_DVSN=${"01"}&ORD_GNO_BRNO=&ODNO=&INQR_DVSN_3=${INQR_DVSN_3}&INQR_DVSN_1=&CTX_AREA_FK100=${CTX_AREA_FK100}&CTX_AREA_NK100=${nk}&AFHR_FLPR_YN=&OFL_YN=N&UNPR_DVSN=01&FUND_STTL_ICLD_YN=N&FNCG_AMT_AUTO_RDPT_YN=N&PRCS_DVSN=01`,
          { headers: { tr_id: HANTU_TR_ID_M_TRADING } }
        );
        console.log("get Trading info:", resp);
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
          return;
        } else {
          console.log("다음값: ", CTX_AREA_NK100.trim());
          await getTranding(CTX_AREA_NK100, fetcher);
        }
      }
    } catch (error) {
      console.log(error);
    }
    function getTotalAmtAndQty(stockId: string, startIdx: number): { tot_amt: number; tot_qty: number } {
      let tot_amt = 0;
      let tot_qty = 0;
      tradingDatas.forEach((data, idx) => {
        if (idx <= startIdx || data.sll_buy_dvsn_cd === "01") return;
        if (stockId == data.pdno) {
          tot_amt += Number(data.tot_ccld_amt);
          tot_qty += Number(data.tot_ccld_qty);
        }
      });
      return { tot_amt, tot_qty };
    }
    //2. 매도(01)일 경우 손익율 손익금 값 저장하기
    const addPflsTradingDatas = tradingDatas.map((data, idx) => {
      if (data.sll_buy_dvsn_cd === "01") {
        //idx 이후 나오는 sll_buy_dvsn_cd = '02', stock_id 가일치하는 데이터의 tot_ccld_amt와 tot_ccld_qty의 총 합 구하기
        const { tot_amt, tot_qty } = getTotalAmtAndQty(data.pdno, idx); // idx이후 값의 해당 주식의 총 매수금액
        const buy_avg = tot_amt / tot_qty; //매입평균가
        const pfls_amt = +data.avg_prvs - buy_avg; //1주당 손익금
        const evlu_pfls_amt = pfls_amt * +data.tot_ccld_qty; //총 손익금
        const evlu_pfls_rt = (pfls_amt / buy_avg) * 100; //손익율
        console.log(
          `손익금 추가 데이터 : amt= ${evlu_pfls_amt}, pr=${evlu_pfls_rt}, 매입_tot_amt=${tot_amt},매입_tot_qty=${tot_qty}, buy_avg=${buy_avg}`
        );
        return { ...data, evlu_pfls_amt, evlu_pfls_rt };
      } else {
        return data;
      }
    });

    return addPflsTradingDatas;
  }

  async inquireSingleDayCCLD(cano: string): Promise<ITradingResponse[]> {
    let CTX_AREA_FK100 = ""; // 최초시 공란
    let CTX_AREA_NK100 = ""; // 최초시 공란
    const currentDate = new Date();
    const INQR_STRT_DT = formatYYMMDD(currentDate); // 조회할 단일 날짜
    const INQR_END_DT = INQR_STRT_DT; // 동일 날짜로 설정
    const SLL_BUY_DVSN_CD = "00"; // 매수매도 구분 코드: 00전체
    const INQR_DVSN = "00"; // 조회구분: 00역순
    const INQR_DVSN_3 = "00"; // 00전체 01 현금

    let tradingDatas: ITradingResponse[] = [];

    const getTranding = async (nk: string) => {
      const resp = await this.fetcher.get<ITradingResponse>(
        `/uapi/domestic-stock/v1/trading/inquire-daily-ccld?CANO=${cano}&ACNT_PRDT_CD=${ACNT_PRDT_CD}&INQR_STRT_DT=${INQR_STRT_DT}&INQR_END_DT=${INQR_END_DT}&SLL_BUY_DVSN_CD=${SLL_BUY_DVSN_CD}&INQR_DVSN=${INQR_DVSN}&PDNO=&CCLD_DVSN=${"01"}&ORD_GNO_BRNO=&ODNO=&INQR_DVSN_3=${INQR_DVSN_3}&INQR_DVSN_1=&CTX_AREA_FK100=${CTX_AREA_FK100}&CTX_AREA_NK100=${nk}&AFHR_FLPR_YN=&OFL_YN=N&UNPR_DVSN=01&FUND_STTL_ICLD_YN=N&FNCG_AMT_AUTO_RDPT_YN=N&PRCS_DVSN=01`,
        { headers: { tr_id: HANTU_TR_ID_M_TRADING } }
      );
      console.log("거래내역 : ", resp.data.output1);
      console.log("거래output2:", resp.data.output2);
      console.log("message : ", resp.data.msg1);
      console.log("nk : ", resp.data.ctx_area_nk100);
      CTX_AREA_FK100 = resp.data.ctx_area_fk100;
      CTX_AREA_NK100 = resp.data.ctx_area_nk100;
      tradingDatas.push(resp.data);
      if (resp.data.ctx_area_nk100.trim()) {
        await getTranding(resp.data.ctx_area_nk100);
      }
    };

    try {
      await getTranding(CTX_AREA_NK100);
    } catch (error) {
      console.error("에러 발생: ", error);
      throw new Error(`API 호출 중 에러가 발생했습니다: ${error}`);
    }

    return tradingDatas;
  }
}
