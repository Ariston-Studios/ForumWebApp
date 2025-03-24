import { Router } from "express";
import { createQuestion, getQuestions, getQuestionById ,voteQuestion } from "../controllers/quesController.js";

const router = Router();


router.post("/ask", createQuestion);

router.get("/", getQuestions);

router.get("/:id", getQuestionById);

router.patch("/:id/vote", voteQuestion);

export default router;
