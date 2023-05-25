/* global window */
import verifyChainId from '../utils/verifyChainId';
import AbstractWeb3Connector from './AbstractWeb3Connector';
import { getMoralisRpcs } from './MoralisRpcs';

export const WalletConnectEvent = Object.freeze({
  ACCOUNTS_CHANGED: 'accountsChanged',
  CHAIN_CHANGED: 'chainChanged',
  DISCONNECT: 'disconnect',
});

/**
 * Connector to connect an WalletConenct provider to Moralis
 * Note: this assumes using WalletConnect v2
 */

class WalletConnectWeb3Connector extends AbstractWeb3Connector {
  type = 'WalletConnect';

  async activate({ projectId, chainId: providedChainId, qrModalOptions, newSession, rpcMap } = {}) {
    if (!projectId) {
      throw new Error('WalletConnect requires projectId');
    }

    // Log out of any previous sessions
    if (newSession) {
      this.cleanup();
    }

    if (!this.provider) {
      const rpcs = rpcMap || getMoralisRpcs('WalletConnect');

      const config = {
        projectId,
        chains: [providedChainId ? Number(providedChainId) : 1],
        showQrModal: true,
        rpcMap: rpcs,
        qrModalOptions,
      };

      let WalletConnectProvider;
      try {
        WalletConnectProvider = require('@walletconnect/ethereum-provider')?.EthereumProvider;
      } catch (error) {
        // Do nothing. User might not need walletconnect
      }

      if (!WalletConnectProvider) {
        WalletConnectProvider = window?.WalletConnectProvider?.EthereumProvider;
      }

      if (!WalletConnectProvider) {
        throw new Error(
          'Cannot enable via WalletConnect: dependency "@walletconnect/ethereum-provider" is missing'
        );
      }

      this.provider = await WalletConnectProvider.init(config);
    }

    if (!this.provider) {
      throw new Error('Could not connect via WalletConnect, error in connecting to provider');
    }

    const accounts = await this.provider.enable();
    const account = accounts[0].toLowerCase();
    const { chainId } = this.provider;
    const verifiedChainId = verifyChainId(chainId);

    this.account = account;
    this.chainId = verifiedChainId;

    this.subscribeToEvents(this.provider);

    return { provider: this.provider, account, chainId: verifiedChainId };
  }

  // Cleanup old sessions
  cleanup() {
    try {
      if (window) {
        Object.keys(window.localStorage).forEach(key => {
          if (key.startsWith('wc@')) {
            window.localStorage.removeItem(key);
          }
        });
      }
    } catch (error) {
      // Do nothing
    }
  }

  async deactivate() {
    this.unsubscribeToEvents(this.provider);

    if (this.provider) {
      try {
        await this.provider.close();
      } catch {
        // Do nothing
      }
    }

    this.account = null;
    this.chainId = null;
    this.provider = null;
  }
}

export default WalletConnectWeb3Connector;
