import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3 from 'web3';
import Web3Modal from 'web3modal';

const web3 = new Web3();

const connectProvider = async () => {
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        rpc: [],
      },
    },
  };
  const web3Modal = new Web3Modal({
    providerOptions,
    theme: 'dark',
    cacheProvider: false,
  });

  const provider = Web3.givenProvider || (await web3Modal.connect());

  web3.setProvider(provider);
};

const connectWallet = async () => {
  try {
    await connectProvider();
    let address;
    try {
      [address] = await web3.eth.requestAccounts();
    } catch {
      [address] = await web3.eth.getAccounts();
    }
    address = web3.utils.toChecksumAddress(address);

    console.log(address);
  } catch (error) {
    console.warn(error);
  }
};

export default {
  connectProvider,
  connectWallet,
};
