import { configureStore } from '@reduxjs/toolkit';
import network from './networkSlice';
import notification from './notificationSlice';
import profile from './profileSlice';
import system from './systemSlice';
import payment from './paymentSlice';

export const store = configureStore({
  reducer: {
    network,
    notification,
    profile,
    system,
    payment,
  },
});

export type RootState = ReturnType<typeof store.getState>;
