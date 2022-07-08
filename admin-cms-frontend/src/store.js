import { configureStore } from '@reduxjs/toolkit';
import signInUpReducer from './pages/register-login/signInUpSlice.js';
import systemReducer from './system-state/systemSlice.js';
const store = configureStore({
	reducer: {
		signInUp: signInUpReducer,
		system: systemReducer,
	},
});
export default store;
