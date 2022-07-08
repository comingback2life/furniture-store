import { createSlice } from '@reduxjs/toolkit';
const initialState = {
	showAdminSideBar: false,
};
const systemSlice = createSlice({
	name: 'systemSlice',
	initialState,
	reducers: {
		toggleSideBar: (state) => {
			state.showAdminSideBar = !state.showAdminSideBar;
		},
	},
});
const { reducer, actions } = systemSlice;
export const { toggleSideBar } = actions;
export default reducer;
