import db from "../config/db.js";


export const createQuestion = async (req, res) => {
  try {
    const { title, body, username } = req.body;

    if (!title || !body || !username) {
      return res.status(400).json({ message: "Title, body, and username are required" });
    }

    const fetchId = await db.query("SELECT id FROM users WHERE username = $1", [username]);

    let id = 0;

    if(fetchId.rows.length > 0) {      
      id = fetchId.rows[0].id;
    } else {
      return res.status(404).json({message: "User not found!!"});
    }

    const result = await db.query(
      "INSERT INTO questions (title, body, user_id) VALUES ($1, $2, $3) RETURNING *",
      [title, body, id]
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
    const question_id = parseInt(req.params.id);

    const result = await db.query("SELECT * FROM questions WHERE id = $1", [question_id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const voteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const { type } = req.body;

    if (type !== "upvote" && type !== "downvote") {
      return res.status(400).json({ message: "Invalid vote type" });
    }

    const voteChange = type === "upvote" ? 1 : -1;
    const result = await db.query(
      "UPDATE questions SET votes = votes + $1 WHERE id = $2 RETURNING *",
      [voteChange, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.status(200).json({ message: `Question ${type}d`, question: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


  