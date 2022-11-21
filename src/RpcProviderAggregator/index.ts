import { BigNumber, ethers } from 'ethers';
import { RpcProviderConfig } from '../RpcProvider/types.js';
import { Logger } from '../Logger/index.js';
import { GenericLogger } from '../Logger/types.js';
import { RpcProvider } from '../RpcProvider/index.js';
import { MAX_NUMBER_RETRIES_ERROR } from '../Errors/rpcProvider.js';

export class RpcProviderAggregator {
  private readonly logger: Logger<GenericLogger>;

  private readonly maxRetries: number;
  private readonly archival: boolean;

  private readonly providerConfigs: RpcProviderConfig[];
  private readonly providers: RpcProvider[] = [];
  private readonly archivalProviders: RpcProvider[] = [];

  constructor(
    configs: RpcProviderConfig[],
    maxRetries: number,
    logger: GenericLogger,
    archival: boolean
  ) {
    this.providerConfigs = configs;
    this.maxRetries = maxRetries;
    this.logger = logger;
    this.archival = archival;
    this.initializeProviders();
  }

  private initializeProviders() {
    this.providerConfigs.forEach((config) => {
      const rpcProvider = new RpcProvider(config, this.logger);
      if (config.archival) {
        this.archivalProviders.push(rpcProvider);
      } else {
        this.providers.push(rpcProvider);
      }
    });
  }

  async getBalance(
    addressOrName: string | Promise<string>,
    blockTag?: ethers.providers.BlockTag | Promise<ethers.providers.BlockTag>
  ): Promise<BigNumber> {
    let errors = [];
    const selectedProviders = this.archival
      ? this.archivalProviders
      : this.providers;

    for (let i = 0; i < selectedProviders.length; i++) {
      try {
        const balance = await selectedProviders[i].getBalanceAgg(addressOrName);
        return balance;
      } catch (error) {
        errors.push(error);
        this.logger.error(
          `(ERROR) Failed executing getBalance: x${errors.length}`
        );
        if (errors.length === this.maxRetries) throw MAX_NUMBER_RETRIES_ERROR;
      }
    }
    return BigNumber.from(0);
  }
}
