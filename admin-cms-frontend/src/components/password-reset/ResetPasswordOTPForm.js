import React, { useState } from 'react';
import { Alert, Form, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { resetPasswordAction } from '../../pages/admin-profile/AdminProfileAction.js';

export const ResetPasswordOTPForm = () => {
	const dispatch = useDispatch();

	const { passResetResponse, isLoading, passResetEmail } = useSelector(
		(state) => state.admin
	);
	const [form, setForm] = useState({});
	const [showAlert, setShowAlert] = useState(true);
	const [error, setError] = useState('');

	const handleOnSubmit = (e) => {
		e.preventDefault();
		setShowAlert(true);
		const { confirmPassword, ...rest } = form;
		if (confirmPassword !== rest.password) {
			return setError('Passwords still do not match');
		}
		rest.email = passResetEmail;
		dispatch(resetPasswordAction(rest));
	};

	const handleOnChange = (e) => {
		const { name, value } = e.target;
		setError('');
		setForm({
			...form,
			[name]: value,
		});
		if (name === 'confirmPassword' || name === 'password') {
			const { password } = form;
			!password && setError('New password must be provided');
			password !== value && setError('Passwords do not match');
			const passwordValidation = new RegExp(
				'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
			);
			!passwordValidation.test(password) &&
				setError('Password does not follow the rule');
		}
	};
	return (
		<div className="login-container">
			<div className="container">
				<div className="row">
					<div className="col-lg-10 col-xl-9 mx-auto">
						<div className="card flex-row my-5 border-0 shadow rounded-3 overflow-hidden">
							<div className="card-img-left d-none d-md-flex"></div>
							<div className="card-body p-4 p-sm-5">
								<h4 className="card-title text-center mb-5 fw-light">
									Reset Password !
								</h4>
								{isLoading && <Spinner variant="primary" animation="border" />}
								{passResetResponse.message && showAlert && (
									<Alert
										variant={
											passResetResponse.status === 'success'
												? 'success'
												: 'danger'
										}
										dismissible
										onClose={() => setShowAlert(false)}
									>
										{passResetResponse.message}
									</Alert>
								)}
								<Form onSubmit={handleOnSubmit}>
									<div className="form-floating mb-3">
										<input
											onChange={handleOnChange}
											type="number"
											className="form-control"
											id="OTP"
											name="OTP"
											required
										/>
										<Form.Label>OTP</Form.Label>
									</div>
									<div className="form-floating mb-3">
										<input
											onChange={handleOnChange}
											type="password"
											className="form-control"
											id="password"
											name="password"
											required
										/>
										<Form.Text>
											Password must contain lowercase, UPPERCASE , symbol and a
											number and should not be less than 8 characters.
										</Form.Text>

										<Form.Label>Password</Form.Label>
									</div>
									<div className="form-floating mb-3">
										<input
											onChange={handleOnChange}
											type="password"
											className="form-control"
											id="confirmPassword"
											name="confirmPassword"
											required
										/>
										<Form.Text className="text-danger fw-bold mt-2">
											{error}
										</Form.Text>
										<Form.Label>Confirm Password</Form.Label>
									</div>

									<div className="d-grid mb-2">
										<button
											className="btn btn-lg btn-primary btn-login fw-bold text-uppercase"
											type="submit"
											disabled={error}
										>
											Update Password 🥳
										</button>
									</div>
								</Form>
								<div className="text-end mt-4">
									<a href="/reset-password">
										I remember it, take me to login ?
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
