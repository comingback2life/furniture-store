import express from 'express';
import {
	emailVerificationValidation,
	newAdminValidator,
	loginValidation,
	updateAdminValidation,
	updateAdminPasswordValidation,
} from '../middlewares/joi-validations/adminValidator.js';
import {
	insertAdmin,
	updateAdmin,
	getAdmin,
	getAdminFiltered,
} from '../models/admin/Admin.models.js';
import { v4 as uuidv4 } from 'uuid';
import {
	OTPSendNotification,
	profileUpdateNotification,
	sendMail,
} from '../helpers/emailHelper.js';
import { encryptPassword, verifyPassword } from '../helpers/bCryptHelper.js';
import {
	deleteFromSession,
	getSession,
	insertSession,
} from '../models/session/Session.model.js';
import { createOTP } from '../helpers/randomGeneratorHelper.js';
import {
	createJWTs,
	signAccessJWT,
	verifyRefreshJWT,
} from '../helpers/jwtHelper.js';
import { adminAuthMiddleware } from '../middlewares/auth-middleware/authMiddleware.js';

const router = express.Router();

router.get('/', adminAuthMiddleware, (req, res) => {
	try {
		const user = req.adminInformation;
		user.password = undefined;
		user.adminInformation = undefined;
		res.json({
			status: 'success',
			message: 'Get Route for Admin got Hit',
			user,
		});
	} catch (error) {
		next(error);
	}
});

router.post(
	'/',
	adminAuthMiddleware,
	newAdminValidator,
	async (req, res, next) => {
		try {
			const hashPassword = encryptPassword(req.body.userPassword);
			req.body.userPassword = hashPassword;
			req.body.emailValidationCode = uuidv4();
			//create unique email validation code for email validation
			const result = await insertAdmin(req.body);
			if (result?._id) {
				//create unique url and send it to the user
				const activationLink = `${process.env.ROOT_URL}/admin/verify-email/?c=${result.emailValidationCode}&e=${result.email}`;
				sendMail({ fName: result.fName, activationLink });
				res.json({
					status: 'success',
					message: 'New admin has been created succesfully',
				});
			} else {
				res.json({
					status: 'success',
					message: 'Unable to create admin',
				});
			}
		} catch (error) {
			error.status = 500;
			if (error.message.includes('E11000 duplicate key error')) {
				(error.message = 'Email already exists'), (error.status = 400);
			}
			next(error);
		}
	}
);

router.post('/verify-email', emailVerificationValidation, async (req, res) => {
	const filter = req.body;
	const update = { $set: { status: 'active', emailValidationCode: '' } };
	const result = await getAdminFiltered(filter, update);
	console.log(result);
	if (result?._id) {
		return res.json({
			status: 'success',
			message: 'Email Succesfully Verified',
		});
		// await getAdminFiltered(filter, { emailValidationCode: null });
	}
	res.json({
		status: 'Invalid',
		message: 'Expired verification link',
	});
});
router.post('/login', loginValidation, async (req, res, next) => {
	try {
		const { email, userPassword } = req.body;

		// query get user by email
		const user = await getAdmin({ email });

		if (user?._id) {
			if (user.status === 'inactive')
				return res.json({
					status: 'error',
					message:
						'Your account is not active yet, Please check your email and follow the instruction to activate your account.',
				});

			//if user exist compare password,
			const isMatched = verifyPassword(userPassword, user.userPassword);
			if (isMatched) {
				user.userPassword = undefined;
				user.refreshJWT = undefined;
				//for now
				const tokensJWT = await createJWTs({ email: user.email });

				res.json({
					status: 'success',
					message: 'User logged in successfully',
					user,
					...tokensJWT, //rather than having a tokensJWT object, we spread it so that we can access accessJWT and refreshJWT
				});

				return;
			}

			// if match, process for crateing JWT and etc.... for future
			// for now, send login sccess message with user
		}

		res.status(401).json({
			status: 'error',
			message: 'Invalid login credentials',
		});
		//check for the authentication.
	} catch (error) {
		error.status = 500;
		next(error);
	}
});
router.patch('/', (req, res) => {
	res.json({
		status: 'success',
		message: 'Patch Route for Admin got Hit',
	});
});

//update admin profile

router.put(
	'/',
	adminAuthMiddleware,
	updateAdminValidation,
	async (req, res, next) => {
		try {
			const { email, userPassword } = req.body;
			const user = await getAdmin({ email });
			if (user?._id) {
				const isMatched = verifyPassword(userPassword, user.userPassword);
				if (isMatched) {
					const { _id, userPassword, ...rest } = req.body;
					console.log({ _id }, rest);
					const updatedAdmin = await updateAdmin({ _id }, rest);
					if (updatedAdmin?._id) {
						//send email if the admin profile has been updated
						return res.json({
							status: 'success',
							message: 'Your profile has been updated succesfully',
							user: updatedAdmin,
						});
					}
				}
			}
			res.json({
				status: 'success',
				message: 'Invalid request, the profile could not be updated',
			});
		} catch (error) {
			error.status = 500;
			next(error);
		}
	}
);

// password reset via OTP

router.post('/otp-request', async (req, res, next) => {
	try {
		const { email } = req.body;
		if (email) {
			const user = await getAdmin({ email });
			if (user?._id) {
				//Create OTP and send Email

				const dataObj = {
					token: createOTP(),
					associate: email,
					type: 'passwordReset',
				};
				const result = await insertSession(dataObj);
				if (result?._id) {
					res.json({
						status: 'success',
						message:
							'Please check your email. If the email exists, the OTP will be sent.',
					});

					return OTPSendNotification({
						token: result.token,
						email: result.associate,
					});
				}
			}
		}
		res.json({
			status: 'error',
			message: 'Invalid Request',
		});
	} catch (error) {
		error.status = 500;
		next(error);
	}
});

//reset password

router.patch('/password', async (req, res, next) => {
	try {
		const { OTP, email, password } = req.body;
		const session = await deleteFromSession({
			token: OTP,
			associate: email,
		});
		const updateObj = {
			userPassword: encryptPassword(password),
		};
		if (session?._id) {
			const updatedAdmin = await updateAdmin({ email }, updateObj);
			if (updatedAdmin._id) {
				profileUpdateNotification({
					fName: updatedAdmin.fName,
					email: updatedAdmin.email,
				});
				return res.json({
					status: 'success',
					message: 'Password has been updated',
				});
			}
		}
		res.json({
			status: 'error',
			message: 'Could not update user, please check OTP and try again',
		});
	} catch (error) {
		next(error);
	}
});

//Update password when the admin is logged in.
router.patch(
	'/update-password',
	adminAuthMiddleware,
	updateAdminPasswordValidation,
	async (req, res, next) => {
		try {
			const { currentPassword, email, userPassword } = req.body; //currentPassword -> the password being used by the user
			const user = await getAdmin({ email });
			console.log(currentPassword, 'isHere');
			if (user?._id) {
				const isMatched = verifyPassword(currentPassword, user.userPassword); //verify if the user password and the currentPassword is same
				console.log(isMatched);
				if (isMatched) {
					const hashPassword = encryptPassword(userPassword);
					const updatedUser = await updateAdmin(
						{
							_id: user._id, // filter by UserID
						},
						{ userPassword: hashPassword } //replace the userPassword with the new hash
					);
					if (updatedUser._id) {
						profileUpdateNotification({
							fName: updatedUser.fName,
							email: updatedUser.email,
						});

						return res.json({
							status: 'success',
							message: 'Your password has been updated successfully',
						});
					}
				}
			}
			res.json({
				status: 'error',
				message: 'Could not update password, please try again later.',
			});
		} catch (error) {
			error.status = 500;
			next(error);
		}
	}
);

//Return a new access token for login

router.get('/accessjwt', async (req, res, next) => {
	try {
		const refreshJWT = req.headers.authorization;
		console.log(refreshJWT);
		const decodedJWT = verifyRefreshJWT(refreshJWT);
		if (decodedJWT?.email) {
			const user = await getAdmin({ email: decodedJWT.email, refreshJWT });
			if (user?._id) {
				const accessJWT = await signAccessJWT({ email: decodedJWT.email });
				return res.json({
					status: 'success',
					accessJWT,
				});
			}
		}
		res.status(401).json({
			status: 'error',
			message: 'Please login again! ',
		});
	} catch (error) {
		console.log(error);
		next(error);
	}
});

export default router;
