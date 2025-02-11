import { Router } from "express";
import { registerUser } from "../controllers/authController.js";
import passport from "../config/passport.js";

const router = Router();

router.post("/register", registerUser);

router.post("/login", passport.authenticate("local"), (req, res) => {
    res.json({ message: "Login successful!", user: req.user })
});

router.post("/logout", (req, res) => {
    req.logout((err) => {
        if(err) res.status(500).json({ error: "Logout failed" });
        res.json({ message: "Logout successful" });
    });
});

export default router;