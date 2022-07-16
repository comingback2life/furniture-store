import { configureStore } from '@reduxjs/toolkit';
import signInUpReducer from './pages/register-login/signInUpSlice.js';
import systemReducer from './system-state/systemSlice.js';
import adminProfileSlice from './pages/admin-profile/AdminProfileSlice.js';
import categoryReducer from './pages/categories/CategoriesSlice.js';
const store = configureStore({
	reducer: {
		signInUp: signInUpReducer,
		system: systemReducer,
		admin: adminProfileSlice,
		categories: categoryReducer,
	},
});
export default store;
