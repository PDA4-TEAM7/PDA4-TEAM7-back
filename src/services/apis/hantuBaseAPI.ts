import axios from "axios";
const { HANTU_BASE_URL_M, HANTU_TR_ID_M } = process.env;

const access_token = ""; //DUMMY: db에서 가져와야함
const hantu_api_key = ""; //DUMMY: db에서 가져와야함
const hantu_api_secret_key = ""; //DUMMY: db에서 가져와야함
//우리 서버랑 통신할 Api 세팅
export class HantuBaseApi {
  fetcher;
  constructor(appkey = "", secretAppKey = "", accessToken = "") {
    axios.defaults.withCredentials = true;
    this.fetcher = axios.create({
      baseURL: HANTU_BASE_URL_M,
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${accessToken}`,
        appkey: appkey, //DUMMY:  db에서 받아와 유저별로 설정해 줘야 하는 키
        appsecret: secretAppKey, //DUMMY:  db
        tr_id: HANTU_TR_ID_M,
      },
    });
  }
}
