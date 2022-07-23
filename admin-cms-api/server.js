import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

//dbConnection
import { mongoConnect } from './src/config/dbConfig.js';
mongoConnect();

import adminRouter from './src/routers/adminRouter.js';
import categoryRouter from './src/routers/categoryRouter.js';
import productRouter from './src/routers/productRouter.js';
import paymentMethodRouter from './src/routers/paymentMethodRouter.js';

app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/payment-methods', paymentMethodRouter);
//app error handling
app.use((err, req, res, next) => {
	console.log(err);
	res.status(err.status || 400);
	//log the error in file system of time series DB like cloudWatch
	res.json({
		status: 'error',
		message: err.message,
	});
});
app.listen(8000, (error) => {
	error ? console.log(error) : console.log('Server is runnning on PORT 8000');
});
