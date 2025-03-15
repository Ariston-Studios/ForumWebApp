import db from "../config/db.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const saltRounds = 10;

export const registerUser = async (req, res) => { 
    const { username, name, email, password } = req.body;

    try {
        const checkResult = await db.query("SELECT * FROM users WHERE email_id = $1", [email]);
        if (checkResult.rows.length > 0) {
            return res.json({ info: "Email already exists. Try logging in." });
        }

        bcrypt.hash(password, saltRounds, async (err, hash) => {
            if (err) {
                console.error("Error hashing password: ", err);
                return res.status(500).json({ error: "Internal server error" });
            }

            const result = await db.query(
                "INSERT INTO users (username, name, email_id, password_hash) VALUES ($1, $2, $3, $4) RETURNING *",
                [username, name, email, hash]
            );

            console.log(result.rows);
            res.json({ info: "User successfully registered!" });
        });

    } catch (error) {
        console.error("Error registering user: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

