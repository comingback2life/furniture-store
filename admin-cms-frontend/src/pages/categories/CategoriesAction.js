import { setCategories } from './CategoriesSlice';
import {
	getCategories,
	postCategories,
	deleteCategories,
	updateCategory,
} from '../../helpers/axiosHelpers';
import { toast } from 'react-toastify';
export const fetchCategoriesAction = () => async (dispatch) => {
	const response = await getCategories();
	response.status === 'success' && dispatch(setCategories(response.result));
};

export const postCategoriesAction = (dataObj) => async (dispatch) => {
	const responsePromise = postCategories(dataObj);
	toast.promise(responsePromise, {
		pending: 'Please wait...',
	});
	const result = await responsePromise;
	toast[result.status](result.message);

	result.status === 'success' && dispatch(fetchCategoriesAction());
};

export const deleteCategoriesAction = (_id) => async (dispatch) => {
	const responsePromise = deleteCategories(_id);
	toast.promise(responsePromise, {
		pending: 'Please wait...',
	});
	const result = await responsePromise;
	toast[result.status](result.message);

	result.status === 'success' && dispatch(fetchCategoriesAction());
};
export const updateCategoriesAction = (dataObj) => async (dispatch) => {
	const responsePromise = updateCategory(dataObj);
	toast.promise(responsePromise, {
		pending: 'Please wait...',
	});
	const result = await responsePromise;
	toast[result.status](result.message);

	result.status === 'success' && dispatch(fetchCategoriesAction());
};
