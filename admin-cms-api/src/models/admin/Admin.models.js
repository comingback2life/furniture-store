import AdminSchema from './Admin.schema';
export const insertAdmin = (adminObj) => {
	return AdminSchema(obj).save();
};
export const getAdminById = (_id) => {
	return AdminSchema.findById(_id);
};
export const getAdmin = (filter) => {
	//filter must be an object
	return AdminSchema.findOne(filter);
};
export const updateAdmin = (filter, updatedObj) => {
	return AdminSchema.findOneAndUpdate(filter, updatedObj, { new: true });
};
