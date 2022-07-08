import { configureStore } from '@reduxjs/toolkit';
import signInUpReducer from './pages/register-login/signInUpSlice.js';
import systemReducer from './system-state/systemSlice.js';
import adminProfileSlice from './pages/admin-profile/AdminProfileSlice.js';
const store = configureStore({
	reducer: {
		signInUp: signInUpReducer,
		system: systemReducer,
		admin: adminProfileSlice,
	},
});
export default store;
