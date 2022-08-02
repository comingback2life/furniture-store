import jwt from 'jsonwebtoken';
import { insertSession } from './../models/session/Session.model';
//payload must be an object

export const signAccessJWT = (payload) => {
	const accessJWT = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
		expiresIn: '15m',
	});
	return insertSession(accessJWT);
};

export const verifyAccessJWT = (jwtToken) => {
	return jwt.verify(toke, process.env.JWT_ACCESS_SECRET);
	//send token and type to the session Table
};
