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
			value: user.fName,
			required: true,
		},
		{
			label: 'Last Name',
			name: 'lName',
			type: 'text',
			trim: 'true',
			value: user.lName,
			required: true,
		},
		{
			label: 'Email',
			name: 'email',
			type: 'email',
			trim: 'true',
			value: user.email,
			required: true,
		},
		{
			label: 'Phone',
			name: 'phone',
			type: 'text',
			trim: 'true',
			value: user.phone,
		},
		{
			label: 'Address',
			name: 'address',
			type: 'text',
			trim: 'true',
			value: user.address,
		},
		{
			label: 'Date',
			name: 'dob',
			type: 'date',
		},
		{
			label: 'Current Password',
			name: 'currentPassword',
			type: 'password',
		},
	];
	return (
		<AdminLayout>
			<div>
				<h3 className="display-6">Your Profile</h3>
				<Form>
					{inputFields.map((item, i) => {
						return <CustomInput key={i} {...item} />;
					})}
					<Button type="submit">Update Profile</Button>
				</Form>
				<hr />
				<div className="update-password"></div>
			</div>
		</AdminLayout>
	);
};
