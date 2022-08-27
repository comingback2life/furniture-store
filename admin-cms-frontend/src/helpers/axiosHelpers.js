import axios from 'axios';
const rootURL = 'http://localhost:8000/api/v1';
const adminEP = rootURL + '/admin';
const catEP = rootURL + '/categories';
const productsEP = rootURL + '/products';
const paymentMethodsEp = rootURL + '/payment-methods';
// Admin APIs
const apiProcessor = async ({ method, url, dataObj, headers }) => {
	try {
		const { data } = await axios({
			method,
			url,
			data: dataObj,
			headers,
		});
		return data;
	} catch (error) {
		let message = error.response.data.message;

		if (error.response && error.response.status === 401) {
			sessionStorage.removeItem('accessJWT');
			localStorage.removeItem('refreshJWT');
			return {
				status: 'error',
				message: 'Unauthenticated!',
			};
		}
		if (error.response && error.response.data) {
			message = error.response.data.message;
		}
		if (message === 'Expired Token!') {
			const { accessJWT } = await apiProcessor({
				method: 'GET',
				url: adminEP + '/accessjwt',
				headers: {
					Authorization: localStorage.getItem('refreshJWT'),
				},
			});
			if (accessJWT) {
				sessionStorage.setItem('accessJWT', accessJWT);
				return apiProcessor({
					method,
					url,
					dataObj,
					headers: {
						Authorization: accessJWT,
					},
				});
			}
		}

		return {
			status: 'error',
			message,
		};
	}
};

export const postUser = async (dataObj) => {
	const url = adminEP;
	return apiProcessor({
		method: 'POST',
		url,
		dataObj,
		headers: {
			Authorization: sessionStorage.getItem('accessJWT'),
		},
	});
};

export const getUser = async () => {
	const url = adminEP;
	return apiProcessor({
		method: 'GET',
		url,
		headers: {
			Authorization: sessionStorage.getItem('accessJWT'),
		},
	});
};

export const loginUser = async (dataObj) => {
	const url = adminEP + '/login';
	return apiProcessor({ method: 'POST', url, dataObj });
};
export const postEmailVerification = async (dataObj) => {
	const url = adminEP + '/verify-email';
	return apiProcessor({ method: 'POST', url, dataObj });
};
export const updateAdminUser = async (dataObj) => {
	const url = adminEP;
	return apiProcessor({
		method: 'PUT',
		url,
		dataObj,
		headers: {
			Authorization: sessionStorage.getItem('accessJWT'),
		},
	});
};
export const updateAdminPassword = async (dataObj) => {
	const url = adminEP;
	return apiProcessor({ method: 'PUT', url, dataObj });
};

export const requestPasswordOTP = async (dataObj) => {
	const url = adminEP + '/otp-request';
	return apiProcessor({ method: 'POST', url, dataObj });
};
export const updateAdminPasswordLoggedIn = async (dataObj) => {
	const url = adminEP + '/update-password';
	return apiProcessor({
		method: 'PATCH',
		url,
		dataObj,
		headers: {
			Authorization: sessionStorage.getItem('accessJWT'),
		},
	});
};
//categories API
export const getCategories = () => {
	const url = catEP;
	return apiProcessor({
		method: 'GET',
		url,
		headers: {
			Authorization: sessionStorage.getItem('accessJWT'),
		},
	});
};
export const postCategories = (dataObj) => {
	const url = catEP;
	return apiProcessor({
		method: 'POST',
		url,
		dataObj,
		headers: {
			Authorization: sessionStorage.getItem('accessJWT'),
		},
	});
};
export const updateCategories = (dataObj) => {
	const url = catEP;
	return apiProcessor({
		method: 'PUT',
		url,
		dataObj,
		headers: {
			Authorization: sessionStorage.getItem('accessJWT'),
		},
	});
};
export const deleteCategories = (_id) => {
	const url = catEP;
	return apiProcessor({
		method: 'DELETE',
		url,
		dataObj: { _id },
		headers: {
			Authorization: sessionStorage.getItem('accessJWT'),
		},
	});
};

// products API

export const getProducts = () => {
	const url = productsEP;
	return apiProcessor({
		method: 'GET',
		url,
		headers: {
			Authorization: sessionStorage.getItem('accessJWT'),
		},
	});
};

export const getSingleProduct = (_id) => {
	const url = productsEP + '/' + _id;
	return apiProcessor({
		method: 'GET',
		url,
		headers: {
			Authorization: sessionStorage.getItem('accessJWT'),
		},
	});
};
export const postProducts = (dataObj) => {
	const url = productsEP;
	return apiProcessor({
		method: 'POST',
		url,
		dataObj,
		headers: {
			Authorization: sessionStorage.getItem('accessJWT'),
		},
	});
};
export const deleteProducts = (ids) => {
	const url = productsEP;
	return apiProcessor({
		method: 'DELETE',
		url,
		dataObj: ids,
		headers: {
			Authorization: sessionStorage.getItem('accessJWT'),
		},
	});
};

export const updateProducts = (dataObj) => {
	const url = productsEP;
	return apiProcessor({
		method: 'PUT',
		url,
		dataObj,
		headers: {
			Authorization: sessionStorage.getItem('accessJWT'),
		},
	});
};

/// PaymentMethods

export const getPaymentMethods = (_id) => {
	const url = _id ? paymentMethodsEp + '/' + _id : paymentMethodsEp;
	return apiProcessor({
		method: 'GET',
		url,
		headers: {
			Authorization: sessionStorage.getItem('accessJWT'),
		},
	});
};

export const postPaymentMethod = (dataObj) => {
	const url = paymentMethodsEp;
	return apiProcessor({
		method: 'POST',
		url,
		dataObj,
		headers: {
			Authorization: sessionStorage.getItem('accessJWT'),
		},
	});
};
export const updatePaymentMethod = (dataObj) => {
	const url = paymentMethodsEp;
	return apiProcessor({
		method: 'PUT',
		url,
		dataObj,
		headers: {
			Authorization: sessionStorage.getItem('accessJWT'),
		},
	});
};
export const deletePaymentMethod = (_id) => {
	const url = paymentMethodsEp + '/' + _id;
	return apiProcessor({
		method: 'DELETE',
		url,
		headers: {
			Authorization: sessionStorage.getItem('accessJWT'),
		},
	});
};

export const deletePaymentMethods = (dataObj) => {
	const url = paymentMethodsEp + '/';
	return apiProcessor({
		method: 'DELETE',
		url,
		dataObj,
		headers: {
			Authorization: sessionStorage.getItem('accessJWT'),
		},
	});
};
