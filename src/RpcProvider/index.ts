import { BigNumber, ethers } from 'ethers';
import { Logger } from '../Logger/index.js';
import { GenericLogger } from '../Logger/types.js';
import { RpcProviderConfig } from './types.js';

export class RpcProvider extends ethers.providers.JsonRpcProvider {
  private readonly logger: Logger<GenericLogger>;

  constructor(config: RpcProviderConfig, logger: GenericLogger) {
    super(config.url);
    this.logger = logger;
  }

  async getBalanceAgg(
    addressOrName: string | Promise<string>,
    blockTag?: ethers.providers.BlockTag | Promise<ethers.providers.BlockTag>
  ): Promise<BigNumber> {
    this.logger.info(
      `(INFO) Executing getBalance of address: ${addressOrName}`
    );
    return this.getBalance(addressOrName, blockTag);
  }
}
