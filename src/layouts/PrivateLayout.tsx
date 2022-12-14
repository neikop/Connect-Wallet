import { Typography } from '@mui/material';
import { AppHeader } from 'containers';
import { useWindowSize } from 'hooks';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { profileSelector } from 'reducers/profileSlice';
import { privateRoute } from 'routes';

const PrivateLayout = () => {
  const { isMobile } = useWindowSize();
  const { isLoggedIn } = useSelector(profileSelector);

  return (
    <main style={{ marginLeft: isMobile ? '0' : '280px' }}>
      <AppHeader />
      <div className='sm:px-6 px-4 py-4 pt-8'>
        {!isLoggedIn ? (
          <div className='flex flex-col items-center gap-3 py-10'>
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
  );
};

export default PrivateLayout;
