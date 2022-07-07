import { loginUser, postUser } from '../../helpers/axiosHelpers';
import { isPending, responseResolved } from './signInUpSlice';
import { toast } from 'react-toastify';
export const postUserAction = (user) => async (dispatch) => {
	dispatch(isPending());
	//Axios Call
	console.log(user);
	const promiseData = postUser(user);
	toast.promise(promiseData, {
		pending: 'Please wait',
	});
	const data = await promiseData;
	toast[data.status](data.message);
	dispatch(responseResolved(data));
};
export const postLoginUserAction = (user) => async (dispatch) => {
	dispatch(isPending());
	//Axios Call

	const promiseData = loginUser(user);
	toast.promise(promiseData, {
		pending: 'Please wait',
	});
	const data = await promiseData;
	toast[data.status](data.message);
	dispatch(responseResolved(data));
};
