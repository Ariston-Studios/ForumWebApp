import { Router } from "express";
import { createQuestion, getQuestions, getQuestionById } from "../controllers/questionController.js";

const router = Router();


router.post("/ask", createQuestion);

router.get("/", getQuestions);

router.get("/:id", getQuestionById);

export default router;
