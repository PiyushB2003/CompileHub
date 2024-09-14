import express from "express";
import { handleCodeExecution } from "../services/HandleCode.js";

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

WorkRoute.post('/run', async (req, res) => {
    const { language, code } = req.body;

    switch (language) {
        case 'c':
            await handleCodeExecution(
                req,
                res,
                'main.c',
                'gcc main.c -o program && ./program', 
                'gcc main.c -o program && program.exe', 
                ['main.c', 'program', 'program.exe']
            );
            break;

        case 'cpp':
            await handleCodeExecution(
                req,
                res,
                'main.cpp',
                'g++ main.cpp -o program && ./program', 
                'g++ main.cpp -o program && program.exe',
                ['main.cpp', 'program', 'program.exe']
            );
            break;

        case 'java':
            await handleCodeExecution(
                req,
                res,
                'Main.java',
                'javac Main.java && java Main', 
                'javac Main.java && java Main',
                ['Main.java', 'Main.class']
            );
            break;

        case 'javascript':
            await handleCodeExecution(
                req,
                res,
                'main.js',
                'node main.js',
                'node main.js', 
                ['main.js']
            );
            break;

        case 'python':
            await handleCodeExecution(
                req,
                res,
                'main.py',
                'python3 main.py',  // Unix-based
                'python main.py',  // Windows
                ['main.py']
            );
            break;

        default:
            res.status(400).json({ error: 'Unsupported language' });
            break;
    }
});


export default WorkRoute;