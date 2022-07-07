import { configureStore } from '@reduxjs/toolkit';
import signInUpReducer from './pages/register-login/signInUpSlice.js';
const store = configureStore({
	reducer: {
		signInUp: signInUp,
	},
});
export default store;
