import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import db from "./config/db.js";

import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

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

app.use("/api/auth", authRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});