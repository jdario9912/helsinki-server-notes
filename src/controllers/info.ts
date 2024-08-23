import { Request, Response } from "express";
import { info } from "../libs/info";

export const getInfo = async (_: Request, res: Response) => {
  return res.send(await info());
};
