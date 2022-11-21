import { RPCError } from '../../src/Errors/index.js';
import { Config } from '../../src/RpcAggregatorWrapper/types.js';
import { RpcProviderAggregator } from '../../src/RpcProviderAggregator/index.js';

describe('Scenario: RpcProviderAggregator', () => {
  const ChainId = {
    ETH: 1,
    POLY: 137,
  };
  const address = '0xC16C4b31df64eE44Ec59D57eAe0aBF92dFF9b025';

  const successConfig: Config = {
    maxRetries: 3,
    rpcConfig: {
      [ChainId.POLY]: [
        {
          chainId: ChainId.POLY,
          url: 'https://polygon-rpc.com',
          archival: false,
        },
        {
          chainId: ChainId.POLY,
          url: 'https://matic-mainnet.chainstacklabs.com',
          archival: false,
        },
      ],
    },
    logger: console,
  };

  const failedConfig: Config = {
    maxRetries: 1,
    rpcConfig: {
      [ChainId.POLY]: [
        {
          chainId: ChainId.POLY,
          url: 'https://polpzxv.com',
          archival: false,
        },
        {
          chainId: ChainId.POLY,
          url: 'https://matic-mainnet.chainstacklabs.com',
          archival: false,
        },
      ],
    },
    logger: console,
  };

  const successProviderAggregator = new RpcProviderAggregator(
    successConfig.rpcConfig[ChainId.POLY],
    successConfig.maxRetries,
    console,
    false
  );

  const failProviderAggregator = new RpcProviderAggregator(
    failedConfig.rpcConfig[ChainId.POLY],
    failedConfig.maxRetries,
    console,
    false
  );

  describe('When: the getBalance is succesful', () => {
    test('should return the balance of the address', async () => {
      const balance = await successProviderAggregator.getBalance(address);
      expect(balance.toBigInt()).toBeGreaterThan(0);
    });
  });
  describe('When: the getBalance exceeds number of retries', () => {
    test('should throw an error', async () => {
      let err;
      try {
        await failProviderAggregator.getBalance(address);
      } catch (error) {
        err = error as RPCError;
      }
      expect(err?.message).toBe('The number of retries is exceded.');
    });
  });
});
