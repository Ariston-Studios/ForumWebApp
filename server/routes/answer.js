import express from "express";
import { addAnswer,getAnswerByQuestionId, updateAnswer, deleteAnswer } from "../controllers/answerController.js";

const router = express.Router();

router.post("/", addAnswer);
router.get("/:question_id",getAnswerByQuestionId);
router.patch("/:answer_id", updateAnswer);
router.delete("/:answer_id", deleteAnswer);

export default router;
