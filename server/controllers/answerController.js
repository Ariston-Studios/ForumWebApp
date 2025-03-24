import { text } from "express";
import db from "../config/db.js";

export const addAnswer = async (req, res) => {
  try {
    const { question_id, username, content } = req.body;

    if (!question_id || !content || !username) {
      return res
        .status(400)
        .json({ error: "Question ID, Username and content are required." });
    }

    const fetchId = await db.query("SELECT id FROM users WHERE username = $1", [username]);

    let id = 0;

    if(fetchId.rows.length > 0) {
      id = fetchId.rows[0].id;
    } else {
      res.status(404).json({message: "User not found!!"});
    }

    const result = await db.query(
      "INSERT INTO answers (question_id, user_id, body) VALUES ($1, $2, $3) RETURNING *",
      [question_id, id, content]
    );
    res.status(201).json({ message: "Answer added", answer: result.rows[0] });
  } catch (error) {
    console.error("Error adding answer:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateAnswer = async (req, res) => {
  try {
    console.log(req.params.answer_id);
    const answer_id  = parseInt(req.params.answer_id);
    const { content } = req.body;

    const answer = await db.query("SELECT * FROM answers WHERE id = $1", [
      answer_id,
    ]);
    if (answer.rows.length === 0) {
      return res.status(404).json({ error: "Answer not found" });
    }

    const updated_at = new Date();
    const result = await db.query(
      "UPDATE answers SET body = $1, updated_at= $2 WHERE id = $3 RETURNING *",
      [content, updated_at, answer_id]
    );
    res.json({ message: "Answer updated", answer: result.rows[0] });
    
    
  } catch (error) {
    console.error("Error updating answer:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteAnswer = async (req, res) => {
  try {
    const { answer_id } = req.params;
    const user_id = parseInt(req.body.user_id);

    if (!answer_id) {
      return res.status(400).json({ error: "Answer ID is required." });
    }

    const answer = await db.query("SELECT * FROM answers WHERE id = $1", [
      answer_id,
    ]);
    if (answer.rows.length === 0) {
      return res.status(404).json({ error: "Answer not found" });
    }
    
    if (answer.rows[0].user_id !== user_id) {
      return res
        .status(403)
        .json({ error: "Unauthorized: You can only delete your own answers" });
    }
    await db.query("DELETE FROM answers WHERE id = $1", [answer_id]);
    res.json({ message: "Answer deleted" });
  } catch (error) {
    console.error("Error deleting answer:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAnswerByQuestionId=async(req,res)=>{
  try {
    const {question_id} = req.params;
    const result = await db.query(
      "SELECT * FROM answers WHERE question_id = $1 ORDER BY created_at DESC",[question_id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No answers found for this question." });
  }
    res.json(result.rows);
  } 
  catch(error){
    console.error("Error fetching answers:",error);
    res.status(500).json({error:"Internal Server Error."});
  }
};
