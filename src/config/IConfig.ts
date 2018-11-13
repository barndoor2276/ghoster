import { ITargetApp } from './ITargetApp';
export interface IConfig {
    app: {
        port: number,
        host: string
    },
    targetapps: ITargetApp[],
    corsHeaders: string[],
    winston: {
        transports: any[]
    }
}