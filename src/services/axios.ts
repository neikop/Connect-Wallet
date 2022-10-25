import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { APP_API } from 'env';
import { camelizeKeys } from 'humps';
import { openAlert } from 'reducers/notificationSlice';
import { signOut } from 'reducers/profileSlice';
import { store } from 'reducers/store';

const beforeRequest = (config: AxiosRequestConfig) => {
  const { isLoggedIn, accessToken }: ProfileType = store.getState().profile;
  if (isLoggedIn) {
    Object.assign(config.headers as any, { Authorization: `Bearer ${accessToken}` });
  }
  try {
    if (config.data instanceof FormData) {
      Object.assign(config.headers as any, { 'Content-Type': 'multipart/form-data' });
    }
  } catch {}
  return config;
};

const onError = async (error: AxiosError) => {
  const { response } = error;
  if (response) {
    const { status } = response;
    if (status === 401) {
      store.dispatch(signOut({}));
    } else {
      store.dispatch(openAlert({ message: 'Unexpected error occurred', variant: 'error' }));
    }
  }
  return Promise.reject(error);
};

const client = axios.create({ baseURL: APP_API });
client.interceptors.request.use(beforeRequest);
client.interceptors.response.use(({ data }) => data.data, onError);

client.defaults.transformResponse = [...(axios.defaults.transformResponse as []), (data) => camelizeKeys(data)];

export { client };
