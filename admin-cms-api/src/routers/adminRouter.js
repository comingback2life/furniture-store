import express from 'express';
import { encryptPassword } from '../helpers/bCryptHelper.js';
import { newAdminValidator } from '../middlewares/joi-validations/adminValidator.js';
import { insertAdmin } from '../models/admin/Admin.models.js';
import { v4 as uuidv4 } from 'uuid';
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
		if (result?._id) {
			//create unique url and send it to the user
			const activationLink = `${process.env.ROOT_URL}/admin/verify-email/?c=${result.emailValidationCode}&e=${result.email}`;
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
router.patch('/', (req, res) => {
	res.json({
		status: 'success',
		message: 'Pacth Route for Admin got Hit',
	});
});

export default router;
