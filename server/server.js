import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import session from "express-session";
import passport from "./config/passport.js";

import db from "./config/db.js";
import authRoutes from './routes/auth.js';
import answerRoutes from './routes/answer.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

db.connect();

app.use(cors({ origin: process.env.ORIGIN, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.get("/", async (req, res) => {
    try {
        const result = await db.query("SELECT username, name, email_id FROM users");
        res.json(result.rows); 
    } catch (error) {
        console.error("Error fetching users: ", error);
        res.status(500).json({error: "Internal Server Error"});
    }
});

//To check if sessions are working
app.get("/check", (req, res) => {
    if(req.isAuthenticated()) {
        console.log("Authenticated!!");
        res.sendStatus(200);
    } else {
        res.sendStatus(401);
    }
});

app.use("/api/auth", authRoutes);
app.use("/api/answers",answerRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

