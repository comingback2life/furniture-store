import { toast } from 'react-toastify';
import {
	deletePaymentMethod,
	getPaymentMethods,
	postPaymentMethod,
} from '../../helpers/axiosHelpers';
import { toggleModal } from '../../system-state/systemSlice';
import { setPaymentMethod } from './PaymentMethodSlice.js';

export const fetchPaymentMethods = () => async (dispatch) => {
	//calll axios to call api
	const response = await getPaymentMethods();

	response.status === 'success' && dispatch(setPaymentMethod(response.result));
	//get data and set to seate
};

export const postPaymentMethodAction = (dataObj) => async (dispatch) => {
	const response = postPaymentMethod(dataObj);
	toast.promise(response, {
		pending: 'Please wait...',
	});
	const { status, message } = await response;
	toast[status](message);
	const { result } = await getPaymentMethods();
	status === 'success' &&
		dispatch(setPaymentMethod(result)) &&
		dispatch(toggleModal()); // empty array should not be passed at all cost
};

export const deletePaymentMethodAction = (_id) => async (dispatch) => {
	const response = deletePaymentMethod(_id);
	toast.promise(response, {
		pending: 'Please wait...',
	});
	const { status, message } = await response;
	toast[status](message);
	const { result } = await getPaymentMethods();
	status === 'success' && dispatch(setPaymentMethod(result)); // empty array should not be passed at all cost
};
