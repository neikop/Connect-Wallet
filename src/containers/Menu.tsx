import { List, ListItemButton, ListItemText, styled } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { privateRoute } from 'routes';

const StyledListItem = styled(ListItemButton)({
  borderRadius: 12,
  '&.Mui-selected': {
    backgroundColor: 'var(--color-primary-light) !important',
  },
  '&:hover': {
    backgroundColor: 'var(--color-primary-main) !important',
  },
});

const MenuItem = ({ path, name }: { path: string; name?: string }) => {
  const location = useLocation();

  return (
    <Link to={path}>
      <StyledListItem selected={location.pathname.startsWith(path)}>
        <ListItemText classes={{ primary: 'font-medium' }}>{name}</ListItemText>
      </StyledListItem>
    </Link>
  );
};

const Menu = () => {
  const { home, marketplace } = privateRoute;

  return (
    <List className='flex flex-col gap-1'>
      <MenuItem {...home} />
      <MenuItem {...marketplace} />
    </List>
  );
};

export default Menu;
