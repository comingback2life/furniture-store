import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	products: [],
	selectedProducts: {},
};
const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {
		setProducts: (state, { payload }) => {
			state.products = payload;
		},
		setSelectedProducts: (state, { payload }) => {
			state.selectedProducts = payload;
		},
	},
});

const { actions, reducer } = productSlice;
export const { setProducts, setSelectedProducts } = actions;
export default reducer;
