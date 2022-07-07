import { configureStore } from '@reduxjs/toolkit';
import signInUpReducer from './pages/register-login/signInUpSlice.js';
const store = configureStore({
	reducer: {
		signInUp: signInUpReducer,
	},
});
export default store;
