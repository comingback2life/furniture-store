import { createSlice } from '@reduxjs/toolkit';
const initialState = {
	showAdminSideBar: false,
	showModal: true,
};
const systemSlice = createSlice({
	name: 'systemSlice',
	initialState,
	reducers: {
		toggleSideBar: (state) => {
			state.showAdminSideBar = !state.showAdminSideBar;
		},
		toggleModal: (state) => {
			state.showModal = !state.showModal;
		},
	},
});
const { reducer, actions } = systemSlice;
export const { toggleSideBar, toggleModal } = actions;
export default reducer;
