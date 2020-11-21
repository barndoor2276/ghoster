import { ServerOptions } from 'http-proxy';

export interface IConfig {
	app: {
		port: number
	},
	serverOptions: ServerOptions
	corsHeaders: string[],
	winston: {
		transports: any[]
	},
	cloner: string
}