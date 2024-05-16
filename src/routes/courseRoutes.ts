import { Router } from "express";
import { search } from "../controllers/courseController";

const router = Router();

router.post("/search", search);

export default router;
