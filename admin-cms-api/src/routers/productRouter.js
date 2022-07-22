import express from 'express';
import slugify from 'slugify';
import { newProductsValidation } from '../middlewares/joi-validations/productsValidation.js';
import {
	deleteManyProducts,
	getMultipleProducts,
	getProduct,
	insertProduct,
} from '../models/product/Product.model.js';
const router = express.Router();

router.get('/:_id?', async (req, res, next) => {
	//optional IDs
	const { _id } = req.params;
	try {
		const products = _id ? await getProduct() : await getMultipleProducts();

		res.json({
			status: 'success',
			message: 'Products listing successful',
			products,
		});
	} catch (error) {
		error.status = 500;
		next(error);
	}
});
router.post('/', newProductsValidation, async (req, res, next) => {
	try {
		const { name } = req.body;
		const slug = slugify(name, {
			trim: true,
			lower: true,
		});
		const result = await insertProduct({ ...req.body, slug });
		result?._id
			? res.json({
					status: 'success',
					message: 'Product added successfully',
			  })
			: res.json({
					status: 'error',
					message: 'Product could not be added',
			  });
	} catch (error) {
		//duplicate slug and SKU should be checked
		if (error.message.includes('E11000 duplicate key error collection')) {
			error.message = 'Another product with similar name or SKU already exists';
			error.status = 200;
		}
		next(error);
	}
});
router.put('/', (req, res, next) => {});
router.patch('/', (req, res, next) => {});
router.delete('/', async (req, res, next) => {
	try {
		const ids = req.body;
		if (ids.length) {
			const result = await deleteManyProducts(ids);
			if (result?.deletedCount) {
				return res.json({
					status: 'success',
					message: 'Succesfully deleted products',
				});
			}
		}
		res.json({
			status: 'error',
			message: 'Unable to delete the product, please try again later',
		});
		console.log(req.body, 'From Delete');
	} catch (error) {
		next(error);
	}
});

export default router;
