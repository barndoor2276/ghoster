import { IncomingHttpHeaders } from 'http';

export interface ServerResponses {
	responses: {
		headers: IncomingHttpHeaders,
		statusCode: number,
		data: string
	}[]
}