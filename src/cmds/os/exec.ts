import { ChildProcess, exec } from "child_process";

export const execOsCmd = async (cmd: string, options?:Record<string, Object>) => {
    return new Promise((resolve, reject) => {
        const process = exec(cmd, options, (err, stdout, stderr) => {
            if (err) {
                reject(stderr);
            }
            resolve(stdout);
        });
        process.stdout?.on('data', data => console.log(data));
        process.stderr?.on('data', data => console.error(data));
    });
};