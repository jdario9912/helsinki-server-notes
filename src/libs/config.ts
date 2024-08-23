import dotenv from "dotenv";

dotenv.config();

const env = process.env;

export const PORT = process.env.PORT || 3000;
export const MONGO_URI =
  env.NODE_ENV === "test" ? env.MONGO_TEST_CONN_STR : env.MONGO_URI;
