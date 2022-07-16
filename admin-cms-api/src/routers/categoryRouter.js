import express from 'express';
import { newCategoryValidation } from '../middlewares/joi-validations/categoryValidation.js';
import {
	getCategories,
	insertCategory,
	updateCategory,
} from '../models/category/Category.models.js';
import slugify from 'slugify';
const router = express.Router();

router.post('/', newCategoryValidation, async (req, res, next) => {
	//newCategoryvalidation is validating if there are two properties that remain
	try {
		const slug = slugify(req.body.catName, {
			lower: true,
			trim: true,
		});
		const result = await insertCategory({ ...req.body, slug });
		result?._id
			? res.json({
					status: 'success',
					message: 'New Category has been added',
			  })
			: res.json({
					status: 'error',
					message: 'Category could not be added, please try again later',
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
		const filter = {
			status: 'active',
		};
		const result = await getCategories(filter);
		res.json({
			status: 'success',
			message: 'Categories Found',
			result,
		});
	} catch (error) {
		next(error);
	}
});
//update status of a category
router.patch('/', async (req, res, next) => {
	try {
		const { _id, status } = req.body;
		if (!_id || !status) {
			throw new error('Invalid Datase');
		}
		const result = await updateCategory(_id, { status });
		result?._id
			? res.json({
					status: 'success',
					message: 'Category has been updated.',
					result,
			  })
			: res.json({
					status: 'error',
					message: 'Unable to update category',
					result,
			  });
	} catch (error) {
		error.status = 500;
		if (error.message.includes('Cast to ObjectId failed')) {
			(error.status = 200), (error.message = 'Invalid ID supplied');
		}
		next(error);
	}
});
export default router;
