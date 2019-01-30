import { ITargetApp } from './ITargetApp';
export interface IConfig {
	app: {
		port: number,
		host: string
	},
	targetapp: ITargetApp,
	corsHeaders: string[],
	winston: {
		transports: any[]
	}
}