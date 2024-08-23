import { Router } from "express";
import { getInfo } from "../controllers/info";

const router = Router();

router.get("/", getInfo);

export default router;
