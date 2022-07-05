import 'dotenv/config';
import express from 'express';
const app = express();

app.listen(8000, (req, res) => {
	console.log('Listening to port 8000');
});
