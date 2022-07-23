import mongoose from 'mongoose';

const PaymentMethodSchema = new mongoose.Schema(
	{
		status: {
			type: String,
			default: 'inactive',
		},
		name: {
			type: String,
			unique: true,
			index: 1,
			maxLength: 100,
			required: true,
		},
		description: {
			type: String,
			default: '',
		},
	},
	{
		timestamps: true,
	}
);
export default mongoose.model('Payment_method', PaymentMethodSchema);
