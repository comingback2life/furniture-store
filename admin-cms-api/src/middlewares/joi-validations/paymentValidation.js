import Joi from 'joi';
import { SHORTSTR, LONGSTR, validator } from './constantValidators.js';

export const newPaymentMethodValidation = (req, res, next) => {
	const schema = Joi.object({
		status: SHORTSTR.required(),
		name: SHORTSTR.required(),
		description: LONGSTR.required(),
	});

	validator(schema, req, res, next);
};
