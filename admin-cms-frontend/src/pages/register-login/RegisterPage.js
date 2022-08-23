import React from 'react';
import { RegisterForm } from '../../components/register-form/RegisterForm';
import AdminLayout from '../layouts/AdminLayout';
export const RegisterPage = () => {
	return (
		<AdminLayout>
			<RegisterForm />
		</AdminLayout>
	);
};
