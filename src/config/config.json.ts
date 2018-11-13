import { IConfig } from './IConfig';
import { ITargetApp } from './ITargetApp';

export default {
    app: {
        port: 9990,
        host: "192.168.253.104"
    },
    targetapps: [
        {
            name: "app1",
            port: 443,
            host: "vmtass-k009.api-wi.com",
            basePath: "/APIHC/TASS/WAS/WAS_2016_5_Device/",
            useHttps: true,
            caFile: "C:\\Temp\\Augustus_CA_Chain_Base64_exp_2019_10_20.pem",
            ip: "192.168.1.138"
        } as ITargetApp,
        {
            name: "app2",
            port: 443,
            host: "vmtass-k009.api-wi.com",
            basePath: "/APIHC/TASS/WAS/WAS_2016_5_Device/",
            useHttps: true,
            caFile: "C:\\Temp\\Augustus_CA_Chain_Base64_exp_2019_10_20.pem",
            ip: "192.168.1.138"
        } as ITargetApp
    ],
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