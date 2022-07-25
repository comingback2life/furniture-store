import { createSlice } from '@reduxjs/toolkit';
const initialState = {
	user: {},
	passResetResponse: {},
	isLoading: false,
};
const adminSlice = createSlice({
	name: 'adminSlice',
	initialState,
	reducers: {
		setUser: (state, { payload }) => {
			state.user = payload;
		},
		setpassResetResponse: (state, { payload }) => {
			state.isLoading = false;
			state.passResetResponse = payload;
		},
		setisLoading: (state, { payload }) => {
			state.setisLoading = payload;
		},
	},
});
const { reducer, actions } = adminSlice;
export const { setUser, setpassResetResponse, setisLoading } = actions;
export default reducer;
