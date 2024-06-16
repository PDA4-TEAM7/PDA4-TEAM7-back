import moment from "moment-timezone";

const timeZone = "Asia/Seoul";

export const getKSTNow = (): Date => {
  return moment().tz(timeZone).toDate();
};
