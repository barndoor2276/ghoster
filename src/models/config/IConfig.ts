import { ITargetApp } from './ITargetApp';

export interface IConfig {
	app: {
		port: number
	},
	targetapp: ITargetApp,
	corsHeaders: string[],
	winston: {
		transports: any[]
	},
	cloner: string
}