import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema(
	{
		fName: {
			type: String,
			required: true,
			trim: true,
			maxlength: [20, 'First name should be less than 20 characters'],
		},
		lName: {
			type: String,
			required: true,
			trim: true,
			maxlength: [50, 'Last name should be less than 50 characters'],
		},
		dob: {
			type: Date,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			unique: true,
			maxLength: [50, 'Email should be less than 50 characters'],
			index: 1,
		},
		phone: {
			type: String,
			required: true,
			trim: true,
			maxLength: [15, 'Phone number cannot be more than 15 characters'],
			minlength: [9, 'Phone number cannot be less than 9 characters'],
		},
		userPassword: {
			required: true,
		},
		address: {
			type: String,
			default: null,
		},
	},
	{
		timestamps: true,
	}
);
export default mongoose.model('admin', adminSchema);
