import express from 'express';
import slugify from 'slugify';
import multer from 'multer';
import {
	newProductsValidation,
	updateProductsValidation,
} from '../middlewares/joi-validations/productsValidation.js';
import {
	deleteManyProducts,
	getMultipleProducts,
	getProduct,
	insertProduct,
	updateProductById,
} from '../models/product/Product.model.js';
const router = express.Router();

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		console.log(file);
		let error = null;
		cb(error, 'public/img/products');
	},
	filename: (req, file, cb) => {
		const fullFileName = Date.now() + '-' + file.originalname; //unique file name so that the image is not overriden
		cb(null, fullFileName);
	},
});

const upload = multer({ storage });

router.get('/:_id?', async (req, res, next) => {
	//optional IDs
	const { _id } = req.params;
	try {
		const products = _id
			? await getProduct({ _id })
			: await getMultipleProducts();

		res.json({
			status: 'success',
			message: 'Products listing successful',
			products,
		});
	} catch (error) {
		error.status = 500;
		next(error);
	}
});
router.post(
	'/',
	upload.array('images', 5),
	newProductsValidation,
	async (req, res, next) => {
		try {
			const filePaths = req.files?.map((image) => image.path); //req.body has an object called files which holds the files
			const { name } = req.body;
			const slug = slugify(name, {
				trim: true,
				lower: true,
			});
			const result = await insertProduct({
				...req.body,
				slug,
				images: filePaths,
				thumbnailImage: filePaths[0],
			}); //filePaths consist the image-paths and images is the name in the schema
			result?._id
				? res.json({
						status: 'success',
						message: 'Product added successfully',
				  })
				: res.json({
						status: 'error',
						message: 'Product could not be added',
				  });
		} catch (error) {
			//duplicate slug and SKU should be checked
			if (error.message.includes('E11000 duplicate key error collection')) {
				error.message =
					'Another product with similar name or SKU already exists';
				error.status = 200;
			}
			next(error);
		}
	}
);
router.put(
	'/',
	upload.array('productImages', 5),
	updateProductsValidation,
	async (req, res, next) => {
		try {
			const { _id, imageToDelete, ...rest } = req.body; //imageToDelete holds the images that need to be deleted
			const files = req.files; //image coming from the form

			//make new array for the images and replace in the database
			const images = files.map((img) => img.path);
			const oldImageList = rest.images; //old images from the database
			const filteredImages = oldImageList.filter(
				(images) => !imageToDelete.includes(images)
			); //filter the old imagelist from the database if it is included in the imageToDeleteList

			rest.images = [...filteredImages, ...images]; //filteredImages consists of the new imageList and the images are the newly addeded image from the form
			//delete image from the file system
			const result = await updateProductById(_id, rest);
			result?._id
				? res.json({
						status: 'success',
						message: 'Product has been updated',
				  })
				: res.json({
						status: 'error',
						message: 'Unable to update product. Please try again later',
				  });
		} catch (error) {
			next(error);
		}
	}
);
router.patch('/', (req, res, next) => {});
router.delete('/', async (req, res, next) => {
	try {
		const ids = req.body;
		if (ids.length) {
			const result = await deleteManyProducts(ids);
			if (result?.deletedCount) {
				return res.json({
					status: 'success',
					message: 'Succesfully deleted products',
				});
			}
		}
		res.json({
			status: 'error',
			message: 'Unable to delete the product, please try again later',
		});
	} catch (error) {
		next(error);
	}
});

export default router;
