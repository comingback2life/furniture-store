import axios from 'axios';
const rootURL = 'http://localhost:8000/api/v1';
const adminEP = rootURL + '/admin';
const catEP = rootURL + '/categories';
// Admin APIs
const apiProcessor = async ({ method, url, dataObj }) => {
	try {
		const { data } = await axios({
			method,
			url,
			data: dataObj,
		});
		return data;
	} catch (error) {
		let message = error.message;
		if (error.response && error.response.data) {
			message = error.response.data.message;
		}
		return {
			status: 'error',
			message,
		};
	}
};

export const postUser = async (dataObj) => {
	const url = adminEP;
	return apiProcessor({ method: 'POST', url, dataObj });
};

export const loginUser = async (dataObj) => {
	const url = adminEP + '/login';
	return apiProcessor({ method: 'POST', url, dataObj });
};
export const postEmailVerification = async (dataObj) => {
	const url = adminEP + '/verify-email';
	return apiProcessor({ method: 'POST', url, dataObj });
};

//categories API
export const getCategories = () => {
	const url = catEP;
	return apiProcessor({ method: 'GET', url });
};
export const postCategories = (dataObj) => {
	const url = catEP;
	return apiProcessor({ method: 'POST', url, dataObj });
};

export const deleteCategories = (_id) => {
	const url = catEP;
	return apiProcessor({ method: 'DELETE', url, dataObj: _id });
};
