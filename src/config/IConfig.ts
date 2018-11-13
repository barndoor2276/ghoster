export interface IConfig {
    app: {
        port: number,
        host: string
    },
    targetapp: {
        port: number,
        host: string,
        basePath: string,
        useHttps: boolean,
        caFile: string,
        ip: string
    },
    corsHeaders: string[],
    winston: {
        transports: any[]
    }
}