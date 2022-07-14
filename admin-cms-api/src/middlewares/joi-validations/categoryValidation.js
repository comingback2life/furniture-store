import Joi from 'joi';
import { SHORTSTR, LONGSTR, validator } from './constantValidators.js';

export const newCategoryValidation = (req, res, next) => {
	try {
		const schema = Joi.object({
			parentCat: LONGSTR.allow(''),
			catName: SHORTSTR.required(),
		});
		validator(schema, req, res, next);
	} catch (error) {
		next(error);
	}
};
