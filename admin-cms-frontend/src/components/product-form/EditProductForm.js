import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { CustomInput } from '../custom-input/CustomInput';
import { fetchCategoriesAction } from '../../pages/categories/CategoriesAction';
import {
	postProductsAction,
	updateProductAction,
} from '../../pages/product/productActions';

export const EditProductForm = () => {
	const dispatch = useDispatch();

	const { categories } = useSelector((state) => state.categories);
	const { selectedProducts } = useSelector((state) => state.products);
	const [productImages, setProductImages] = useState([]);
	const [imageToDelete, setImageToDelete] = useState([]);

	const [form, setForm] = useState({});
	useEffect(() => {
		dispatch(fetchCategoriesAction()) && setForm(selectedProducts);
	}, [selectedProducts]);

	const handleOnChange = (e) => {
		let { checked, name, value } = e.target;
		if (name === 'status') {
			value = checked ? 'active' : 'inactive';
		}
		setForm({
			...form,
			[name]: value,
		});
	};

	const handleOnImageSelect = (e) => {
		const { files } = e.target;
		setProductImages(files);
	};

	const handleOnImageDelete = (e) => {
		const { name, checked, value } = e.target;
		if (checked) {
			setImageToDelete([...imageToDelete, value]);
		} else {
			setImageToDelete(imageToDelete.filter((imgPath) => imgPath !== value));
		}
	};

	console.log(form);
	const handleOnSubmit = (e) => {
		e.preventDefault();

		if (!form.status) {
			form.status = 'inactive';
		}
		if (!window.confirm('Are you sure you want to update the product')) return;

		const { __v, updatedAt, slug, SKU, ratings, createdAt, ...rest } = form;
		rest.salePrice = Number(rest.salePrice) ? +rest.salePrice : 0;
		rest.saleEndDate = rest.saleEndDate ? rest.saleEndDate : 'null';
		rest.saleStartDate = rest.saleStartDate ? rest.saleStartDate : 'null';

		const formData = new FormData();
		for (const key in rest) {
			formData.append(key, rest[key]); //append formData in key:value pair
		}
		productImages.length &&
			[...productImages].map((img) => formData.append('productImages', img));
		formData.append('imageToDelete', imageToDelete);
		dispatch(updateProductAction(formData));
	};
	const inputFields = [
		{
			name: 'name',
			label: 'Product Name',
			type: 'text',
			placeholder: 'Product Name',
			required: true,
			value: form.name,
		},
		{
			name: 'slug',
			label: 'Slug',
			type: 'text',
			placeholder: 'Slug',
			required: true,
			value: form.slug,
			disabled: true,
		},
		{
			name: 'SKU',
			label: 'SKU',
			type: 'text',
			placeholder: 'SKU',
			required: true,
			value: form.SKU,
			disabled: true,
		},
		{
			name: 'quantity',
			label: 'Quantity',
			type: 'number',
			placeholder: '10',
			required: true,
			value: form.quantity,
		},
		{
			name: 'images',
			type: 'file',
			multiple: true,
			accept: 'image/*',
			onChange: handleOnImageSelect,
			label: 'Images',
		},
		{
			name: 'price',
			label: 'Price',
			type: 'number',
			placeholder: '100',
			required: true,
			value: form.price,
		},

		{
			name: 'salePrice',
			label: 'Sale Price',
			type: 'number',
			placeholder: '80',
			value: form.salePrice,
		},
		{
			name: 'saleStartDate',
			label: 'Sale Start Date',
			type: 'date',
			value: form.saleStartDate ? form.saleStartDate.split('T')[0] : '',
		},
		{
			name: 'saleEndDate',
			label: 'Sale End Date',
			type: 'date',
			value: form.saleEndDate ? form.saleEndDate.split('T')[0] : '',
		},
		{
			name: 'description',
			label: 'Description',
			as: 'textarea',
			rows: 10,
			placeholder: 'Product Description',
			required: true,
			value: form.description,
		},
	];

	return (
		<Form className="mb-5" onSubmit={handleOnSubmit}>
			<Form.Group className="mb-3">
				<Form.Check
					name="status"
					type="switch"
					id="custom-switch"
					label="Status"
					onChange={handleOnChange}
					checked={form.status === 'active'}
				/>
			</Form.Group>
			<Form.Group className="mb-3">
				<Form.Select
					name="catId"
					defaultValue="Choose..."
					onChange={handleOnChange}
					required
				>
					<option value="">**Select Category**</option>
					{categories.map((item) => {
						return (
							<option
								value={item._id}
								key={item._id}
								selected={item._id === selectedProducts.catId}
							>
								{item.catName}
							</option>
						);
					})}
				</Form.Select>
			</Form.Group>
			{inputFields.map((item, i) => {
				return (
					<CustomInput
						key={i}
						{...item}
						onChange={
							item.name === 'images' ? handleOnImageSelect : handleOnChange
						}
					/>
				);
			})}
			<hr />
			<div className="d-flex">
				{selectedProducts.images &&
					selectedProducts.images.length > 0 &&
					selectedProducts.images.map((imageLink) => (
						<div className="imgs p-1">
							<Form.Check
								label="Thumbnail ?"
								onChange={handleOnChange}
								name="thumbnailImage"
								value={imageLink}
								type="radio"
							></Form.Check>
							<img
								src={
									process.env.REACT_APP_IMAGE_SERVER_URL + imageLink.substr(6)
								}
								crossorigin="anonymous"
								alt="product-img"
								key={imageLink}
								width="150px"
								className="img-thumbnail rounded"
							/>

							<Form.Check
								label="Delete"
								value={imageLink}
								onChange={handleOnImageDelete}
							></Form.Check>
						</div>
					))}
			</div>
			<Button variant="warning" type="submit">
				Update Product
			</Button>
		</Form>
	);
};
