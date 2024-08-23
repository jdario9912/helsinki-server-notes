import bcrypt from "bcrypt";

export const hashPassword = (password: string, salt?: number): string =>
  bcrypt.hashSync(password, salt ? salt : 10);
