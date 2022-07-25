import { createSlice } from '@reduxjs/toolkit';
const initialState = {
	user: {},
	passResetResponse: {},
	isLoading: false,
	passResetEmail: '',
	showForm: 'password',
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
			state.showForm = payload.status === 'success' ? 'OTP' : 'password';
		},
		setisLoading: (state, { payload }) => {
			state.setisLoading = payload;
		},
		setPasswordEmail: (state, { payload }) => {
			state.passResetEmail = payload;
		},
	},
});
const { reducer, actions } = adminSlice;
export const { setUser, setpassResetResponse, setisLoading, setPasswordEmail } =
	actions;
export default reducer;
