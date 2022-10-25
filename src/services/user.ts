import { client } from './axios';

const getUserProfile = ({ address }: { address: string }): Promise<UserType> => client.get(`/api/profile/${address}`);
const getProfile = (): Promise<UserType> => client.get(`/api/profile`);

export default {
  getUserProfile,
  getProfile,
};
