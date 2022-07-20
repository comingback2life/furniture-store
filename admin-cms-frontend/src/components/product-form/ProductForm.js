import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { CustomInput } from '../custom-input/CustomInput';
import { fetchCategoriesAction } from '../../pages/categories/CategoriesAction';
export const ProductForm = () => {
	const dispatch = useDispatch();
	const { categories } = useSelector((state) => state.categories);
	const [form, setForm] = useState({});
	useEffect(() => {
		dispatch(fetchCategoriesAction());
	}, []);

	const handleOnChange = (e) => {
		let { checked, name, value } = e.target;
		setForm({
			...form,
			[name]: value,
		});
	};

	const handleOnSubmit = (e) => {
		e.preventDefault();
		console.log(form);
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
			name: 'saleDate',
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
					required
				/>
			</Form.Group>
			<Form.Group className="mb-3">
				<Form.Select
					name="parentCatId"
					defaultValue="Choose..."
					onChange={handleOnChange}
					required
				>
					<option value="">**Select Parent Category**</option>
					{categories.map((item) => {
						return (
							!item.parentCatId && (
								<option value={item._id} key={item._id}>
									{item.catName}
								</option>
							)
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
