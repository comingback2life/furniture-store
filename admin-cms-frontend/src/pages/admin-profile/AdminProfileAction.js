import { toast } from 'react-toastify';
import { updateAdminUser } from '../../helpers/axiosHelpers';
import { setUser } from './AdminProfileSlice';

export const updateAdminProfileAction = (dataObj) => async (dispatch) => {
	const response = updateAdminUser(dataObj);
	toast.promise(response, {
		pending: 'Please wait...',
	});
	const { status, message, user } = await response;
	toast[status](message);

	status === 'success' && dispatch(setUser(user));
};
