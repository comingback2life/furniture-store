import jwt from 'jsonwebtoken';
import { insertSession } from './../models/session/Session.model.js';
//payload must be an object

export const signAccessJWT = (payload) => {
	console.log(payload);
	const accessJWT = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
		expiresIn: '15m',
	});
	const obj = {
		token: accessJWT,
		type: 'jwt',
	};
	return insertSession(obj);
};

export const verifyAccessJWT = (jwtToken) => {
	return jwt.verify(jwtToken, process.env.JWT_ACCESS_SECRET);
	//send token and type to the session Table
};
