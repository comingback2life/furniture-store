import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, ...rest }) => {
	const location = useLocation();
	const { user } = useSelector((state) => state.admin);
	return user?._id ? children : <Navigate to="/" state={{ from: location }} />;
};

export default PrivateRoute;
