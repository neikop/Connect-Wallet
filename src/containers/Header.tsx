import { AppBar, Button, Container, Divider, Menu, MenuItem, Toolbar } from '@mui/material';
import { NetworkBar } from 'components';
import { AppMenu } from 'containers';
import { useAnchor, useValidNetwork } from 'hooks';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { profileSelector, signOut } from 'reducers/profileSlice';
import { profileRoute, publicRoute } from 'routes';
import { walletService } from 'services';
import { shorten } from 'utils/common';

const Header = () => {
  const dispatch = useDispatch();
  const { validNetwork } = useValidNetwork();
  const { isLoggedIn, address } = useSelector(profileSelector);

  const [anchorProfile, openProfile, onOpenProfile, onCloseProfile] = useAnchor();

  return (
    <AppBar component='header' position='sticky' elevation={0} color='transparent'>
      <Toolbar className='px-0'>
        <Container className='flex items-stretch h-[80px]'>
          <div className='flex items-center justify-center w-[260px]'>
            <Link to={publicRoute.home.path}>
              <img src={require('assets/icons/Logo.png')} className='h-[56px]' />
            </Link>
          </div>

          <div className='flex-1 flex justify-start gap-[4px]'>
            <AppMenu />
          </div>

          <NetworkBar />
          <div className='flex items-center'>
            {isLoggedIn ? (
              <Button size='large' className='shadow-card' onClick={onOpenProfile}>
                {shorten(address)}
              </Button>
            ) : (
              <Button size='large' className='shadow-card' onClick={() => validNetwork(walletService.connectWallet)}>
                Connect Wallet
              </Button>
            )}

            <Menu anchorEl={anchorProfile} open={openProfile} onClose={onCloseProfile} onClick={onCloseProfile}>
              <Link to={profileRoute.profile.url}>
                <MenuItem>Profile</MenuItem>
              </Link>
              <Link to={profileRoute.inventory.url}>
                <MenuItem>Inventory</MenuItem>
              </Link>
              <Divider />
              <MenuItem
                onClick={() => {
                  dispatch(signOut({}));
                }}
              >
                Disconnect
              </MenuItem>
            </Menu>
          </div>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
