import { Request, Response } from "express";
import UserModel from "../schemas/user";
import type { User } from "../types";
import { hashPassword } from "../libs/hash";

const createUser = async (req: Request, res: Response) => {
  const userRequest = req.body as User;

  const userToSave = new UserModel({
    ...userRequest,
    passwordHash: hashPassword(userRequest.password),
    notes: [],
  });

  const userSaved = await userToSave.save();

  return res.status(201).json(userSaved);
};

const getAll = async (_: Request, res: Response) => {
  const users = await UserModel.find({});

  return res.json(users);
};

export default {
  createUser,
  getAll,
};
