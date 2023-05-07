import https from 'https';


const toUrlParams = (data?: unknown) => {
    if(!data) {
        return '';
    }
    const res: string[] = [];
    const params = Object.entries(data).forEach(([k, v]) => {
        res.push(`${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    });
    return `?${res.join('&')}`;
};

export const httpsCall = async (
    hostname: string,
    path: string,
    headers: Record<string, string>,
    method: 'POST' | 'GET',
    data?: unknown
): Promise<string> => {
    const options = {
        protocal: 'https',
        hostname,
        port: 443,
        method,
        path: method === 'GET' ? `${path}${toUrlParams(data)}`: path,
        headers
    };
    return new Promise<string>((resolve, reject) => {
        const req = https.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => {body += chunk;})
            res.on('end', () => {
                if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
                    resolve(body);
                }else {
                    reject(`Failure: HTTPS return code ${res.statusCode}: ${body}`);
                }
            });
            res.on('error', () => {
                reject(`Error: HTTPS call failed`)
            });
        });
        if (method === 'POST') {
            data && req.write(JSON.stringify(data));
        }
        req.end();
    });
};