import { Avatar, Container } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router-dom';
import { profileRoute } from 'routes';
import { ProfileMenu } from 'views/Profile';

const ProfileScreen = () => {
  return (
    <Container className='flex items-stretch'>
      <div className='w-[260px]'>
        <div className='flex justify-center py-8'>
          <Avatar
            variant='rounded'
            src={require('assets/images/avatar.png')}
            className='w-[140px] h-[140px] border border-primary-main shadow-card'
          />
        </div>
        <div>
          <ProfileMenu />
        </div>
      </div>
      <div className='flex-1 px-10 py-6'>
        <Routes>
          {Object.values(profileRoute).map(({ path, component: Element }) => (
            <Route key={path} path={path} element={<Element />} />
          ))}
          <Route path='*' element={<Navigate to={profileRoute.profile.url} />} />
        </Routes>
      </div>
    </Container>
  );
};

export default ProfileScreen;
