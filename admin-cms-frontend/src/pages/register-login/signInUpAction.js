import {
	getUser,
	loginUser,
	postUser,
	requestNewAcessJWT,
} from '../../helpers/axiosHelpers';
import { isPending, responseResolved } from './signInUpSlice';
import { toast } from 'react-toastify';
import { setUser } from '../admin-profile/AdminProfileSlice.js';

export const postUserAction = (user) => async (dispatch) => {
	dispatch(isPending());
	//Axios Call
	const promiseData = postUser(user);
	toast.promise(promiseData, {
		pending: 'Please wait',
		toastID: 'Registration Toast',
	});
	const data = await promiseData;
	toast[data.status](data.message);
	dispatch(responseResolved(data));
};
export const postLoginUserAction = (user) => async (dispatch) => {
	const promiseData = loginUser(user);
	toast.promise(promiseData, {
		pending: 'Please wait',
		toastID: 'Login Toast',
	});
	const data = await promiseData;
	if (data.status === 'success') {
		//create user state and store it
		sessionStorage.setItem('accessJWT', data.accessJWT);
		localStorage.setItem('refreshJWT', data.refreshJWT);
		dispatch(setUser(data.user));
		return;
	}
	data.status === 'error' && toast[data.status](data.message);
	dispatch(responseResolved(data));
};

export const fetchUserByToken = () => async (dispatch) => {
	const response = await getUser();
	response.status === 'success' && dispatch(setUser(response.user));
};

export const autoLogin = () => async (dispatch) => {
	const accessJWT = sessionStorage.getItem('accessJWT');
	const refreshJWT = localStorage.getItem('refreshJWT');
	//if accessJWT exists, fetch the user and mount in the state
	if (accessJWT) {
		dispatch(fetchUserByToken());
		return;
	} else if (refreshJWT) {
		const token = await requestNewAcessJWT();
		token ? dispatch(fetchUserByToken()) : dispatch(adminLogout());
	} else {
		dispatch(adminLogout());
	}
	//if refreshJWT exists, fetch new accessJWT and fetch the user.
};

export const adminLogout = () => (dispatch) => {
	sessionStorage.removeItem('accessJWT');
	localStorage.removeItem('refreshJWT');
	dispatch(setUser({}));
};
