import Moralis from 'moralis-v1';
import { providers } from 'ethers';
import { EthereumProvider } from '@walletconnect/ethereum-provider';
import { mockRestController } from './restControllerMock';
import { erc20Abi } from './erc20abi';

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
  const chainId = 1;
  const user = await Moralis.authenticate({
    newSession: true,
    provider: 'walletconnect',
    chainId,
    projectId: WALLET_CONNECT_PROJECT_ID,
    rpcMap: {
      '1': `https://rpc.walletconnect.com/v1/?chainId=eip155:${chainId}&projectId=${WALLET_CONNECT_PROJECT_ID}`,
    },
    qrModalOptions: {
      themeMode: 'light',
    },
  });
  console.log('user', user);

  const contractName = await Moralis.executeFunction({
    abi: erc20Abi,
    contractAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    functionName: 'name',
  });
  console.log('contractName', contractName);

  setResult(`username: ${user.getUsername()}, contractName: ${contractName}`);
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
