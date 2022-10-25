import { Logout, Menu } from '@mui/icons-material';
import { AppBar, Button, Divider, Drawer, IconButton, Toolbar } from '@mui/material';
import { AppBreadcrumb, AppMenu } from 'containers';
import { useWindowSize } from 'hooks';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { profileSelector, signOut } from 'reducers/profileSlice';
import { walletService } from 'services';
import { shorten } from 'utils/common';

const Header = () => {
  const dispatch = useDispatch();
  const { isMobile } = useWindowSize();
  const { isLoggedIn, address } = useSelector(profileSelector);

  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <Drawer
        variant={isMobile ? 'temporary' : 'persistent'}
        anchor='left'
        open={isMobile ? openDrawer : true}
        onClose={() => setOpenDrawer(false)}
        PaperProps={{ style: { width: '280px', padding: '8px 16px' } }}
      >
        <div className='flex justify-center items-center h-12'>
          <img src={require('assets/icons/Logo.png')} className='h-10' />
        </div>
        <Divider className='my-2' />
        <AppMenu />
      </Drawer>

      <AppBar position='sticky' elevation={1} color='transparent'>
        <Toolbar>
          {isMobile && (
            <IconButton onClick={() => setOpenDrawer(true)} className='mr-2'>
              <Menu />
            </IconButton>
          )}
          <AppBreadcrumb />
          <div className='flex-1' />

          {isLoggedIn ? (
            <>
              <IconButton color='secondary' className='mr-3' onClick={() => dispatch(signOut({}))}>
                <Logout />
              </IconButton>
              <Button variant='outlined'>{shorten(address)}</Button>
            </>
          ) : (
            <Button variant='outlined' onClick={() => walletService.connectWallet()}>
              Connect Wallet
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
