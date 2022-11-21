import { RPCError } from './index.js';

export const INVALID_CHAIN_ID_ERROR = new RPCError(
  'The chain id is not in the initial config object.',
  'INVALID_CHAIN_ID'
);
