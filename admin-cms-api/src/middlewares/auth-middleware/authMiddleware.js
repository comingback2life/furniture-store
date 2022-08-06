export const adminAuthMiddleware = (req, res, next) => {
	try {
		console.log(req.header);
		//get the JWT token from header
		//check if the JWT token is valid and not expired.
		// check if exists in Database
		//get user info and attach to the req.body
	} catch (error) {
		next(error);
	}
};
