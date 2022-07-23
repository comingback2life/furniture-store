import express from 'express';

const router = express.Router();

router.post('/', async (req, res, next) => {
	try {
		console.log(req.body);
		res.json({
			status: 'success',
			message: 'to do ',
		});
	} catch (error) {
		error.status = 500;
		if (error.message.includes('E11000 duplicate key error')) {
			error.status = 200;
			error.message = 'Category already exists.';
		}
		next(error);
	}
});

router.get('/', async (req, res, next) => {
	try {
		// const filter = {
		// 	status: 'active',
		// };
		// const result = await getAllCategories();
		res.json({
			status: 'success',
			message: 'Payment Methods Found',
		});
	} catch (error) {
		next(error);
	}
});

//delete categories
router.delete('/:_id', async (req, res, next) => {
	try {
		const { _id } = req.params;
		console.log(_id);
		res.json({
			status: 'success',
			message: 'The payment method has been deleted',
		});
	} catch (error) {
		next(error);
	}
});

router.patch('/', async (req, res, next) => {
	try {
		console.log(req.body);
		res.json({
			status: 'success',
			message: 'to do update post',
		});
	} catch (error) {
		next(error);
	}
});

export default router;
