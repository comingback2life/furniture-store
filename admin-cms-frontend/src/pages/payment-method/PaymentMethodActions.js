import { getPaymentMethods } from '../../helpers/axiosHelpers';
import { setPaymentMethods, selectedPaymentMethod } from './PaymentMethodSlice';

export const fetchPaymentMethods = () => async (dispatch) => {
	//call axios API , get data and set to state
	const response = await getPaymentMethods();
	response.status === 'success' && dispatch(setPaymentMethods(response));
};
