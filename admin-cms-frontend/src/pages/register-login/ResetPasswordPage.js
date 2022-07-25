import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { LoginForm } from '../../components/login-form/LoginForm';
import { ResetPasswordForm } from '../../components/password-reset/ResetPasswordForm';
import { ResetPasswordOTPForm } from '../../components/password-reset/ResetPasswordOTPForm';
import { DefaultLayout } from '../layouts/DefaultLayout';

const ResetPasswordPage = () => {
	const { showForm } = useSelector((state) => state.admin);
	const form = {
		OTP: <ResetPasswordOTPForm />,
		password: <ResetPasswordForm />,
	};
	return <DefaultLayout>{form[showForm]}</DefaultLayout>;
};
export default ResetPasswordPage;
