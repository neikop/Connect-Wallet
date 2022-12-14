import { QueryClientProvider } from '@tanstack/react-query';
import { AppTheme } from 'containers';
import { default as jwtDecode } from 'jwt-decode';
import { SnackbarProvider } from 'notistack';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { signIn, signOut } from 'reducers/profileSlice';
import { queryClient, walletService } from 'services';

type ContainerType = {
  children: React.ReactNode;
};

const Container = ({ children }: ContainerType) => {
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

  return (
    <SnackbarProvider
      preventDuplicate={false}
      autoHideDuration={3000}
      variant='success'
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <QueryClientProvider client={queryClient}>
        <AppTheme>{children}</AppTheme>
      </QueryClientProvider>
    </SnackbarProvider>
  );
};

export default Container;
