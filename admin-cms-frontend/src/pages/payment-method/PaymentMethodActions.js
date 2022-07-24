import { getPaymentMethods } from '../../helpers/axiosHelpers';
import { setPaymentMethods, selectedPaymentMethod } from './PaymentMethodSlice';

export const fetchPaymentMethods = () => async (dispatch) => {
	//call axios API , get data and set to state
	const { status, message, result } = await getPaymentMethods();
	status === 'success' && dispatch(setPaymentMethods(result));
};
