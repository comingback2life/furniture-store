import express from 'express';
import { newCategoryValidation } from '../middlewares/joi-validations/categoryValidation.js';
import { insertCategory } from '../models/category/Category.models.js';
import slugify from 'slugify';
const router = express.Router();

router.post('/', newCategoryValidation, async (req, res, next) => {
	//newCategoryvalidation is validating if there are two properties that remain
	try {
		const slug = slugify(req.body.catName, {
			lower: true,
			trim: true,
		});
		req.body.catName = slug;
		const result = await insertCategory(req.body);
		console.log(result);
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
		console.log(error);
		error.status = 500;
		next(error);
	}
});

export default router;
