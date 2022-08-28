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
import ResetPasswordPage from './pages/register-login/ResetPasswordPage';
import PrivateRoute from './components/privateRoutes/PrivateRoute';
function App() {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					{/* private route */}

					<Route
						path="/dashboard"
						element={
							<PrivateRoute>
								<Dashboard />
							</PrivateRoute>
						}
					></Route>
					<Route
						path="/admin-profile"
						element={
							<PrivateRoute>
								<AdminProfile />
							</PrivateRoute>
						}
					></Route>
					<Route
						path="/register"
						element={
							<PrivateRoute>
								<RegisterPage />
							</PrivateRoute>
						}
					></Route>
					<Route
						path="/product/new"
						element={
							<PrivateRoute>
								<NewProduct />
							</PrivateRoute>
						}
					></Route>
					<Route
						path="/products"
						element={
							<PrivateRoute>
								<ProductPage />
							</PrivateRoute>
						}
					></Route>
					<Route
						path="/payments"
						element={
							<PrivateRoute>
								<PaymentMethodPage />
							</PrivateRoute>
						}
					></Route>
					<Route
						path="/products/edit/:_id"
						element={
							<PrivateRoute>
								<EditProductPage />
							</PrivateRoute>
						}
					></Route>
					<Route
						path="/verify-email"
						element={
							<PrivateRoute>
								<EmailVerification />
							</PrivateRoute>
						}
					></Route>
					<Route
						path="/categories"
						element={
							<PrivateRoute>
								<CategoriesPage />
							</PrivateRoute>
						}
					></Route>

					{/**public routes */}
					<Route path="/" element={<LoginPage />}></Route>
					<Route path="/reset-password" element={<ResetPasswordPage />}></Route>
					<Route path="*" element={<h2>404, Page Not Found</h2>}></Route>
				</Routes>
			</BrowserRouter>
			<ToastContainer position="top-right" autoClose={2000} />
			{/* Same as */}
		</div>
	);
}

export default App;
