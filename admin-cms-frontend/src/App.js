import './App.css';
import { RegisterPage } from './pages/register-login/RegisterPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/register-login/LoginPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EmailVerification } from './pages/register-login/EmailVerification';
function App() {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path="/admin/register" element={<RegisterPage />}></Route>
					<Route path="/admin/login" element={<LoginPage />}></Route>
					<Route
						path="/admin/verify-email"
						element={<EmailVerification />}
					></Route>
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
