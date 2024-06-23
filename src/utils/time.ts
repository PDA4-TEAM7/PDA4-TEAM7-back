import moment from "moment-timezone";

const timeZone = "Asia/Seoul";

export const getKSTNow = (): Date => {
  return moment().tz(timeZone).toDate();
};

export const setDateByOrd = (ord_dt: string, ord_tmd: string): Date => {
  // ord_dt에서 연도, 월, 일 추출
  const year = parseInt(ord_dt.substring(0, 4));
  const month = parseInt(ord_dt.substring(4, 6)) - 1; // 월은 0부터 시작하므로 1을 빼줍니다.
  const day = parseInt(ord_dt.substring(6, 8));

  // ord_tmd에서 시간, 분, 초 추출
  const hours = parseInt(ord_tmd.substring(0, 2));
  const minutes = parseInt(ord_tmd.substring(2, 4));
  const seconds = parseInt(ord_tmd.substring(4, 6));

  // new Date 객체 생성
  const dateTime = new Date(year, month, day, hours, minutes, seconds);

  return dateTime;
};
