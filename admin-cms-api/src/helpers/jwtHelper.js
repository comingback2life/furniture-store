import jwt from 'jsonwebtoken';

//payload must be an object

export const signJWT = (payload) => {
	jwt.sign(payload, process.env.JWT_ACCESS_SECRET);
};
