"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.execOsCmd = void 0;
const child_process_1 = require("child_process");
const execOsCmd = (cmd, options) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        var _a, _b;
        const process = (0, child_process_1.exec)(cmd, options, (err, stdout, stderr) => {
            if (err) {
                reject(stderr);
            }
            resolve(stdout);
        });
        (_a = process.stdout) === null || _a === void 0 ? void 0 : _a.on('data', data => console.log(data));
        (_b = process.stderr) === null || _b === void 0 ? void 0 : _b.on('data', data => console.error(data));
    });
});
exports.execOsCmd = execOsCmd;
