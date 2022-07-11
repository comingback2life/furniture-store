import express from 'express';
const router = express.Router();

router.post('/', (req, res, next) => {
	try {
		console.log(req.body);
		res.json({
			status: 'success',
			message: 'Post Request to category has been received',
		});
	} catch (error) {
		console.log(error);
		error.status = 500;
		next(error);
	}
});

export default router;