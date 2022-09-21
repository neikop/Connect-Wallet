import { AccessAlarm } from '@mui/icons-material';
import { Button, Container } from '@mui/material';
import { DateTime } from 'luxon';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { walletService } from 'services';

const Layout = () => {
  return (
    <div>
      <div>Layout</div>
      <Link to='/home'>Home</Link>
    </div>
  );
};

const App = () => {
  const currentDate = DateTime.fromJSDate(new Date()).toFormat('dd/MM/yyyy');
  return (
    <Container>
      <h1 className='text-3xl font-bold underline mb-[20px]'>Hello world!</h1>
      <h2 className='text-2xl mb-[12px]'>{currentDate}</h2>
      <Button
        variant='outlined'
        color='secondary'
        startIcon={<AccessAlarm />}
        onClick={() => walletService.connectWallet()}
      >
        Connect Wallet
      </Button>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<Layout />}></Route>
          <Route path='/home' element={<div>Home</div>}></Route>
        </Routes>
      </BrowserRouter>
    </Container>
  );
};

export default App;
