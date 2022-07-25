import SessionSchema from './Session.schema.js';

export const insertSession = (dataObj) => {
	return SessionSchema(dataObj).save();
};

export const getSession = (filter) => {
	return SessionSchema.findOne(filter);
};

export const deleteSession = (filter) => {
	return SessionSchema.findOneAndDelete(filter);
};
