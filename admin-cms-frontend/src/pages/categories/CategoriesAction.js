import { setCategories } from './CategoriesSlice';
import { getCategories } from '../../helpers/axiosHelpers';

export const fetchCategoriesAction = () => async (dispatch) => {
	const response = await getCategories();
	response.status === 'success' && dispatch(setCategories(response.result));
};
