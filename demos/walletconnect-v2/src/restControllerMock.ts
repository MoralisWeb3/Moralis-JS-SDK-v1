import Moralis from 'moralis-v1';

export function mockRestController() {
  const coreManager = Moralis.CoreManager as any;
  coreManager.setRESTController({
    ajax: () => {
      throw new Error('Ajax method is not implemented');
    },
    request: (method: string, url: string) => {
      if (method === 'POST' && url === 'functions/getServerTime') {
        return Promise.resolve({
          result: null,
        });
      }
      if (method === 'POST' && url === 'users') {
        return Promise.resolve({
          objectId: 'avjpyyGyTv',
          username: 'ufkqI8YAOU0j5Vxe4DA3OVezB',
          authData: {
            moralisEth: {
              id: '0x0000000000000000000000000000000000000000',
              signature:
                '0x747ce02e04cc0be6a152a4538c36012f33670efc318ad2c1233736287befc70475e7abd59c78cb160b3f2be139684f5c120a0572a70a0e74a8ab77c38b002c421b',
              data: 'localhost wants you to sign in with your Ethereum account:\n0x0000000000000000000000000000000000000000\n\nPlease sign this message to confirm your identity.\n\nURI: http://localhost:1337/server\nVersion: 1\nChain ID: 43113\nNonce: SHJmhvrdyAKDU3JKs\nIssued At: 2023-05-22T11:08:59.087Z\nExpiration Time: 2023-05-22T11:23:57.921Z\nNot Before: 2023-05-22T11:08:57.921Z',
              chainId: 43113,
              nonce: 'SHJmhvrdyAKDU3JKs',
              address: '0x0000000000000000000000000000000000000000',
              version: '1',
              domain: 'localhost',
              expirationTime: '2023-05-22T11:23:57.921Z',
              notBefore: '2023-05-22T11:08:57.921Z',
              statement: 'Please sign this message to confirm your identity.',
              uri: 'http://localhost:1337/server',
              moralisProfileId:
                '0xe1d137504f66d84c1382f9c8d585f5b343aba4adac544fb44066f6edf1953cd3',
            },
          },
          createdAt: '2023-01-06T09:28:42.978Z',
          updatedAt: '2023-01-06T09:28:43.984Z',
          accounts: ['0x0000000000000000000000000000000000000000'],
          ethAddress: '0x0000000000000000000000000000000000000000',
          ACL: { avjpyyGyTv: { read: true, write: true } },
          sessionToken: 'r:eaad095c6348d73ee7379af0b089b283',
        });
      }
      if (method === 'PUT' && url.startsWith('classes/_User/')) {
        return Promise.resolve({
          accounts: ['0x0000000000000000000000000000000000000000'],
          updatedAt: '2023-05-22T11:12:52.738Z',
        });
      }
      if (method === 'POST' && url === 'logout') {
        return Promise.resolve({});
      }
      throw new Error(`Not supported request: ${method} ${url}`);
    },
  });
}
