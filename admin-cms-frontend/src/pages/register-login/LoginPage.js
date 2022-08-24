import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoginForm } from '../../components/login-form/LoginForm';
import { DefaultLayout } from '../layouts/DefaultLayout';
import { autoLogin } from './signInUpAction';

export const LoginPage = () => {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.admin);
	useEffect(() => {
		!user._id && dispatch(autoLogin());
	}, [user._id]);
	return (
		<DefaultLayout>
			<LoginForm />
		</DefaultLayout>
	);
};
