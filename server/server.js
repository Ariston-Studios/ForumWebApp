import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import passport from "./config/passport.js";
import db from "./config/db.js";
import authRoutes from './routes/auth.js';
import questionRoutes from './routes/questions.js';
import answerRoutes from './routes/answer.js'
import feedRouts from './routes/feed.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors({ origin: process.env.ORIGIN, 
    credentials: true, 
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true, sameSite: "lax", maxAge: 24 * 60 * 60 * 1000 }
}));

app.use(passport.initialize());
app.use(passport.session());

app.get("/", async (req, res) => {
    try {
        const result = await db.query("SELECT username, name, email_id FROM users");
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching users: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.use("/api/auth", authRoutes);
app.use("/api/answers",answerRoutes);
app.use("/api/questions", questionRoutes); 
app.use("/feed", feedRouts);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
