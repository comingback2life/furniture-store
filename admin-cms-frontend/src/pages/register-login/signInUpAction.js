import { loginUser, postUser } from '../../helpers/axiosHelpers';
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
		dispatch(setUser(data.user));
		return;
	}
	data.status === 'error' && toast[data.status](data.message);
	dispatch(responseResolved(data));
};
