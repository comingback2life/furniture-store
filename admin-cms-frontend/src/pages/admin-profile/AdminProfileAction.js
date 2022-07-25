import { toast } from 'react-toastify';
import {
	requestPasswordOTP,
	updateAdminUser,
} from '../../helpers/axiosHelpers';
import {
	setUser,
	setpassResetResponse,
	setisLoading,
} from './AdminProfileSlice';

export const updateAdminProfileAction = (dataObj) => async (dispatch) => {
	const response = updateAdminUser(dataObj);
	toast.promise(response, {
		pending: 'Please wait...',
	});
	const { status, message, user } = await response;
	toast[status](message);

	status === 'success' && dispatch(setUser(user));
};

export const requestPasswordResetOTPAction = (dataObj) => async (dispatch) => {
	dispatch(setisLoading(true));
	const response = await requestPasswordOTP(dataObj);
	dispatch(setpassResetResponse(response));
};
