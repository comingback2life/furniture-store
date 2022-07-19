import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
	{
		status: {
			type: String,
			required: true,
			default: 'inactive',
		},
		name: {
			type: String,
			required: true,
			maxLength: [
				100,
				'Name of a product cannot be no longer than 100 characters',
			],
		},
		SKU: {
			type: String,
			unique: true,
			index: 1,
			required: true,
			maxLength: [20, 'SKU cannot be more than 20 characters'],
			trim: true,
		},
		slug: {
			type: String,
			unique: true,
			index: 1,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			required: true,
			maxLength: 5000,
		},
		catId: {
			type: mongoose.Schema.Types.ObjectId,
			default: null,
			ref: 'Category',
		},
		quantity: {
			type: Number,
			required: true,
			default: 0,
		},
		image: [
			{
				type: String,
				required: true,
				default: '',
			},
		],
		thumbnailImage: {
			type: String,
			//required: true,
			default: '',
		},
		price: {
			type: Number,
			required: true,
			default: 0,
		},
		salePrice: {
			type: Number,
			default: 0,
		},
		saleDate: {
			type: Date,
			default: null,
		},
		ratings: {
			type: Number,
			max: 5,
			default: 5,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model('Product', productSchema);
