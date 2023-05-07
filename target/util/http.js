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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpsCall = void 0;
const https_1 = __importDefault(require("https"));
const toUrlParams = (data) => {
    if (!data) {
        return '';
    }
    const res = [];
    const params = Object.entries(data).forEach(([k, v]) => {
        res.push(`${encodeURIComponent(k)}=${encodeURIComponent(v)}`);
    });
    return `?${res.join('&')}`;
};
const httpsCall = (hostname, path, headers, method, data) => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        protocal: 'https',
        hostname,
        port: 443,
        method,
        path: method === 'GET' ? `${path}${toUrlParams(data)}` : path,
        headers
    };
    return new Promise((resolve, reject) => {
        const req = https_1.default.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => { body += chunk; });
            res.on('end', () => {
                if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
                    resolve(body);
                }
                else {
                    reject(`Failure: HTTPS return code ${res.statusCode}: ${body}`);
                }
            });
            res.on('error', () => {
                reject(`Error: HTTPS call failed`);
            });
        });
        if (method === 'POST') {
            data && req.write(JSON.stringify(data));
        }
        req.end();
    });
});
exports.httpsCall = httpsCall;
