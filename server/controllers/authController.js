import db from "../config/db.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const saltRounds = 10;

export const registerUser = async (req, res) => { 
    const { username, name, email, password } = req.body;

    try {
        const checkResult = await db.query("SELECT * FROM users WHERE email_id = $1 OR username = $2", [email, username]);
        if (checkResult.rows.length > 0) {
            return res.json({ info: "User already exists. Try logging in." });
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

export const setUsername = async (req, res) => {
    const { email, username, name } = req.body;

    if (!email || !username) {
        return res.status(400).json({ success: false, message: "Missing username or email" });
    }

    try {
        const checkUsername = await db.query("SELECT * FROM users WHERE username = $1", [username])

        if (checkUsername.rows.length > 0) {
            return res.status(400).json({ success: false, message: "Username already taken" });
        }

        await db.query("INSERT INTO users (username, name, email_id, password_hash) VALUES ($1, $2, $3, $4)", [username, name, email, "oauth"]);

        res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const logOutUser = (req, res) => {
    req.logout((err) => {
        if (err) res.status(500).json({ error: "Logout failed" });
        req.session.destroy(() => res.json({ message: "Logout successful" }));
    });
};

export const checkSession = (req, res) => {
    if (req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.status(401).json({ message: "Not authenticated" });
    }
};