import {
	deleteProducts,
	getProducts,
	getSingleProduct,
	postProducts,
	updateProducts,
} from '../../helpers/axiosHelpers';
import { setProducts, setSelectedProducts } from './productSlice';
import { toast } from 'react-toastify';
export const fetchProductsAction = () => async (dispatch) => {
	const { status, products } = await getProducts();
	status === 'success' && dispatch(setProducts(products));
};

export const fetchSingleProductAction = (_id) => async (dispatch) => {
	const { status, products } = await getSingleProduct(_id);
	status === 'success' && dispatch(setSelectedProducts(products));
};

//getSingleProduct
export const postProductsAction = (dataObj) => async (dispatch) => {
	const response = postProducts(dataObj);
	toast.promise(response, {
		pending: 'Please wait..',
	});
	const { status, message } = await response;
	toast[status](message);
	status === 'success' && dispatch(fetchProductsAction());
};

export const deleteProductsAction = (ids) => async (dispatch) => {
	const response = deleteProducts(ids);
	toast.promise(response, {
		pending: 'Please wait..',
	});
	const { status, message } = await response;
	toast[status](message);
	status === 'success' && dispatch(fetchProductsAction());
};

export const updateProductAction = (dataObj) => async (dispatch) => {
	const response = updateProducts(dataObj);
	toast.promise(response, {
		pending: 'Please wait..',
	});
	const { status, message, result } = await response;
	toast[status](message);
	status === 'success' && dispatch(fetchProductsAction());
	// status === 'success' && dispatch(setSelectedProducts());
	// status === 'success' && dispatch(fetchProductsAction());
};
