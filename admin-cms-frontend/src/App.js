import './App.css';
import { RegisterPage } from './pages/register-login/RegisterPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/register-login/LoginPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EmailVerification } from './pages/register-login/EmailVerification';
import { AdminProfile } from './pages/admin-profile/AdminProfile';
import { Dashboard } from './pages/dashboard-page/Dashboard';
import CategoriesPage from './pages/categories/CategoriesPage';
import ProductPage from './pages/product/ProductPage';
import NewProduct from './pages/product/NewProduct';
import EditProductPage from './pages/product/EditProductPage';
import PaymentMethodPage from './pages/payment-method/PaymentMethodPage';
function App() {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					{/* private route */}
					<Route path="/admin/dashboard" element={<Dashboard />}></Route>
					<Route path="/admin-profile" element={<AdminProfile />}></Route>
					<Route path="/admin/register" element={<RegisterPage />}></Route>
					<Route path="/product/new" element={<NewProduct />}></Route>
					<Route path="/products" element={<ProductPage />}></Route>
					<Route path="/payments" element={<PaymentMethodPage />}></Route>
					<Route
						path="/products/edit/:_id"
						element={<EditProductPage />}
					></Route>
					<Route
						path="/admin/verify-email"
						element={<EmailVerification />}
					></Route>
					<Route path="/categories" element={<CategoriesPage />}></Route>

					{/**public routes */}
					<Route path="/admin/login" element={<LoginPage />}></Route>
					<Route path="*" element={<h2>404, Page Not Found</h2>}></Route>
				</Routes>
			</BrowserRouter>
			<ToastContainer position="top-right" autoClose={2000} />
			{/* Same as */}

			{/**Register Page */}
		</div>
	);
}

export default App;
