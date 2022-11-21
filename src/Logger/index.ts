import { GenericLogger } from './types.js';

export class Logger<T extends GenericLogger> {
  logger?: T;

  constructor(loggerProvider: T | undefined) {
    this.logger = loggerProvider;
  }

  error(message: string) {
    if (this.logger) this.logger.error(message);
  }

  warn(message: string) {
    if (this.logger) this.logger.warn(message);
  }

  info(message: string) {
    if (this.logger) this.logger.info(message);
  }

  debug(message: string) {
    if (this.logger) this.logger.debug(message);
  }
}
