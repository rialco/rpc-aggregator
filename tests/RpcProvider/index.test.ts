import { RpcProvider } from '../../src/RpcProvider/index.js';

describe('Scenario: RpcProvider', () => {
  const address = '0xC16C4b31df64eE44Ec59D57eAe0aBF92dFF9b025';
  const succesfulProvider = new RpcProvider(
    { url: 'https://polygon-rpc.com', archival: false, chainId: 137 },
    console
  );
  const failProvider = new RpcProvider(
    { url: 'https://polygon-rp.com', archival: false, chainId: 137 },
    console
  );

  describe('Scenario: getBalanceAgg', () => {
    describe('When: getBalance is successful', () => {
      test('Should return a number in ther result', async () => {
        const result = await succesfulProvider.getBalanceAgg(address);
        expect(result).toBeDefined();
      });
    });
    describe('When: getBalance is unsuccessful', () => {
      test('Should throw an error', async () => {
        let err;
        try {
          await failProvider.getBalanceAgg(address);
        } catch (error) {
          err = error;
        }
        expect(err).toBeDefined();
      });
    });
  });
});
