import { useNotification } from 'hooks';
import { default as jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { signIn, signOut } from 'reducers/profileSlice';
import { walletService } from 'services';

const Controller = ({ children }: any) => {
  useNotification();
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const profile = JSON.parse(localStorage.getItem('profile')!);
      const { exp } = jwtDecode(profile.accessToken) as any;
      if (Date.now() / 1000 < exp - 600) {
        dispatch(signIn(profile));
        walletService.connectProvider();
      }
    } catch {
      dispatch(signOut({}));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
};

export default Controller;
