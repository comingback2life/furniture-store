import Joi from 'joi';
import {
	SHORTSTR,
	LONGSTR,
	PRICE,
	validator,
	DATE,
	QUANTITY,
} from './constantValidators.js';

export const newProductsValidation = (req, res, next) => {
	try {
		req.body.saleEndDate === 'null' ? null : req.body.saleEndDate;
		req.body.saleStartDate === 'null' ? null : req.body.saleStartDate;
		const schema = Joi.object({
			_id: SHORTSTR.allow(''),
			catId: SHORTSTR.allow(null),
			status: SHORTSTR.required(),
			name: SHORTSTR.required(),
			SKU: SHORTSTR.required(),
			description: LONGSTR.required(),
			quantity: QUANTITY.required(),
			price: PRICE.required(),
			salePrice: PRICE,
			saleEndDate: DATE.allow(null),
			saleStartDate: DATE.allow(null),
		});
		validator(schema, req, res, next);
	} catch (error) {
		next(error);
	}
};
export const updateProductsValidation = (req, res, next) => {
	try {
		req.body.saleEndDate === undefined ? null : req.body.saleEndDate;
		req.body.saleStartDate === undefined ? null : req.body.saleStartDate;

		const schema = Joi.object({
			_id: SHORTSTR.required(),
			catId: SHORTSTR.required(),
			status: SHORTSTR.required(),
			name: SHORTSTR.required(),
			description: LONGSTR.required(),
			quantity: QUANTITY.required(),
			price: PRICE.required(),
			salePrice: PRICE,
			saleEndDate: DATE.allow(null).allow(''),
			saleStartDate: DATE.allow(null).allow(''),
			images: LONGSTR.allow(null).allow(''),
			thumbnailImage: SHORTSTR,
			imageToDelete: LONGSTR.allow(null).allow(''),
		});
		validator(schema, req, res, next);
	} catch (error) {
		next(error);
	}
};
