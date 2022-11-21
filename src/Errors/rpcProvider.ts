import { RPCError } from './index.js';

export const MAX_NUMBER_RETRIES_ERROR = new RPCError(
  'The number of retries is exceded.',
  'MAX_NUMBER_RETRIES'
);
