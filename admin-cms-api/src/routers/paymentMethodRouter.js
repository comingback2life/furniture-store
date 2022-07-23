import express from 'express';

const router = express.Router();

router.post('/', newCategoryValidation, async (req, res, next) => {
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

router.get('/:_id', async (req, res, next) => {
	try {
		const { _id } = req.params;
		console.log(_id);
		// const filter = {
		// 	status: 'active',
		// };
		// const result = await getAllCategories();
		res.json({
			status: 'success',
			message: 'Payment Methods Found',
			result,
		});
	} catch (error) {
		next(error);
	}
});

//delete categories
router.delete('/', async (req, res, next) => {
	try {
		res.json({
			status: 'success',
			message: 'The payment method has been deleted',
		});
	} catch (error) {
		next(error);
	}
});

export default router;
