import { MONGO_URI } from "../libs/config";
import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(MONGO_URI!)
    .then(() => console.log("MongoDB connected"))
    .catch((e) => console.log(e));
};

export const disconnectDB = () => {
  mongoose.connection.close();
};
