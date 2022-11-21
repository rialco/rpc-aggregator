import { RpcAggregatorWrapper } from '../../src/RpcAggregatorWrapper/index.js';
import { Config } from '../../src/RpcAggregatorWrapper/types.js';

describe('Scenario: RpcAggregatorWrapper', () => {
  const ChainId = {
    ETH: 1,
    POLY: 137,
  };

  const config: Config = {
    maxRetries: 3,
    rpcConfig: {
      [ChainId.POLY]: [
        {
          chainId: ChainId.POLY,
          url: 'https://polygon-rp.com',
          archival: false,
        },
      ],
    },
    logger: console,
  };

  const rpcWrapper = new RpcAggregatorWrapper(config);

  describe('Scenario: getProvider', () => {
    describe('When: getProvider is successful', () => {
      test('Should return a valid rpc provider object', async () => {
        const provider = rpcWrapper.getProvider(ChainId.POLY);
        expect(provider).toBeDefined();
      });
    });
    describe('When: getProvider is unsuccessful', () => {
      test('Should throw an error', async () => {
        let err;
        try {
          rpcWrapper.getProvider(2);
        } catch (error) {
          err = error;
        }
        expect(err).toBeDefined();
      });
    });
  });
});
