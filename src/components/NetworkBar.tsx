import { Avatar, Button, CircularProgress, Dialog, DialogContent, Typography } from '@mui/material';
import { CHAIN_ID } from 'env';
import { useValidNetwork } from 'hooks';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { networkSelector } from 'reducers/networkSlice';
import Web3 from 'web3';

const isMobile = () => {
  const mobiles = [/Android/i, /webOS/i, /iPhone/i, /iPad/i, /iPod/i, /BlackBerry/i, /Windows Phone/i];
  return mobiles.some((matches) => navigator.userAgent.match(matches));
};

const TESTNET = {
  chainName: 'BNB Testnet',
  chainId: '0x61',
  nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
  rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545'],
  blockExplorerUrls: ['https://testnet.bscscan.com'],
};

const MAINNET = {
  chainName: 'BNB Smart Chain',
  chainId: '0x38',
  nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
  rpcUrls: ['https://bsc-dataseed.binance.org'],
  blockExplorerUrls: ['https://bscscan.com'],
};

export const APP_NETWORK = CHAIN_ID === '97' ? TESTNET : MAINNET;

type NetworkBarProps = {
  required?: boolean;
};

const NetworkBar = ({ required }: NetworkBarProps) => {
  const { network } = useValidNetwork();
  const { onOpen } = useSelector(networkSelector);

  const [chainId, setChainId] = useState(window.ethereum?.chainId);
  const [isOpenSwitch, setOpenSwitch] = useState(false);

  const handleSwitchNetwork = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: network.chainId }],
      });
    } catch (error: any) {
      if (error.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [network],
        });
      }
    }
  };

  const lastUpdate = useRef(onOpen);

  useEffect(() => {
    if (onOpen && lastUpdate.current !== onOpen) {
      lastUpdate.current = onOpen;
      setOpenSwitch(true);
    } else {
      setOpenSwitch(false);
    }
  }, [onOpen]);

  useEffect(() => {
    window.ethereum?.on('chainChanged', (chainId: string) => {
      setChainId(chainId);
      setOpenSwitch(false);
    });
  }, []);

  return (
    <div hidden={isMobile()}>
      <Dialog
        open={required ? chainId !== APP_NETWORK.chainId && !!Web3.givenProvider : isOpenSwitch}
        onClose={() => setOpenSwitch(false)}
      >
        <DialogContent className='px-16 py-6'>
          <div className='flex flex-col items-center'>
            <CircularProgress color='secondary' />
            <div className='text-center my-6'>
              <Typography variant='h5'>Wrong Network</Typography>
              <Typography>Please switch network to continue</Typography>
            </div>
            <Button
              color='primary'
              startIcon={<Avatar variant='square' src={require('assets/icons/MetaMask.png')} />}
              onClick={handleSwitchNetwork}
            >
              {network.chainName}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NetworkBar;
