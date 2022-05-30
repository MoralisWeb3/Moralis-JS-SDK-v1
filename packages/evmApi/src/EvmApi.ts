import core, { ApiModule } from '@moralisweb3/core';
import {
  getTokenAllowanceResolver,
  getTokenPriceResolver,
  reSyncMetadataResolver,
  getNFTLowestPriceResolver,
  getContractNFTTransfersResolver,
  getWalletTokenIdTransfersResolver,
  getNFTTradesResolver,
  getTokenAddressTransfersResolver,
  getNftTransfersFromToBlockResolver,
  getTokenMetadataResolver,
  getAllTokenIdsResolver,
  searchNFTsResolver,
  getNFTOwnersResolver,
  getTokenIdOwnersResolver,
  getTokenIdMetadataResolver,
  getTokenMetadataBySymbolResolver,
  getNFTMetadataResolver,
} from './resolvers/token';
import { getPairReservesResolver } from './resolvers/defi';
import { resolveAddressResolver, resolveDomainResolver } from './resolvers/resolve';
import {
  getTokenBalancesResolver,
  getNativeBalanceResolver,
  getNFTTransfersResolver,
  getTransactionsResolver,
  getTokenTransfersResolver,
  getNFTsResolver,
  getNFTsForContractResolver,
} from './resolvers/account';
import {
  getBlockResolver,
  getDateToBlockResolver,
  runContractFunctionResolver,
  getLogsByAddressResolver,
  getTransactionResolver,
  getNFTTransfersByBlockResolver,
} from './resolvers/native';
import { web3ApiVersionResolver, endpointWeightsResolver } from './resolvers/info';

export const BASE_URL = 'https://deep-index.moralis.io/api/v2';
export class MoralisEvmApi extends ApiModule {
  constructor() {
    super({
      name: 'evmApi',
      core,
      baseUrl: BASE_URL,
    });
  }

  get native() {
    return {
      runContractFunction: runContractFunctionResolver.fetch,
      getBlock: getBlockResolver.fetch,
      getDateToBlock: getDateToBlockResolver.fetch,
      getTransaction: getTransactionResolver.fetch,
      getLogsByAddress: getLogsByAddressResolver.fetch,
      getNFTTransfersByBlock: getNFTTransfersByBlockResolver.fetch,
    };
  }
  get account() {
    return {
      getTokenBalances: getTokenBalancesResolver.fetch,
      getNativeBalance: getNativeBalanceResolver.fetch,
      getNFTTransfers: getNFTTransfersResolver.fetch,
      getTokenTransfers: getTokenTransfersResolver.fetch,
      getTransactions: getTransactionsResolver.fetch,
      getNFTs: getNFTsResolver.fetch,
      getNFTsForContract: getNFTsForContractResolver.fetch,
    };
  }
  get resolve() {
    return {
      resolveDomain: resolveDomainResolver.fetch,
      resolveAddress: resolveAddressResolver.fetch,
    };
  }
  get defi() {
    return {
      getPairReserves: getPairReservesResolver.fetch,
    };
  }
  get token() {
    return {
      reSyncMetadata: reSyncMetadataResolver.fetch,
      getTokenPrice: getTokenPriceResolver.fetch,
      getTokenAllowance: getTokenAllowanceResolver.fetch,
      getContractNFTTransfers: getContractNFTTransfersResolver.fetch,
      getNftTransfersFromToBlock: getNftTransfersFromToBlockResolver.fetch,
      getTokenAddressTransfers: getTokenAddressTransfersResolver.fetch,
      getNFTTrades: getNFTTradesResolver.fetch,
      getNFTLowestPrice: getNFTLowestPriceResolver.fetch,
      getWalletTokenIdTransfers: getWalletTokenIdTransfersResolver.fetch,
      getTokenMetadataBySymbol: getTokenMetadataBySymbolResolver.fetch,
      getTokenMetadata: getTokenMetadataResolver.fetch,
      getAllTokenIds: getAllTokenIdsResolver.fetch,
      searchNFTs: searchNFTsResolver.fetch,
      getNFTOwners: getNFTOwnersResolver.fetch,
      getTokenIdOwners: getTokenIdOwnersResolver.fetch,
      getTokenIdMetadata: getTokenIdMetadataResolver.fetch,
      getNFTMetadata: getNFTMetadataResolver.fetch,
    };
  }
  get info() {
    return {
      web3ApiVersion: web3ApiVersionResolver.fetch,
      endpointWeights: endpointWeightsResolver.fetch,
    };
  }
}

const moralisEvmApi = new MoralisEvmApi();
export default moralisEvmApi;