import express from 'express';
const router = express.Router();

router.get('/', (req, res, next) => {});
router.post('/', (req, res, next) => {
	console.log(req.body);
	res.json({
		status: 'success',
		message: 'POST route to product successfully hit',
	});
});
router.put('/', (req, res, next) => {});
router.patch('/', (req, res, next) => {});
router.delete('/', (req, res, next) => {});

export default router;
