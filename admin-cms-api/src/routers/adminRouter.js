import express from 'express';
import { encryptPassword } from '../helpers/bCryptHelper.js';
import { newAdminValidator } from '../middlewares/joi-validations/adminValidator.js';
import { insertAdmin } from '../models/admin/Admin.models.js';
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
		const result = await insertAdmin(req.body);
		result?._id
			? res.json({
					status: 'success',
					message: 'New admin has been created succesfully',
			  })
			: res.json({
					status: 'success',
					message: 'Unable to create admin',
			  });
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
