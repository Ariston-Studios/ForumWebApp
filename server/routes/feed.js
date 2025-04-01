import { Router } from "express";
import db from "../config/db.js";

const router = Router()

router.get("/", async (req, res) => {
    try {
        const { page = 1, limit = 10, sort = "newest", tag} = req.query;
        const offset = (page - 1) * limit;

        const orderByClause = "ORDER BY q.created_at DESC"; // newest

        if(sort == "most_voted") {
            orderByClause = "ORDER BY q.votes DESC";
        } else if (sort == "most_answered") {
            orderByClause = "ORDER BY q.answer_count DESC";
        }

        try {

            const countQuery = `
                SELECT COUNT(DISTINCT q.id) AS total_questions
                FROM questions q
                LEFT JOIN question_tags qt ON q.id = qt.question_id
                LEFT JOIN tags t ON qt.tag_id = t.id
                ${tag ? "WHERE t.name = $1" : ""}
            `;

            const countParams = tag ? [tag] : [];
            const countResult = await db.query(countQuery, countParams);
            const totalQuestions = countResult.rows[0].total_questions;

            const query = `
                SELECT q.id, q.title, q.body, q.votes, q.created_at, q.user_id, u.username,
                    COUNT(a.id) AS answer_count,
                    ARRAY_AGG(t.name) AS tags
                FROM questions q
                LEFT JOIN answers a ON q.id = a.question_id
                LEFT JOIN question_tags qt ON q.id = qt.question_id
                LEFT JOIN tags t ON qt.tag_id = t.id
                JOIN users u ON q.user_id = u.id
                ${tag ? "WHERE t.name = $1" : ""}
                GROUP BY q.id, u.username
                ${orderByClause}
                LIMIT $${tag ? 2 : 1} OFFSET $${tag ? 3 : 2}
                `;
            
            const params = tag ? [tag, limit, offset] : [limit, offset];

            const result = await db.query(query, params);
            res.json({ success: true, totalQuestions: totalQuestions, questions: result.rows });

        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, error: "Internal Server Error"});
        }

    } catch (error) {
        res.status(500).json({error: "Error fetching questions"})
    }
});

export default router;