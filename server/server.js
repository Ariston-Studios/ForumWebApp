import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import pg from "pg";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
});

db.connect();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", async (req, res) => {
    try {
        const result = await db.query("SELECT username, name, email_id FROM users");
        res.json(result.rows); 
    } catch (error) {
        console.error("Error fetching users: ", error);
        res.status(500).json({error: "Internal Server Error"});
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});