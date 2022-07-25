import { toast } from 'react-toastify';
import {
	requestPasswordOTP,
	updateAdminPassword,
	updateAdminUser,
} from '../../helpers/axiosHelpers';
import {
	setUser,
	setpassResetResponse,
	setisLoading,
	setPasswordEmail,
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
	dispatch(setPasswordEmail(dataObj.email));
	dispatch(setpassResetResponse(response));
};

export const resetPasswordAction = (dataObj) => async (dispatch) => {
	const response = updateAdminPassword(dataObj);
	toast.promise(response, {
		pending: 'Please wait...',
	});
	const { status, message } = await response;
	toast[status](message);
};
