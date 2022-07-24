import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { postPaymentMethodAction } from '../../pages/payment-method/PaymentMethodActions';

import { CustomInput } from '../custom-input/CustomInput';
import { MyVerticallyCenteredModal } from '../modal/Modal';
const intialState = {
	status: 'inactive',
	name: '',
	description: '',
};
export const PaymentMethodEditForm = () => {
	const [form, setForm] = useState(intialState);
	const dispatch = useDispatch();
	const inputFields = [
		{
			name: 'name',
			label: 'Payment Method Name',
			type: 'text',
			required: true,
		},
		{
			name: 'description',
			label: 'Description',
			type: 'text',
			as: 'textarea',
			required: true,
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
