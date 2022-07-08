import { createSlice } from '@reduxjs/toolkit';
const initialState = {
	user: {},
};
const adminSlice = createSlice({
	name: 'adminSlice',
	initialState,
	reducers: {
		setUser: (state, { payload }) => {
			state.user = payload;
		},
	},
});
const { reducer, actions } = adminSlice;
export const { setUser } = actions;
export default reducer;
