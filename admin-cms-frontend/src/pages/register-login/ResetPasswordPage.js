import React from 'react';
import { LoginForm } from '../../components/login-form/LoginForm';
import { ResetPasswordForm } from '../../components/password-reset/ResetPasswordForm';
import { DefaultLayout } from '../layouts/DefaultLayout';

const ResetPasswordPage = () => {
	return (
		<DefaultLayout>
			<ResetPasswordForm />
		</DefaultLayout>
	);
};
export default ResetPasswordPage;
