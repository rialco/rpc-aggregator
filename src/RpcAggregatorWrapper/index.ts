import { Logger } from '../Logger/index.js';
import { GenericLogger } from '../Logger/types.js';
import { RpcProviderAggregator } from '../RpcProviderAggregator/index.js';
import { RpcProviderConfig } from '../RpcProvider/types.js';
import { Config } from './types.js';
import { INVALID_CHAIN_ID_ERROR } from '../Errors/rpcAggregatorWrapper.js';

export class RpcAggregatorWrapper {
  private readonly maxRetries: number;
  private readonly logger: GenericLogger;
  private readonly rpcConfig: Record<number, RpcProviderConfig[]>;

  constructor(config: Config) {
    this.maxRetries = config.maxRetries;
    this.rpcConfig = config.rpcConfig;
    this.logger = new Logger(config.logger);
  }

  getProvider(
    chainId: number,
    archival: boolean = false
  ): RpcProviderAggregator {
    if (!this.rpcConfig[chainId]) throw INVALID_CHAIN_ID_ERROR;

    const aggregator = new RpcProviderAggregator(
      this.rpcConfig[chainId],
      this.maxRetries,
      this.logger,
      archival
    );

    return aggregator;
  }
}
