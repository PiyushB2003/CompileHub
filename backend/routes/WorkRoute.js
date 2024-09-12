import express from "express";
import { writeFileSync, unlinkSync, existsSync } from "fs";
import { exec, execSync } from "child_process";

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

const runCommand = (command, cwd = process.cwd()) => {
    return new Promise((resolve, reject) => {
        exec(command, { cwd }, (error, stdout, stderr) => {
            if (error) {
                reject({ error: error.message, stderr });
            } else {
                resolve(stdout);
            }
        });
    });
};

// Function to handle file creation, execution, and cleanup
const handleCodeExecution = async (req, res, fileName, execCommandUnix, execCommandWin, cleanupFiles = []) => {
    const { code } = req.body;

    // Write code to file
    writeFileSync(fileName, code);

    try {
        // Determine the correct command based on the OS
        const isWin = process.platform === 'win32';
        const execCommand = isWin ? execCommandWin : execCommandUnix;

        // Compile or execute code
        const output = execSync(execCommand).toString();
        res.json({ output });
    } catch (err) {
        res.json(err);
    } finally {
        cleanupFiles.forEach(file => {
            if (existsSync(file)) unlinkSync(file);
        });
    }
};

// Endpoint to handle code execution based on language
WorkRoute.post('/run', async (req, res) => {
    const { language, code } = req.body;
});

export default WorkRoute;