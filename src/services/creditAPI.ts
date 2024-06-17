import { User } from "../models/user";
export interface MyCreditResponse {
  credit?: number;
}
class creditAPI {
  static async getMyCredit(uid: number): Promise<MyCreditResponse> {
    const user = await User.findByPk(uid);
    if (!user) {
      throw new Error("사용자를 찾을 수가 없습니다.");
    }

    return { credit: user?.credit };
  }
}

export default creditAPI;
