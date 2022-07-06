import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
	res.json({
		status: 'success',
		message: 'Get Route for Admin got Hit',
	});
});
router.post('/', (req, res) => {
	console.log(req.body);
	res.json({
		status: 'success',
		message: 'Post Route for Admin got Hit',
	});
});
router.patch('/', (req, res) => {
	res.json({
		status: 'success',
		message: 'Pacth Route for Admin got Hit',
	});
});

export default router;
