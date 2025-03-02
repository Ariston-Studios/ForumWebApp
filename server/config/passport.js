import passport from "passport";
import bcrypt from "bcrypt";
import { Strategy } from "passport-local";
import GoogleStrategy from "passport-google-oauth2";
import GitHubStrategy from "passport-github2";
import db from "./db.js";

passport.use(new Strategy(
    {
        usernameField: "email",
    },
    async function verify(username, password, cb) {
        try {
            const result = await db.query("SELECT * FROM users WHERE email_id = $1", [username]);
            if (result.rows.length > 0) {
                const user = result.rows[0];
                const hashedPassword = user.password_hash;

                bcrypt.compare(password, hashedPassword, (err, result) => {
                    if (err) {
                        return cb(err);
                    } else {
                        if (result) {
                            return cb(null, user);
                        } else {
                            return cb(null, false, { message: "Incorrect password" });
                        }
                    }
                });
            } else {
                return cb(null, false, { message: "User not found" });
            }
        } catch (error) {
            return cb(error);
        }
    }));

passport.use("google", new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
}, async (accessToken, refreshToken, profile, cb) => {
    try {
        const result = await db.query("SELECT * FROM users WHERE email_id = $1", [profile.email]);
        if (result.rows.length === 0) {
            // const newUser = await db.query("INSERT INTO users (email_id, password_hash) VALUES ($1, $2)", [profile.email, "google"]);
            cb(null, {
                googleId: profile.id,
                email: profile.email,
                name: profile.displayName,
                needsUsername: true
            });
        } else {
            cb(null, result.rows[0]);
        }
    } catch (error) {
        cb(error);
    }
}));
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
    scope: ["user:email"]
}, async (accessToken, refreshToken, profile, cb) => {
    try {
        const email = profile.emails?.[0]?.value || null;
        // const username = profile.username;
        // const name = profile.displayName;

        console.log(profile);

        if (!email) {
            return cb(null, false, { message: "GitHub account does not have a public email." });
        }

        let result = await db.query("SELECT * FROM users WHERE email_id = $1", [email]);

        if (result.rows.length === 0) {
            cb(null, {
                githubId: profile.id,
                email: profile.emails[0].value,
                name: profile.displayName,
                needsUsername: true
            });
        } else {
            cb(null, result.rows[0]);
        }
    } catch (error) {
        console.log("Error");
        cb(error);
    }
}));

passport.serializeUser((user, cb) => {
    return cb(null, user);
});

passport.deserializeUser((user, cb) => {
    return cb(null, user);
});

export default passport;