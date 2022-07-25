import React, { useState } from 'react';
import { useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchPaymentMethods,
	postPaymentMethodAction,
} from '../../pages/payment-method/PaymentMethodActions';

import { CustomInput } from '../custom-input/CustomInput';
import { MyVerticallyCenteredModal } from '../modal/Modal';
const initialState = {
	status: 'inactive',
	name: '',
	description: '',
};
export const PaymentMethodEditForm = () => {
	const dispatch = useDispatch();
	const [form, setForm] = useState(initialState);
	const { selectedPaymentMethod } = useSelector((state) => state.paymentMethod);

	useEffect(() => {
		setForm(selectedPaymentMethod);
	}, [selectedPaymentMethod]);

	const inputFields = [
		{
			name: 'name',
			label: 'Payment Method Name',
			type: 'text',
			required: true,
			value: form.name,
		},
		{
			name: 'description',
			label: 'Description',
			type: 'text',
			as: 'textarea',
			required: true,
			value: form.description,
		},
	];

	const handleOnChange = (e) => {
		let { checked, value, name } = e.target;
		if (name === 'status') {
			value = checked ? 'active' : 'inactive';
		}
		setForm({
			...form,
			[name]: value,
		});
	};

	// const handleOnSubmit = (e) => {
	// 	e.preventDefault();
	// 	dispatch(postPaymentMethodAction(form));
	// };
	return (
		<div>
			<MyVerticallyCenteredModal title="Edit Payment Method">
				<Form>
					<Form.Check
						type="switch"
						name="status"
						label="Status"
						className="mb-3"
						onChange={handleOnChange}
						checked={form.status === 'active'}
					/>
					{inputFields.map((item) => (
						<CustomInput
							key={item + item.label}
							label={item.label}
							{...item}
							onChange={handleOnChange}
						/>
					))}
					<Form.Group>
						<Button variant="btn btn-outline-success" type="submit">
							Add Payment Method
						</Button>
					</Form.Group>
				</Form>
			</MyVerticallyCenteredModal>
		</div>
	);
};
