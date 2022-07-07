import Joi from 'joi';

const fName = Joi.string().alphanum().required().min(3).max(20);
const lName = Joi.string().required().min(3).max(20);
const email = Joi.string().email({ minDomainSegments: 2 }).required();
const phone = Joi.string().required().min(10).max(15);
const dob = Joi.date().allow(null);
const address = Joi.string().allow(null).allow('');
const userPassword = Joi.string().required();
const requiredStr = Joi.string().required();

const validator = (schema, req, res, next) => {
	const { value, error } = schema.validate(req.body);

	if (error) {
		console.log(error);
		return res.json({
			status: 'error',
			message: error.message,
		});
	}

	next();
};

export const newAdminValidator = (req, res, next) => {
	const schema = Joi.object({
		fName,
		lName,
		email,
		phone,
		dob,
		address,
		userPassword,
	});

	validator(schema, req, res, next);
};

export const emailVerificationValidation = (req, res, next) => {
	const schema = Joi.object({
		email: email,
		emailValidationCode: requiredStr,
	});

	validator(schema, req, res, next);
};

export const loginValidation = (req, res, next) => {
	const schema = Joi.object({
		email,
		userPassword,
	});

	validator(schema, req, res, next);
};
