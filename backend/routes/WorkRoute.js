import express from "express";
import { writeFileSync, unlinkSync } from "fs";
import { exec } from "child_process";

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

WorkRoute.post("/run", (req, res) => {
    const { language, code } = req.body;
    let dockerImage;
    let filename;
    let runCommand;

    switch (language) {
        case 'python':
            dockerImage = 'python:3.9';
            filename = 'code.py';
            runCommand = 'python3 code.py';
            break;
        case 'cpp':
            dockerImage = 'gcc:latest';
            filename = 'code.cpp';
            runCommand = 'g++ code.cpp -o code && ./code';
            break;
        case 'java':
            dockerImage = 'openjdk:latest';
            filename = 'code.java';
            runCommand = 'javac code.java && java code';
            break;
        case 'javascript':
            dockerImage = 'node:18';
            filename = 'code.js';
            runCommand = 'node code.js';
            break;
        case 'c':
            dockerImage = 'gcc:latest';
            filename = 'code.c';
            runCommand = 'gcc code.c -o code && ./code';
            break;
        default:
            return res.status(400).json({ message: 'Language not supported' });
    }

    try {
        writeFileSync(filename, code);

        const command = `docker run --rm -v "$PWD":/usr/src/app -w /usr/src/app ${dockerImage} sh -c "${runCommand}"`;


        exec(command, (error, stdout, stderr) => {
            unlinkSync(filename);

            if (error) {
                return res.status(500).json({
                    message: "Error during running the code",
                    error: stderr || error.message
                });
            }
            return res.status(200).json({
                message: "Code run successfully",
                output: stdout
            });
        });
    } catch (err) {
        return res.status(500).json({
            message: "An error occurred while handling the code",
            error: err.message
        });
    }
});

export default WorkRoute;