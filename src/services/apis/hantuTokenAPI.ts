import axios from "axios";
const { HANTU_BASE_URL, HANTU_TR_ID } = process.env;
export interface IAccessRes {
  access_token: string;
  access_token_token_expired: string;
  token_type: string;
  expires_in: number;
}
//우리 서버랑 통신할 Api 세팅
export class HantuTokenApi {
  fetcher;
  constructor() {
    axios.defaults.withCredentials = true;
    this.fetcher = axios.create({
      baseURL: HANTU_BASE_URL,
      headers: {
        "Content-type": "application/json",
        tr_id: HANTU_TR_ID,
      },
    });
  }
  async getToken(appkey: string, appsecret: string) {
    try {
      const resp = await this.fetcher.post("/oauth2/tokenP", {
        grant_type: "client_credentials",
        appkey,
        appsecret,
      });
      return resp.data;
    } catch (error) {
      console.error("Error to get Token : ", error);
      throw Error;
    }
  }
}
