import ProductSchema from './Product.schema.js';

export const insertProduct = (dataObj) => {
	return ProductSchema(dataObj).save();
};

export const getProduct = (filter) => {
	return ProductSchema.findOne(filter);
};

export const getMultipleProducts = (filter) => {
	return ProductSchema.find(filter);
};
export const updateProduct = (filter, updateObj) => {
	return ProductSchema.findOneAndUpdate(filter, updateObj, { new: true });
};
export const deleteProduct = (filter) => {
	return ProductSchema.findOneAndDelete(filter);
};

export const deleteManyProducts = (ids) => {
	return ProductSchema.deleteMany({
		_id: {
			$in: ids,
		},
	});
};
