import passport from "passport";
import bcrypt from "bcrypt";
import { Strategy } from "passport-local";
import GoogleStrategy from "passport-google-oauth2";
import GitHubStrategy from "passport-github2";
import DiscordStrategy from "passport-discord";
import db from "./db.js";

function isEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

passport.use(new Strategy(
    {
        usernameField: "email",
    },
    async function verify(username, password, cb) {
        try {
            const result = await db.query("SELECT * FROM users WHERE email_id = $1 OR username = $2", [username, username]);
            if (result.rows.length === 0) {
                return cb(null, false, { message: "User not found" });
            }

            const user = result.rows[0];
            const passwordMatch = await bcrypt.compare(password, user.password_hash);

            if (passwordMatch) {
                return cb(null, user);
            } else {
                return cb(null, false, { message: "Incorrect password" });
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

passport.use("discord", new DiscordStrategy({
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL: process.env.DISCORD_CALLBACK_URL,
}, async (accessToken, refreshToken, profile, cb) => {
    try {
        const result = await db.query("SELECT * FROM users WHERE email_id = $1", [profile.email]);
        if (result.rows.length === 0) {
            cb(null, {
                discordId: profile.id,
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

passport.serializeUser((user, cb) => {
    return cb(null, { id: user.id, needsUsername: user.needsUsername || false });
});

passport.deserializeUser(async (obj, cb) => {
    try {
        const result = await db.query("SELECT * FROM users WHERE id = $1", [obj.id]);
        if (result.rows.length > 0) {
            const user = result.rows[0];
            user.needsUsername = obj.needsUsername;
            cb(null, user);
        } else {
            cb(null, false);
        }
    } catch (error) {
        cb(error);
    }
});

export default passport;