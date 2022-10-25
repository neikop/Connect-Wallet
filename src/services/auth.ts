import { client } from './axios';

const getNonce = (params: GetNonceType): Promise<GetNonceData> => client.get(`/api/auth/nonce`, { params });
const getToken = (body: GetTokenType): Promise<GetTokenData> => client.post(`/api/auth/token`, body);

export default {
  getNonce,
  getToken,
};
