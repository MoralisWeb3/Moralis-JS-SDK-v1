import Moralis from 'moralis-v1';
import { providers } from 'ethers';
import { EthereumProvider } from '@walletconnect/ethereum-provider';
import { mockRestController } from './restControllerMock';

const WALLET_CONNECT_PROJECT_ID = process.env.WALLET_CONNECT_PROJECT_ID as string;

document.addEventListener(
  'DOMContentLoaded',
  () => {
    Moralis.initialize('APPLICATION_ID');

    // This demo does not use Moralis server, so we mock it.
    mockRestController();

    document
      .getElementById('connectWithMoralis')!
      .addEventListener('click', connectWithMoralis, false);
    document.getElementById('connect')!.addEventListener('click', connect, false);
  },
  false
);

function setResult(value: string) {
  document.getElementById('result')!.innerHTML = value;
}

async function connectWithMoralis() {
  const result = await Moralis.authenticate({
    newSession: true,
    provider: 'walletconnect',
    chainId: 1,
    projectId: WALLET_CONNECT_PROJECT_ID,
    qrModalOptions: {
      themeMode: 'light',
    },
  });
  console.log('result', result);
  setResult(`username: ${result.getUsername()}`);
}

async function connect() {
  const provider = await EthereumProvider.init({
    projectId: WALLET_CONNECT_PROJECT_ID,
    chains: [1],
    showQrModal: true,
    qrModalOptions: {
      themeMode: 'light',
    },
  });
  await provider.enable();
  console.log('accounts', provider.accounts);

  const web3Provider = new providers.Web3Provider(provider);
  const signedMessage = await web3Provider.getSigner().signMessage('test message');

  setResult(`signed message: ${signedMessage.substring(0, 10)}...`);
}
