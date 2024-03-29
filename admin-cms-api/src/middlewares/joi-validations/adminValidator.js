import Joi from 'joi';
import {
	FNAME,
	LNAME,
	EMAIL,
	PHONE,
	ADDRESS,
	DATE,
	PASSWORD,
	REQUIREDSTR,
	validator,
	LONGSTR,
} from './constantValidators.js';

export const newAdminValidator = (req, res, next) => {
	const schema = Joi.object({
		fName: FNAME,
		lName: LNAME,
		email: EMAIL,
		phone: PHONE,
		dob: DATE,
		address: ADDRESS,
		userPassword: PASSWORD,
	});

	validator(schema, req, res, next);
};

export const updateAdminValidation = (req, res, next) => {
	const schema = Joi.object({
		_id: LONGSTR.required(),
		fName: FNAME,
		lName: LNAME,
		email: EMAIL,
		phone: PHONE,
		dob: DATE,
		address: ADDRESS,
		userPassword: PASSWORD,
	});

	validator(schema, req, res, next);
};
export const emailVerificationValidation = (req, res, next) => {
	const schema = Joi.object({
		email: EMAIL,
		emailValidationCode: REQUIREDSTR,
	});

	validator(schema, req, res, next);
};

export const loginValidation = (req, res, next) => {
	const schema = Joi.object({
		email: EMAIL,
		userPassword: PASSWORD,
	});

	validator(schema, req, res, next);
};

export const updateAdminPasswordValidation = (req, res, next) => {
	const schema = Joi.object({
		email: EMAIL,
		userPassword: PASSWORD,
		currentPassword: PASSWORD,
	});

	validator(schema, req, res, next);
};
