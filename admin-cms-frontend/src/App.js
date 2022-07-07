import './App.css';
import { Register } from './pages/register-login/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path="/admin/register" element={<Register />}></Route>
					<Route path="*" element={<h2>404, Page Not Found</h2>}></Route>
				</Routes>
			</BrowserRouter>

			{/**Register Page */}
		</div>
	);
}

export default App;
