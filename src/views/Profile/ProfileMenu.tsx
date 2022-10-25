import { ListItemButton, styled } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { profileRoute } from 'routes';

const StyledListItem = styled(ListItemButton)({
  whiteSpace: 'nowrap',
  height: '100%',
  padding: '12px 40px',
  '&:hover': {
    background: 'linear-gradient(270deg, #FB4467 0%, rgba(0, 0, 0, 0) 100%) !important',
  },
  '&.Mui-selected': {
    background: 'linear-gradient(270deg, #FB4467 0%, rgba(0, 0, 0, 0) 100%) !important',
  },
});

const NavItem = ({ url: path, name }: { url: string; name: string }) => {
  const { pathname } = useLocation();
  const isHome = path === '/profile';
  return (
    <Link to={path}>
      <StyledListItem selected={isHome ? pathname === path : pathname.startsWith(path)}>{name}</StyledListItem>
    </Link>
  );
};

const ProfileMenu = () => {
  const { profile, inventory } = profileRoute;
  return (
    <div className='flex flex-col items-stretch gap-[4px] mt-[12px]'>
      <NavItem {...profile} />
      <NavItem {...inventory} />
    </div>
  );
};

export default ProfileMenu;
