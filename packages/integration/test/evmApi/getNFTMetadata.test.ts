import Core from '@moralisweb3/core';
import EvmApi from '@moralisweb3/evm-api';
import { MOCK_API_KEY } from '../../mockRequests/config';
import { mockServer } from '../../mockRequests/mockRequests';

describe('Moralis EvmApi', () => {
  const server = mockServer;

  beforeAll(() => {
    Core.registerModules([EvmApi]);
    Core.start({
      apiKey: MOCK_API_KEY,
    });

    server.listen({
      onUnhandledRequest: 'warn',
    });
  });

  afterAll(() => {
    server.close();
  });

  it('should get the NFT metadata of an account', async () => {
    const result = await EvmApi.token.getNFTMetadata({
      address: '0x7de3085b3190b3a787822ee16f23be010f5f8686',
    });

    expect(result).toBeDefined();
    expect(result.legacy.symbol).toBe('BAMC');
    expect(result).toEqual(expect.objectContaining({}));
  });

  it('should not get the NFT metadata of an invalid account and throw an error ', async () => {
    const failedResult = await EvmApi.token
      .getNFTMetadata({
        address: '0x7de3085b3190b3a787822ee16f23be010f5f868',
      })
      .then()
      .catch((err) => {
        return err;
      });

    expect(failedResult).toBeDefined();
    expect(
      EvmApi.token.getNFTMetadata({
        address: '0x7de3085b3190b3a787822ee16f23be010f5f868',
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"[C0005] Invalid address provided"`);
  });
});