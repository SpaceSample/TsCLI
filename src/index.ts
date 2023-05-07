import repl from 'repl';
import os from './cmds/os';

const asyncLog = async <T>(p: Promise<T>) => {
    p.then(res => console.log(res));
};

const main = () => {
    const replServer = repl.start();
    replServer.context.asyncLog = asyncLog;
    replServer.context.os = os;
};

main();
