import Moralis from 'moralis-v1';
import '@walletconnect/web3-provider';

document.addEventListener('DOMContentLoaded', () => {
  Moralis.initialize("APPLICATION_ID");

  document.getElementById('connectWalletConnect')?.addEventListener('click', connectWalletConnect, false);
}, false);

async function connectWalletConnect() {
  await Moralis.authenticate({
    provider: 'walletconnect'
  });
}
