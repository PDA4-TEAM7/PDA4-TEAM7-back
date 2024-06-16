import sequelize from "../config/db.config";
import { User } from "../models/user";
import { getKSTNow } from "../utils/time";

sequelize.addModels([User]);

const addUser = async () => {
  try {
    await sequelize.authenticate();

    const newUser = await User.create({
      username: "batchtestuser",
      user_id: "testuser@example.com",
      password: "test",
    });

    console.log("배치로 유저 추가 성공:", newUser);
  } catch (error) {
    console.error("Unable to add user:", error);
  } finally {
    await sequelize.close();
  }
};

addUser();
