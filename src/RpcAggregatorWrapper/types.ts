import { GenericLogger } from '../Logger/types.js';
import { RpcProviderConfig } from '../RpcProvider/types.js';

export interface Config {
  rpcConfig: {
    [chainId: number]: RpcProviderConfig[];
  };
  maxRetries: number;
  logger?: GenericLogger;
}
