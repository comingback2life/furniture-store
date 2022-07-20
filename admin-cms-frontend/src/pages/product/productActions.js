import { getProducts } from '../../helpers/axiosHelpers';
import { setProducts } from './productSlice';

export const fetchProductsAction = () => async (dispatch) => {
	const { status, products } = await getProducts();
	status === 'success' && dispatch(setProducts(products));
};
