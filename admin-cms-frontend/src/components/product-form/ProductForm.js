import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { CustomInput } from '../custom-input/CustomInput';

export const ProductForm = () => {
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
			type: 'text',
			placeholder: 'Product Description',
			required: true,
		},
	];

	return (
		<Form>
			{inputFields.map((item, i) => {
				return <CustomInput key={i} {...item} />;
			})}
			<Button variant="primary" type="submit">
				Submit
			</Button>
		</Form>
	);
};
