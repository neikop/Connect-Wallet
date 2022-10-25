import { QueryClientProvider } from '@tanstack/react-query';
import { AppTheme } from 'containers';
import { PrivateLayout, PublicLayout } from 'layouts';
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { store } from 'reducers/store';
import { queryClient } from 'services';

const isAdmin = true;

const App = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider preventDuplicate variant='success' anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
          <AppTheme>
            <BrowserRouter>
              <Routes>
                {isAdmin ? (
                  <Route path='/*' element={<PrivateLayout />} />
                ) : (
                  <Route path='/*' element={<PublicLayout />} />
                )}
              </Routes>
            </BrowserRouter>
          </AppTheme>
        </SnackbarProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
