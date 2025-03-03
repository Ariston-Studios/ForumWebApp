import db from "../config/db.js";


export const createQuestion = async (req, res) => {
  try {
    const { title, body, users } = req.body;

    if (!title || !body || !users) {
      return res.status(400).json({ message: "Title, body, and users are required" });
    }

    const result = await db.query(
      "INSERT INTO questions (title, body, users) VALUES ($1, $2, $3) RETURNING *",
      [title, body, users]
    );

    res.status(201).json({ message: "Question posted successfully", question: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const getQuestions = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM questions ORDER BY created_at DESC");
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const getQuestionById = async (req, res) => {
  try {
    const { question_id } = req.params;
    const result = await db.query("SELECT * FROM questions WHERE id = $1", [question_id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export default { createQuestion, getQuestions, getQuestionById };

  