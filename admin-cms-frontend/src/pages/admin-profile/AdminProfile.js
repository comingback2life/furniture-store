import React, { useState } from 'react';
import { useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { CustomInput } from '../../components/custom-input/CustomInput';
import AdminLayout from '../layouts/AdminLayout';

export const AdminProfile = () => {
	const { user } = useSelector((state) => state.admin);
	const [form, setForm] = useState({});

	useEffect(() => {
		setForm(user);
	}, [user]);
	const inputFields = [
		{
			label: 'First Name',
			name: 'fName',
			type: 'text',
			trim: 'true',
			value: form.fName,
			required: true,
		},
		{
			label: 'Last Name',
			name: 'lName',
			type: 'text',
			trim: 'true',
			value: form.lName,
			required: true,
		},
		{
			label: 'Email',
			name: 'email',
			type: 'email',
			trim: 'true',
			value: form.email,
			required: true,
			disabled: true,
		},
		{
			label: 'Phone',
			name: 'phone',
			type: 'text',
			trim: 'true',
			value: form.phone,
		},
		{
			label: 'Address',
			name: 'address',
			type: 'text',
			trim: 'true',
			value: form.address,
		},
		{
			label: 'Date',
			name: 'dob',
			type: 'date',
			value: form.dob ? form.dob.substr(0, 10) : undefined,
		},
		{
			label: 'Current Password',
			name: 'currentPassword',
			type: 'password',
			required: true,
		},
	];

	const handleOnChange = (e) => {
		const { name, value } = e.target;
		setForm({
			...form,
			[name]: value,
		});
	};

	const handleOnSubmit = (e) => {
		e.preventDefault();
		console.log(form);
	};
	return (
		<AdminLayout>
			<div>
				<h3 className="display-6">Your Profile</h3>
				<Form onSubmit={handleOnSubmit}>
					{inputFields.map((item, i) => {
						return <CustomInput key={i} {...item} onChange={handleOnChange} />;
					})}
					<Button type="submit">Update Profile</Button>
				</Form>
				<hr />
				<div className="update-password"></div>
			</div>
		</AdminLayout>
	);
};
