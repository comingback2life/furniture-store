import mongoose from 'mongoose';
export const mongoConnect = () => {
	try {
		const connectionString = process.env.MONGO_CLIENT;
		const conn = mongoose.connect(connectionString);
		conn && console.log('Database has been connected');
	} catch (error) {
		console.log(error.message);
	}
};
