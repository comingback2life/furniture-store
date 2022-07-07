import './App.css';
import { RegisterPage } from './pages/register-login/RegisterPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/register-login/LoginPage';
function App() {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path="/admin/register" element={<RegisterPage />}></Route>
					<Route path="/admin/login" element={<LoginPage />}></Route>
					<Route path="*" element={<h2>404, Page Not Found</h2>}></Route>
				</Routes>
			</BrowserRouter>

			{/**Register Page */}
		</div>
	);
}

export default App;
