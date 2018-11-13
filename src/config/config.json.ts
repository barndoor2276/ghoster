import { IConfig } from './IConfig';

export default {
    app: {
        port: 9999,
        host: "192.168.1.235"
    },
    targetapp: {
        port: 443,
        host: "vmtass-k009.api-wi.com",
        basePath: "/APIHC/TASS/WAS/WAS_2016_5_Device/",
        useHttps: true,
        caFile: "C:\\Temp\\Augustus_CA_Chain_Base64_exp_2019_10_20.pem",
        ip: "192.168.1.138"
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