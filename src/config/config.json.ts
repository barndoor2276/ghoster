import { IConfig } from '../models/config/IConfig';
import { resolve } from 'path';

export default {
	app: {
		port: 8008
	},
	targetName: 'vmtass-m17-staging-2020',
	serverOptions: {
		target: 'https://vmtass-m17.api-wi.com/APIHC/TASS/WAS/v2020_testing1_Staging_WAS/',
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
					level: "debug",
					filename: "./dist/log/ghoster.log",
					tailable: true
				}
			}]
	},
	cloner: resolve('cloner')
} as IConfig