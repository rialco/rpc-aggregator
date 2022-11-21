type LogLevel = 'error' | 'warn' | 'info' | 'debug';

export type GenericLogger = {
  [method in LogLevel]: (message: string, info?: any) => void;
};
