import { Router } from "express";
import { registerUser, setUsername, logOutUser, checkSession } from "../controllers/authController.js";
import passport from "../config/passport.js";
import db from "../config/db.js";

const router = Router();

router.post("/register", registerUser);

router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if(err) return res.status(500).json({error: "Authentication Error"});
        if(!user) return res.status(401).json({error: info.message || "Invalid Credentials"});

        req.login(user, (err) => {
            if(err) return res.status(500).json({error: "Login Failed"});
            res.json({message: "Login Successful", user});
        });
    })(req, res, next);
});

router.get("/google", passport.authenticate("google", {
    scope: ["profile", "email"],
}))

router.get("/google/feed",
    passport.authenticate("google", { failureRedirect: "http://localhost:5173/login", session: true }),
    (req, res) => {
        // console.log(req);
        res.redirect(`http://localhost:5173/feed?needsUsername=${req.needsUsername}`);
    }
);
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));

router.get("/github/feed",
    passport.authenticate("github", { failureRedirect: "http://localhost:5173/login", session: true }),
    (req, res) => {
        // console.log(req);
        res.redirect(`http://localhost:5173/feed?needsUsername=${req.needsUsername}`);
    }
);

router.get("/discord",passport.authenticate("discord", {
        scope: ["identify", "email"],
    }));

router.get("/discord/feed",
    passport.authenticate("discord", { failureRedirect: "http://localhost:5173/login", session: true }),
    (req, res) => {
        res.redirect("http://localhost:5173/feed");
    }
);

router.post("/set-username", setUsername);

router.post("/logout", logOutUser);

router.get("/check-session", checkSession);

export default router;