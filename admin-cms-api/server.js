import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { newAdminValidator } from './src/middlewares/joi-validations/adminValidator.js';
const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

//dbConnection
import { mongoConnect } from './src/config/dbConfig.js';
mongoConnect();

import adminRouter from './src/routers/adminRouter.js';

app.use('/api/v1/admin', newAdminValidator, adminRouter);
app.listen(8000, (req, res) => {
	console.log('Listening to port 8000');
});
