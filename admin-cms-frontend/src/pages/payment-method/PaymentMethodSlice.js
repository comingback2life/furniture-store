import { createSlice } from '@reduxjs/toolkit';
const initialState = {
	paymentMethods: [],
	selectedPaymentMethod: {},
};

const PaymentMethodSlice = createSlice({
	name: 'paymentMethodSlice',
	initialState,
	reducers: {
		setPaymentMethods: (state, { payload }) => {
			state.paymentMethods = payload;
		},
		setSelectedPaymentMethod: (state, { payload }) => {
			state.selectedPaymentMethod = payload;
		},
	},
});

const { reducer, actions } = PaymentMethodSlice;
export const { setPaymentMethods, selectedPaymentMethod } = actions;
export default reducer;
