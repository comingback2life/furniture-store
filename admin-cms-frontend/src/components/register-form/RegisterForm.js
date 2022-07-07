import React from 'react';
import { useState } from 'react';
import { Alert, Form } from 'react-bootstrap';
import './RegisterForm.styles.css';
export const RegisterForm = () => {
	const [form, setForm] = useState({});
	const [error, setError] = useState(false);
	const handleOnChange = (e) => {
		const { name, value } = e.target;
		setForm({
			...form,
			[name]: value,
		});
	};
	const handleOnSubmit = (e) => {
		e.preventDefault();
		const { userPassword, confirmPassword } = form;
		if (userPassword === confirmPassword) {
			setError(false);
		} else {
			setError(true);
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
									Register
								</h4>
								<Form onSubmit={handleOnSubmit}>
									<div className="form-floating mb-3">
										<input
											onChange={handleOnChange}
											type="text"
											className="form-control"
											id="firstName"
											placeholder="First Name"
											name="fName"
											required
											autoFocus
										/>
										<Form.Label>First Name</Form.Label>
									</div>
									<div className="form-floating mb-3">
										<input
											onChange={handleOnChange}
											type="text"
											className="form-control"
											id="lastName"
											placeholder="Last Name"
											name="lName"
											required
										/>
										<Form.Label>Last Name</Form.Label>
									</div>

									<div className="form-floating mb-3">
										<input
											onChange={handleOnChange}
											type="email"
											className="form-control"
											id="floatingInputEmail"
											name="email"
											placeholder="name@example.com"
											required
										/>
										<Form.Label>Email Address</Form.Label>
									</div>
									<div className="form-floating mb-3">
										<input
											onChange={handleOnChange}
											type="date"
											className="form-control"
											id="dateOfBirth"
											name="dob"
											required
										/>
										<Form.Label>DOB</Form.Label>
									</div>
									<div className="form-floating mb-3">
										<input
											onChange={handleOnChange}
											type="text"
											className="form-control"
											id="floatingAddress"
											placeholder="Address"
											name="address"
											required
										/>
										<Form.Label>Address</Form.Label>
									</div>
									<div className="form-floating mb-3">
										<input
											onChange={handleOnChange}
											type="text"
											className="form-control"
											id="floatingPhone"
											placeholder="1111"
											name="phone"
											required
										/>
										<Form.Label>Phone</Form.Label>
									</div>

									<div className="form-floating mb-3">
										<input
											onChange={handleOnChange}
											type="password"
											className="form-control"
											id="floatingPassword"
											placeholder="Password"
											name="userPassword"
											required
										/>
										<Form.Label>Password</Form.Label>
									</div>

									<div className="form-floating mb-3">
										<input
											onChange={handleOnChange}
											type="password"
											className="form-control"
											id="floatingPasswordConfirm"
											placeholder="Confirm Password"
											name="confirmPassword"
											required
										/>
										<Form.Label>confirm Password</Form.Label>
									</div>
									<Alert variant="danger" show={error}>
										Passwords do not match
									</Alert>
									<div className="d-grid mb-2">
										<button
											className="btn btn-lg btn-primary btn-login fw-bold text-uppercase"
											type="submit"
										>
											Register
										</button>
									</div>

									<a className="d-block text-center mt-2 small" href="#">
										Have an account? Sign In
									</a>
								</Form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
