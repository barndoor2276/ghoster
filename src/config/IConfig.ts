export interface IConfig {
    app: {
        port: number,
        ip: string
    },
    targetapp: {
        port: number,
        ip: string
    },
    corsHeaders: string[],
    winston: {
        transports: any[]
    }
}