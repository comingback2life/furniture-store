import { isPending, responseResolved } from './signInUpSlice';

export const postUserAction = (user) => async (dispatch) => {
	dispatch(isPending());
	//Axios Call
};
