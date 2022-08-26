import SessionSchema from './Session.schema.js';

export const insertSession = (dataObj) => {
	return SessionSchema(dataObj).save();
};

export const getSession = (filter) => {
	return SessionSchema.findOne(filter);
};

export const deleteFromSession = (filter) => {
	try {
		return SessionSchema.findOneAndDelete(filter);
	} catch (error) {
		return error.message;
	}
};
