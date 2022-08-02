import jwt from 'jsonwebtoken';
import { updateAdmin } from '../models/admin/Admin.models.js';
import { insertSession } from './../models/session/Session.model.js';
//payload must be an object

export const signAccessJWT = async (payload) => {
	console.log(payload);
	const accessJWT = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
		expiresIn: '15m',
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

export const createJWTs = (payload) => {
	return {
		accessJWT: signAccessJWT(payload),
		refreshJWT: signRefreshJWT(payload),
	};
};

export const verifyAccessJWT = (jwtToken) => {
	return jwt.verify(jwtToken, process.env.JWT_ACCESS_SECRET);
	//send token and type to the session Table
};
