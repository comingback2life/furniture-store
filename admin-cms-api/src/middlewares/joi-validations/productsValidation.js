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
		const schema = Joi.object({
			_id: SHORTSTR.allow(''),
			status: SHORTSTR,
			name: SHORTSTR.required(),
			SKU: SHORTSTR.required(),
			description: LONGSTR.required(),
			quantity: QUANTITY.required(),
			price: PRICE.required(),
			salePrice: PRICE.required(),
			saleDate: DATE.allow(null),
		});
		validator(schema, req, res, next);
	} catch (error) {
		next(error);
	}
};
