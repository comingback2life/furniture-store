import CategorySchema from './Category.schema.js';
export const insertCategory = (obj) => {
	return CategorySchema(obj).save();
};

export const getCategories = (filter) => {
	return CategorySchema.find(filter);
};
export const getOneCategory = (filter) => {
	return CategorySchema.findOne(filter);
};

export const deleteCategoryById = (_id) => {
	return CategorySchema.findByIdAndDelete(_id);
};

//@updateObj must be an obj and ID should be a string
export const updateCategory = (_id, updateObj) => {
	return CategorySchema.findByIdAndUpdate(_id, updateObj, { new: true });
};
