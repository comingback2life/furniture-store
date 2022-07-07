import axios from 'axios';
const rootURL = 'http://localhost:8000/api/v1';
const adminEP = rootURL + '/admin';
export const postUser = async (userObj) => {
	try {
		const { data } = await axios.post(adminEP, userObj);
		return data;
	} catch (error) {
		return {
			status: 'error',
			message: error.response.data.message,
		};
	}
};
export const loginUser = async (userObj) => {
	try {
		const { data } = await axios.post(adminEP + '/login', userObj);
		return data;
	} catch (error) {
		return {
			status: 'error',
			message: error.message,
		};
	}
};

export const postEmailVerification = async (userObj) => {
	try {
		const { data } = await axios.post(adminEP + '/verify-email', userObj);
		return data;
	} catch (error) {
		return {
			status: 'error',
			message: error.message,
		};
	}
};
