import { AppController, AppFooter, AppHeader } from 'containers';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { profileSelector } from 'reducers/profileSlice';
import { publicRoute } from 'routes';

const PublicLayout = () => {
  const location = useLocation();
  const { isLoggedIn } = useSelector(profileSelector);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <main className='overflow-hidden'>
      <AppHeader />
      <div style={{ minHeight: `calc(100vh - 80px - 64px)` }}>
        <AppController>
          <Routes>
            {Object.values(publicRoute)
              .filter(({ requiredLogin }: any) => !requiredLogin || isLoggedIn)
              .map(({ path, component: Element }) => (
                <Route key={path} path={path} element={<Element />} />
              ))}
            <Route path='*' element={<Navigate to={publicRoute.home.path} />} />
          </Routes>
        </AppController>
      </div>
      <AppFooter />
    </main>
  );
};

export default PublicLayout;
