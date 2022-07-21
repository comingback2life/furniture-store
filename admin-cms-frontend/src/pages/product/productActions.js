import { getProducts, postProducts } from '../../helpers/axiosHelpers';
import { setProducts } from './productSlice';
import { toast } from 'react-toastify';
export const fetchProductsAction = () => async (dispatch) => {
	const { status, products } = await getProducts();
	status === 'success' && dispatch(setProducts(products));
};

export const postProductsAction = (dataObj) => async (dispatch) => {
	const response = postProducts(dataObj);
	toast.promise(response, {
		pending: 'Please wait..',
	});
	const { status, message } = await response;
	toast[status](message);
	status === 'success' && dispatch(fetchProductsAction());
};
