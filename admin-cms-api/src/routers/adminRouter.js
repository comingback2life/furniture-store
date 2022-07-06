import express from 'express';
import { newAdminValidator } from '../middlewares/joi-validations/adminValidator';
const router = express.Router();

router.get('/', (req, res) => {
	res.json({
		status: 'success',
		message: 'Get Route for Admin got Hit',
	});
});
router.post('/', newAdminValidator, (req, res) => {
	console.log(req.body);
	res.json({
		status: 'success',
		message: 'Post Route for Admin got Hit',
	});
});
router.patch('/', (req, res) => {
	res.json({
		status: 'success',
		message: 'Pacth Route for Admin got Hit',
	});
});

export default router;
