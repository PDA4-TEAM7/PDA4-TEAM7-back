const axios = require("axios");
const qs = require("qs");

// POST 요청에 포함될 페이로드 데이터
const payload = {
  bld: "dbms/MDC/STAT/standard/MDCSTAT03901",
  locale: "ko_KR",
  mktId: "STK",
  trdDd: "20240617",
  money: "1",
  csvxls_isNo: "false",
};

// 기본적으로 포함되는 요청 헤더 설정
const config = {
  headers: {
    Accept: "application/json, text/javascript, */*; q=0.01",
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
  },
};

//Post로
axios
  .post(
    "http://data.krx.co.kr/comm/bldAttendant/getJsonData.cmd",
    qs.stringify(payload),
    config
  )
  .then((response) => {
    console.log("Response data:", response.data);
  })
  .catch((error) => {
    console.error("Error during the API call:", error);
  });
