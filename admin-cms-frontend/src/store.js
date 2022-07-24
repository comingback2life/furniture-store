import { configureStore } from '@reduxjs/toolkit';
import signInUpReducer from './pages/register-login/signInUpSlice.js';
import systemReducer from './system-state/systemSlice.js';
import adminProfileSlice from './pages/admin-profile/AdminProfileSlice.js';
import categoryReducer from './pages/categories/CategoriesSlice.js';
import productReducer from './pages/product/productSlice.js';
import paymentMethodReducer from './pages/payment-method/PaymentMethodSlice.js';
const store = configureStore({
	reducer: {
		signInUp: signInUpReducer,
		system: systemReducer,
		admin: adminProfileSlice,
		categories: categoryReducer,
		products: productReducer,
		paymentMethod: paymentMethodReducer,
	},
});
export default store;
