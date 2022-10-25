import { Button, Typography } from '@mui/material';
import { AppHeader } from 'containers';
import { useWindowSize } from 'hooks';
import useNotification from 'hooks/useNotification';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { profileSelector } from 'reducers/profileSlice';
import { privateRoute } from 'routes';
import { walletService } from 'services';

const PrivateLayout = () => {
  useNotification();

  const { isMobile } = useWindowSize();
  const { isLoggedIn } = useSelector(profileSelector);

  return (
    <div>
      <main style={{ marginLeft: isMobile ? '0' : '280px' }}>
        <AppHeader />
        <div className='sm:px-6 px-4 py-4 pt-8'>
          {!isLoggedIn ? (
            <div className='flex flex-col items-center gap-3 py-10'>
              <Button variant='outlined' onClick={() => walletService.connectWallet()}>
                Connect Wallet
              </Button>
              <Typography>Please connect wallet to continue as an Administrator</Typography>
            </div>
          ) : (
            <Routes>
              {Object.values(privateRoute).map(({ path, component: Element }) => (
                <Route key={path} path={path} element={<Element />} />
              ))}
              <Route path='/*' element={<Navigate to={privateRoute.home.path} />} />
            </Routes>
          )}
        </div>
      </main>
    </div>
  );
};

export default PrivateLayout;
