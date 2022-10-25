import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    payments: [] as PaymentTokenType[],
  },
  reducers: {
    save: (state, { payload }) => {
      state = { ...state, ...payload };
      return state;
    },
  },
});

export const { save: savePayment } = paymentSlice.actions;

export const paymentSelector = ({ payment }: RootState) => payment;

export default paymentSlice.reducer;
