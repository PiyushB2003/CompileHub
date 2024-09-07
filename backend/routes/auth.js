import express from "express";
import passport from "passport";

const AuthRoute = express.Router();

AuthRoute.get("/google", passport.authenticate("google", {
    scope: ['profile', 'email'],
    prompt: 'select_account',
}));

AuthRoute.get("/google/callback", passport.authenticate("google", {
    successRedirect: `${process.env.CLIENT_URL}/compiler`,
    failureRedirect: `${process.env.CLIENT_URL}/login`
}))

export default AuthRoute;