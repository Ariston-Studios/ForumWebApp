import { Router } from "express";
import { registerUser } from "../controllers/authController.js";
import passport from "../config/passport.js";
import db from "../config/db.js";

db.connect();

const router = Router();

router.post("/register", registerUser);

router.post("/login", passport.authenticate("local"), (req, res) => {
    res.json({ message: "Login successful!", user: req.user })
});

router.get("/google", passport.authenticate("google", {
    scope: ["profile", "email"],
}))

router.get("/google/dashboard",
    passport.authenticate("google", { failureRedirect: "http://localhost:5173/login", session: true }),
    (req, res) => {
        if (req.user.needsUsername) {
            res.redirect(`http://localhost:5173/set-username?email=${req.user.email}&name=${req.user.name}`);
        } else {
            res.redirect("http://localhost:5173/dashboard");
        }
    }
);
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));

router.get("/github/dashboard",
    passport.authenticate("github", { failureRedirect: "http://localhost:5173/login", session: true }),
    (req, res) => {
        if (req.user.needsUsername) {
            res.redirect(`http://localhost:5173/set-username?email=${req.user.email}&name=${req.user.name}`);
        } else {
            res.redirect("http://localhost:5173/feed");
        }
    }
);

router.get("/discord",passport.authenticate("discord", {
        scope: ["identify", "email"],
    }));

router.get("/discord/feed",
    passport.authenticate("discord", { failureRedirect: "http://localhost:5173/login", session: true }),
    (req, res) => {
        if (req.user.needsUsername) {
            res.redirect(`http://localhost:5173/set-username?email=${req.user.email}&name=${req.user.name}`);
        } else {
            res.redirect("http://localhost:5173/dashboard");
        }
    }
);

router.post("/set-username", async (req, res) => {
    const { email, username, name } = req.body;

    if (!email || !username) {
        return res.status(400).json({ success: false, message: "Missing username or email" });
    }

    try {
        const checkUsername = await db.query("SELECT * FROM users WHERE username = $1", [username])

        if (checkUsername.rows.length > 0) {
            return res.status(400).json({ success: false, message: "Username already taken" });
        }

        await db.query("INSERT INTO users (username, name, email_id, password_hash) VALUES ($1, $2, $3, $4)", [username, name, email, "google"]);

        res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

router.post("/logout", (req, res) => {
    req.logout((err) => {
        if (err) res.status(500).json({ error: "Logout failed" });
        res.json({ message: "Logout successful" });
    });
});

export default router;