import { IConfig } from './IConfig';

export default {
    app: {
        port: 9999,
        ip: "127.0.0.1"
    },
    targetapp: {
        port: 6000,
        ip: "192.168.1.143"
    },
    corsHeaders: ["Link"],
    winston: {
        transports:
        [{
            name: "console1",
            type: "console",
            options: {
                level: "debug"
            }
        },
        {
            name: "file1",
            type: "file",
            options: {
                level:"debug",
                filename: "./dist/log/ghoster.log",
                tailable: true
            }
        }]
    }
} as IConfig