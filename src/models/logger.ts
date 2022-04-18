export interface ILogger {
  debug: (message: any) => void;
  error: (message: any) => void;
  info: (message: any) => void;
  warn: (message: any) => void;
  log: (level: string, message: any) => void;
}
