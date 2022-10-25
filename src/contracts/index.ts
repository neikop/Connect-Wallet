import { APP_NETWORK } from 'components/NetworkBar';
import { default as Web3 } from 'web3';
import { AbiItem } from 'web3-utils';
import BoxAbi from './abis/Boxes.json';
import BoxOpenAbi from './abis/BoxOpen.json';
import ERC20 from './abis/ERC20.json';
import ERC721 from './abis/ERC721.json';
import MarketAbi from './abis/Market.json';

export const web3 = new Web3(Web3.givenProvider ?? new Web3.providers.HttpProvider(APP_NETWORK.rpcUrls[0]));

export const boxContract = (address: Address) => new web3.eth.Contract(BoxAbi as AbiItem[], address);
export const boxOpenContract = (address: Address) => new web3.eth.Contract(BoxOpenAbi as AbiItem[], address);
export const erc20Contract = (address: Address) => new web3.eth.Contract(ERC20.abi as AbiItem[], address);
export const erc721Contract = (address: Address) => new web3.eth.Contract(ERC721.abi as AbiItem[], address);
export const marketContract = (address: Address) => new web3.eth.Contract(MarketAbi as AbiItem[], address);
