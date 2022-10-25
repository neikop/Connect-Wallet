import { APP_NETWORK } from 'components/NetworkBar';
import { web3 } from 'contracts';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { openSwitchNetwork } from 'reducers/networkSlice';

const useValidNetwork = () => {
  const dispatch = useDispatch();

  const validNetwork = useCallback(
    async (callback?: any) => {
      try {
        await web3.eth.requestAccounts();
      } catch {
        await web3.eth.getAccounts();
      }

      const chainId = window.ethereum?.chainId;
      const isWrongNetwork = chainId && APP_NETWORK && chainId !== APP_NETWORK.chainId;
      if (isWrongNetwork) {
        dispatch(openSwitchNetwork(APP_NETWORK));
      } else {
        callback?.();
      }
    },
    [dispatch],
  );

  return { network: APP_NETWORK, validNetwork };
};

export default useValidNetwork;
