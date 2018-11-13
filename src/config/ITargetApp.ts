export interface ITargetApp {
    name: string,
    port: number,
    host: string,
    basePath: string,
    useHttps: boolean,
    caFile: string,
    ip: string
}