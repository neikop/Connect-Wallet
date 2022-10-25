import { ListItemButton } from '@mui/material';
import { styled } from '@mui/system';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { profileSelector } from 'reducers/profileSlice';
import { profileRoute, publicRoute } from 'routes';

const StyledListItem = styled(ListItemButton)({
  whiteSpace: 'nowrap',
  height: '100%',
  fontWeight: 700,
  padding: '12px 40px',
  '&:hover': {
    background: 'linear-gradient(0deg, #FB4467 0%, rgba(0, 0, 0, 0) 100%) !important',
  },
  '&.Mui-selected': {
    background: 'linear-gradient(0deg, #FB4467 0%, rgba(0, 0, 0, 0) 100%) !important',
  },
});

const NavItem = ({ path, name }: { path: string; name: string }) => {
  const { pathname } = useLocation();
  const isHome = path === '/';
  return (
    <Link to={path}>
      <StyledListItem selected={isHome ? pathname === path : pathname.startsWith(path)}>{name}</StyledListItem>
    </Link>
  );
};

const Menu = () => {
  const { isLoggedIn } = useSelector(profileSelector);
  const { home, marketplace } = publicRoute;
  return (
    <>
      <NavItem {...home} />
      <NavItem {...marketplace} />
      {isLoggedIn && <NavItem path={profileRoute.inventory.url} name='Inventory' />}
    </>
  );
};

export default Menu;
