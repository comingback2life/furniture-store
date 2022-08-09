import { verifyAccessJWT } from '../../helpers/jwtHelper.js';
import { getAdmin } from '../../models/admin/Admin.models.js';
import { getSession } from '../../models/session/Session.model.js';

export const adminAuthMiddleware = async (req, res, next) => {
	try {
		const { authorization } = req.headers; //get the JWT token from header
		if (authorization) {
			//check if the JWT token is valid and not expired.
			const decodedDetails = verifyAccessJWT(authorization);
			if ((decodedDetails = 'token expired')) {
				return res.status(403).json({
					status: 'Error',
					message: 'Expired Token',
				});
			}
			if (decodedDetails?.email) {
				const userExistsinDatabase = await getSession({
					type: 'jwt',
					token: authorization,
				});
				if (userExistsinDatabase?.id) {
					const getAdminUser = await getAdmin({ email: decodedDetails.email });
					if (getAdminUser?._id) {
						req.adminInformation = getAdminUser;
						return next();
					}
				}
			}
		}

		// check if exists in Database
		//get user info and attach to the req.body
		res.status(403).json({
			status: 'error',
			message: 'Unauthorized !',
		});
	} catch (error) {
		next(error);
	}
};
