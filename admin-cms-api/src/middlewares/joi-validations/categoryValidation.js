import Joi from 'joi';
import { SHORTSTR, LONGSTR, validator } from './constantValidators.js';

export const newCategoryValidation = (req, res, next) => {
	try {
		const schema = Joi.object({
			_id: SHORTSTR.allow(''),
			parentCatId: LONGSTR.allow('').allow(null),
			catName: SHORTSTR.required(),
			status: SHORTSTR.required(),
		});
		validator(schema, req, res, next);
	} catch (error) {
		next(error);
	}
};
