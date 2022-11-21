import { RpcAggregatorWrapper } from './RpcAggregatorWrapper/index.js';
import { Config } from './RpcAggregatorWrapper/types.js';

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
      {
        chainId: ChainId.POLY,
        url: 'https://matic-mainnet.chainstacklabs.com',
        archival: false,
      },
    ],
    [ChainId.ETH]: [
      {
        chainId: ChainId.ETH,
        url: 'https://rpc.ankr.com/eth',
        archival: false,
      },
    ],
  },
  logger: console,
};

const address = '0xC16C4b31df64eE44Ec59D57eAe0aBF92dFF9b025';

const main = async () => {
  const rpcWrapper = new RpcAggregatorWrapper(config);
  const provider = rpcWrapper.getProvider(ChainId.POLY);
  const balance = await provider.getBalance(address);
  console.log(balance.toBigInt());
};

main();
