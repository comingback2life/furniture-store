import PaymentMethodSchema from './PaymentMethod.schema.js';

export const insertPaymentMethod = (obj) => {
	return PaymentMethodSchema(obj).save();
};

export const getPaymentMethod = (filter) => {
	return PaymentMethodSchema.findOne(filter);
};

export const getAllPaymentMethods = () => {
	//for admin to provide unfiltered results.
	return PaymentMethodSchema.find();
};
export const getOnePaymentMethod = (filter) => {
	return PaymentMethodSchema.findOne(filter);
};

export const deletePaymentMethodById = (_id) => {
	return PaymentMethodSchema.findByIdAndDelete(_id);
};

//@updateObj must be an obj and ID should be a string
export const updatePaymentMethod = (_id, updateObj) => {
	return PaymentMethodSchema.findByIdAndUpdate(_id, updateObj, { new: true });
};
