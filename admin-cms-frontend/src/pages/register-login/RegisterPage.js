import React from 'react';
import { RegisterForm } from '../../components/register-form/RegisterForm';
import { DefaultLayout } from '../layouts/DefaultLayout';

export const RegisterPage = () => {
	return (
		<DefaultLayout>
			<RegisterForm />
		</DefaultLayout>
	);
};
