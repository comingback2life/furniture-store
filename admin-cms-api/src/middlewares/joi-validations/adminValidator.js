import Joi from 'joi';
export const newAdminValidator = (req, res, next) => {
	const schema = Joi.object({
		fName: Joi.string().required().min(3).max(20),
		lName: Joi.string().required().min(3).max(50),
		dob: Joi.date().required().allow(null),
		email: Joi.string().email({
			minDomainSegments: 2,
		}),
		phone: Joi.string().min(9).max(15).required(),
		address: Joi.string().required().allow(null).allow(''),
		userPassword: Joi.string().required(),
	});

	const { value, error } = schema.validate(req.body);
	if (error) {
		res.json({
			status: 'error',
			message: error.message,
		});
	}
	next();
};

export const emailVerificationValidation = (req, res, next) => {
	const schema = Joi.object({
		email: Joi.string().email({ minDomainSegments: 2 }).required(),
		emailValidationCode: Joi.string().required(),
	});
	const { error } = schema.validate(req.body);
	if (error) {
		res.json({
			status: 'error',
			message: error.message,
		});
	}
	next();
};
