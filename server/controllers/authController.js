import db from "../config/db.js"
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const saltRounds = 10;

db.connect();

export const registerUser = async (req, res) => {
    const username = req.body.username;
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    try {
        const checkResult = await db.query("SELECT * FROM users WHERE email_id = $1", [email]);
        if (checkResult.rows.length > 0) {
            res.json({ info: "Email already exists. Try logging in." });
        } else {

            bcrypt.hash(password, saltRounds, async (err, hash) => {
                if (err) {
                    console.error("Error hashing password: ", err);
                } else {
                    const result = await db.query(
                        "INSERT INTO users (username, name, email_id, password_hash) VALUES ($1, $2, $3, $4) RETURNING *",
                        [username, name, email, hash]
                    );
                    console.log(result.rows);
                    res.statusStatus(200).json({ info: "User successfully registered!" });
                }
            });
        }
    } catch (error) {
        console.error("Error registering user: ", error);
        res.sendStatus(500).json({ error: "Internal server error" });
    }
};