import axios from "axios";
const { HANTU_BASE_URL, HANTU_API_KEY, HANTU_API_SECRET_KEY, HANTU_TR_ID } =
  process.env;

const access_token = ""; //DUMMY: db에서 가져와야함
//우리 서버랑 통신할 Api 세팅
export class HantuBaseApi {
  fetcher;
  constructor() {
    //미리생성
    axios.defaults.withCredentials = true;
    this.fetcher = axios.create({
      baseURL: HANTU_BASE_URL,
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${access_token}`,
        appkey: HANTU_API_KEY, //DUMMY:  db에서 받아와 유저별로 설정해 줘야 하는 키
        appsecret: HANTU_API_SECRET_KEY, //DUMMY:  db
        tr_id: HANTU_TR_ID,
      },
    });
  }
}
