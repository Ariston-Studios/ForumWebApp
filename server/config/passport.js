import passport from "passport";
import bcrypt from "bcrypt";
import { Strategy } from "passport-local";
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

passport.serializeUser((user, cb) =>{
    return cb(null, user);
});

passport.deserializeUser((user, cb) => {
    return cb(null, user);
});

export default passport;