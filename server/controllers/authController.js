import db from "../config/db.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const saltRounds = 10;

db.connect();


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

export const githubAuth = async (accessToken, refreshToken, profile, done) => {
    try {
        const email = profile.emails?.[0]?.value || null;
        const username = profile.username;
        const name = profile.displayName;

        if (!email) {
            return done(null, false, { message: "GitHub account does not have a public email." });
        }

        let user = await db.query("SELECT * FROM users WHERE email_id = $1", [email]);

        if (user.rows.length === 0) {
            user = await db.query(
                "INSERT INTO users (username, name, email_id, password_hash) VALUES ($1, $2, $3, $4) RETURNING *",
                [username, name, email, "github"]
            );
            return done(null, user.rows[0]);
        }

        return done(null, user.rows[0]);
    } catch (error) {
        console.error("GitHub Authentication Error:", error);
        return done(error, null);
    }
};
