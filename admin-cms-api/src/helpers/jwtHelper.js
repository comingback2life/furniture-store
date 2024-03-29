import jwt from 'jsonwebtoken';
import { updateAdmin } from '../models/admin/Admin.models.js';
import {
	deleteFromSession,
	insertSession,
} from './../models/session/Session.model.js';
//payload must be an object

export const signAccessJWT = async (payload) => {
	const accessJWT = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
		expiresIn: '30m',
	});
	const obj = {
		token: accessJWT,
		type: 'jwt',
	}; //object because the sessionTable requires these two values
	await insertSession(obj);
	return accessJWT;
};

export const signRefreshJWT = async (payload) => {
	const refreshJWT = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
		expiresIn: '30d',
	});
	await updateAdmin({ email: payload.email }, { refreshJWT }); //payload consists of email and the filter value can be used as the email.
	return refreshJWT;
};

export const createJWTs = async (payload) => {
	return {
		accessJWT: await signAccessJWT(payload),
		refreshJWT: await signRefreshJWT(payload),
	};
};

export const verifyAccessJWT = async (jwtToken) => {
	try {
		return jwt.verify(jwtToken, process.env.JWT_ACCESS_SECRET);
	} catch (error) {
		if (error.message === 'jwt expired') {
			//being thrown from jwt.verify
			await deleteFromSession({ type: 'jwt', token: jwtToken });
		} //if expired JWT delete token

		return error.message;
	}
	//send token and type to the session Table
};

export const verifyRefreshJWT = (jwtToken) => {
	return jwt.verify(jwtToken, process.env.JWT_REFRESH_SECRET);
};
