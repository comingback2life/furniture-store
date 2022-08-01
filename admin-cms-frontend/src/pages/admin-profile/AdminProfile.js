import React, { useState } from 'react';
import { useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { CustomInput } from '../../components/custom-input/CustomInput';
import AdminLayout from '../layouts/AdminLayout';
import {
	updateAdminProfileAction,
	updatePasswordAction,
} from './AdminProfileAction';
const initialState = {
	currentPassword: '',
	userPassword: '',
	confirmPassword: '',
};
export const AdminProfile = () => {
	const { user } = useSelector((state) => state.admin);
	const [form, setForm] = useState({});
	const [updatePasswordForm, setPassUpdateForm] = useState({});
	const [error, setError] = useState('');
	const [disableButton, setDisableButton] = useState(false);

	const dispatch = useDispatch();
	useEffect(() => {
		setForm(user);
	}, [user]);

	//profile update

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
			name: 'userPassword',
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
		const { createdAt, emailValidationCode, updatedAt, __v, status, ...rest } =
			form;
		dispatch(updateAdminProfileAction(rest));
	};

	//password update

	const handleOnPasswordChange = (e) => {
		const { name, value } = e.target;
		setError('');
		setDisableButton(true);
		setPassUpdateForm({
			...updatePasswordForm,
			[name]: value,
		});
		if (name === 'confirmPassword' || name === 'userPassword') {
			const { userPassword } = updatePasswordForm;
			!userPassword && setError('New password must be provided');
			userPassword !== value && setError('Passwords do not match');
			const passwordValidation = new RegExp(
				'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
			);
			!passwordValidation.test(userPassword) &&
				setError('Password does not follow the rule');
		}
	};
	const handleOnPasswordSubmit = (e) => {
		e.preventDefault();
		const { confirmPassword, userPassword, currentPassword } =
			updatePasswordForm;
		if (confirmPassword !== userPassword) {
			return setError('Passwords still do not match');
		}
		const userObj = {
			email: user.email,
			userPassword,
			currentPassword,
		};
		dispatch(updatePasswordAction(userObj));
	};

	const disableButtonOnError = () => {
		!error && setDisableButton(false);
	};
	const resetPasswordFields = [
		{
			label: 'Current Password',
			name: 'currentPassword',
			type: 'password',
			value: updatePasswordForm.currentPassword,
			required: true,
		},
		{
			label: 'New Password',
			name: 'userPassword',
			type: 'password',
			value: updatePasswordForm.userPassword,
			required: true,
		},
		{
			label: 'Confirm Password',
			name: 'confirmPassword',
			type: 'password',
			value: updatePasswordForm.confirmPassword,
			required: true,
			onBlur: disableButtonOnError,
		},
	];

	return (
		<AdminLayout>
			<div>
				<h3 className="display-6">Your Profile</h3>
				<Form onSubmit={handleOnSubmit}>
					{inputFields.map((item, i) => {
						return <CustomInput key={i} {...item} onChange={handleOnChange} />;
					})}
					<Button type="submit" className="mt-3 mb-2">
						Update Profile
					</Button>
				</Form>
				<hr />
				<div className="update-password">
					<Form onSubmit={handleOnPasswordSubmit}>
						{resetPasswordFields.map((item, i) => {
							return (
								<CustomInput
									key={i}
									{...item}
									onChange={handleOnPasswordChange}
								/>
							);
						})}
						<Form.Group className="mb-3">
							<Form.Text>
								Password must contain lowercase, UPPERCASE , symbol and a number
								and should not be less than 8 characters.
							</Form.Text>
						</Form.Group>
						<Form.Text className="text-danger fw-bold mt-2">{error}</Form.Text>
						<Button
							type="submit"
							disabled={disableButton}
							className="d-flex mt-2 mb-3"
						>
							Update Profile
						</Button>
					</Form>
				</div>
			</div>
		</AdminLayout>
	);
};
