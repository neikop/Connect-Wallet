import { web3 } from 'contracts';

export async function signOnClient({ name, verifyingContract, primaryType, message, sender }) {
  const msgParams = JSON.stringify({
    domain: {
      version: '1',
      chainId: await web3.eth.getChainId(),
      name,
      verifyingContract,
    },
    primaryType,
    message,
    types: {
      EIP712Domain: [
        { name: 'name', type: 'string' },
        { name: 'version', type: 'string' },
        { name: 'chainId', type: 'uint256' },
        { name: 'verifyingContract', type: 'address' },
      ],
      Mint: [
        { name: 'nft', type: 'address' },
        { name: 'minter', type: 'address' },
        { name: 'to', type: 'address' },
        { name: 'tokenId', type: 'uint256' },
      ],
      MintMultiple: [
        { name: 'nft', type: 'address' },
        { name: 'minter', type: 'address' },
        { name: 'to', type: 'address' },
        { name: 'tokenIds', type: 'uint256[]' },
      ],
      Offer: [
        { name: 'saleId', type: 'uint256' },
        { name: 'nft', type: 'address' },
        { name: 'tokenId', type: 'uint256' },
        { name: 'paymentToken', type: 'address' },
        { name: 'price', type: 'uint256' },
        { name: 'seller', type: 'address' },
      ],
    },
  });

  return web3.currentProvider.request({
    method: 'eth_signTypedData_v4',
    params: [sender, msgParams],
  });
}
