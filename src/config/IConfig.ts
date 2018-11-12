export interface IConfig {
    app: {
        port: number,
        ip: string
    },
    targetapp: {
        port: number,
        host: string,
        hostname: string,
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