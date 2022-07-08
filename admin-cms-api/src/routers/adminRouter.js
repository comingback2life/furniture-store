import express from 'express';
import {
	emailVerificationValidation,
	newAdminValidator,
	loginValidation,
} from '../middlewares/joi-validations/adminValidator.js';
import {
	insertAdmin,
	updateAdmin,
	getAdmin,
} from '../models/admin/Admin.models.js';
import { v4 as uuidv4 } from 'uuid';
import { sendActivationEmail } from '../helpers/emailHelper.js';
import { encryptPassword, verifyPassword } from '../helpers/bCryptHelper.js';
const router = express.Router();

router.get('/', (req, res) => {
	res.json({
		status: 'success',
		message: 'Get Route for Admin got Hit',
	});
});

router.post('/', newAdminValidator, async (req, res, next) => {
	try {
		const hashPassword = encryptPassword(req.body.userPassword);
		req.body.userPassword = hashPassword;
		req.body.emailValidationCode = uuidv4();
		//create unique email validation code for email validation
		const result = await insertAdmin(req.body);
		console.log(result);
		if (result?._id) {
			//create unique url and send it to the user
			const activationLink = `${process.env.ROOT_URL}/admin/verify-email/?c=${result.emailValidationCode}&e=${result.email}`;
			sendActivationEmail({ fName: result.fName, activationLink });
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
});

router.post('/verify-email', emailVerificationValidation, async (req, res) => {
	//URL endpoint for email verification
	const filter = req.body;
	const update = {
		status: 'active',
		emailValidationCode: '',
	};
	const result = await updateAdmin(filter, update);
	result?._id
		? res.json({
				status: 'success',
				message: 'Email verified successfully, You may login now!',
		  })
		: res.json({
				status: 'error',
				message: 'Invalid or Expired Verification Link',
		  });
});
router.post('/login', loginValidation, async (req, res, next) => {
	try {
		const { email, userPassword } = req.body;

		// query get user by email
		const user = await getAdmin({ email });
		user.status === 'inactive' &&
			res.json({
				status: 'error',
				message: 'Your account is not active yet, please check your email !',
			});
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
				//for now
				res.json({
					status: 'success',
					message: 'User logged in successfully',
					user,
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
		message: 'Pacth Route for Admin got Hit',
	});
});

export default router;
