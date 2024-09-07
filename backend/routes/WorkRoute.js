import express from "express";

const WorkRoute = express.Router();

WorkRoute.get("/compiler", (req, res) => {
    if (!req.user) {
        return res.redirect('/');
    }
    res.send(`Welcome ${req.user.name}`);
})

WorkRoute.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) { return next(err); }

        req.session.destroy(() => {
            res.clearCookie('connect.sid');
            res.redirect(process.env.CLIENT_URL);
        });
    });
})

export default WorkRoute;