import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { CustomInput } from '../custom-input/CustomInput';
import { fetchCategoriesAction } from '../../pages/categories/CategoriesAction';
import { postProductsAction } from '../../pages/product/productActions';

export const EditProductForm = () => {
	const dispatch = useDispatch();
	const { categories } = useSelector((state) => state.categories);
	const [form, setForm] = useState({});
	useEffect(() => {
		dispatch(fetchCategoriesAction());
	}, []);

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

	const handleOnSubmit = (e) => {
		e.preventDefault();
		if (!form.status) {
			form.status = 'inactive';
		}
		dispatch(postProductsAction(form));
	};
	const inputFields = [
		{
			name: 'name',
			label: 'Product Name',
			type: 'text',
			placeholder: 'Product Name',
			required: true,
		},
		{
			name: 'SKU',
			label: 'SKU',
			type: 'text',
			placeholder: 'SKU',
			required: true,
		},
		{
			name: 'quantity',
			label: 'Quantity',
			type: 'number',
			placeholder: '10',
			required: true,
		},
		{
			name: 'price',
			label: 'Price',
			type: 'number',
			placeholder: '100',
			required: true,
		},
		{
			name: 'salePrice',
			label: 'Sale Price',
			type: 'number',
			placeholder: '80',
		},
		{
			name: 'saleStartDate',
			label: 'Sale Start Date',
			type: 'date',
		},
		{
			name: 'saleEndDate',
			label: 'Sale End Date',
			type: 'date',
		},
		{
			name: 'description',
			label: 'Description',
			as: 'textarea',
			rows: 10,
			placeholder: 'Product Description',
			required: true,
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
							<option value={item._id} key={item._id}>
								{item.catName}
							</option>
						);
					})}
				</Form.Select>
			</Form.Group>
			{inputFields.map((item, i) => {
				return <CustomInput key={i} {...item} onChange={handleOnChange} />;
			})}
			<Button variant="primary" type="submit">
				Submit
			</Button>
		</Form>
	);
};