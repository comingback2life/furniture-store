import React, { useState } from 'react';
import { useRef } from 'react';
import { Alert, Form, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestPasswordResetOTPAction } from '../../pages/admin-profile/AdminProfileAction';
export const ResetPasswordForm = () => {
	const dispatch = useDispatch();
	const { passResetResponse, isLoading } = useSelector((state) => state.admin);
	const [showAlert, setShowAlert] = useState(true);
	const emailRef = useRef();

	useEffect(() => {}, []);

	const handleOnSubmit = (e) => {
		e.preventDefault();
		const email = emailRef.current.value;
		dispatch(requestPasswordResetOTPAction({ email }));
		setShowAlert(true);
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
									Reset Password
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
											ref={emailRef}
											type="email"
											className="form-control"
											id="floatingInputEmail"
											name="email"
											placeholder="name@example.com"
											required
										/>
										<Form.Label>Email</Form.Label>
									</div>

									<div className="d-grid mb-2">
										<button
											className="btn btn-lg btn-primary btn-login fw-bold text-uppercase"
											type="submit"
										>
											Reset😓
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
