import express from 'express';
import { newPaymentMethodValidation } from '../middlewares/joi-validations/paymentValidation.js';
import {
	deletePaymentMethodById,
	getAllPaymentMethods,
	getPaymentMethod,
	insertPaymentMethod,
	updatePaymentMethod,
} from '../models/payment-methods/PaymentMethod.model.js';
const router = express.Router();

router.post('/', newPaymentMethodValidation, async (req, res, next) => {
	try {
		const result = await insertPaymentMethod(req.body);
		result?._id
			? res.json({
					status: 'success',
					message: 'Payment method has been added successfully.',
			  })
			: res.json({
					status: 'error',
					message: 'Payment method could not be added.',
			  });
	} catch (error) {
		error.status = 500;
		if (error.message.includes('E11000 duplicate key error')) {
			error.status = 200;
			error.message = 'Payment method already exists.';
		}
		next(error);
	}
});

router.get('/:_id?', async (req, res, next) => {
	try {
		const { _id } = req.params;
		const result = _id
			? await getPaymentMethod({ _id })
			: await getAllPaymentMethods();
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
router.delete('/:_id', async (req, res, next) => {
	try {
		const { _id } = req.params;
		if (_id) {
			const result = await deletePaymentMethodById(_id);
			if (result?._id) {
				return res.json({
					status: 'success',
					message: 'Payment method has been deleted.',
				});
			}
		}
		res.json({
			status: 'error',
			message: 'The payment method could not be deleted',
		});
	} catch (error) {
		next(error);
	}
});

router.put('/', async (req, res, next) => {
	try {
		const { _id, ...rest } = req.body;
		if (typeof _id === 'string') {
			const result = await updatePaymentMethod(_id, rest);
			if (result?._id) {
				return res.json({
					status: 'success',
					message: 'Payment method has been updatedly successfully.',
				});
			}
		}
		res.json({
			status: 'error',
			message: 'Unable to update payment method. Please try again later.',
		});
	} catch (error) {
		next(error);
	}
});

export default router;
