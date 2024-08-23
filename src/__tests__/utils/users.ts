import UserModel from "../../schemas/user";
import { User } from "../../types";

export const usersInDb = async (): Promise<User[]> => {
  const users = await UserModel.find({});
  return users.map((user) => user.toJSON());
};
