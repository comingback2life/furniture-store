import React from 'react';
import { useRef } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { postLoginUserAction } from '../../pages/register-login/signInUpAction';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export const ResetPasswordForm = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	// const { isLoading } = useSelector((state) => state.signInUp);
	const { user } = useSelector((state) => state.admin);
	const emailRef = useRef();
	const passRef = useRef(); //

	useEffect(() => {
		user._id && navigate('/admin/dashboard');
	}, [user]);

	const handleOnSubmit = (e) => {
		e.preventDefault();
		const email = emailRef.current.value;
		const userPassword = passRef.current.value; //if we want values without the component being re-rendered, useRef is a good idea.
		if (!email || !userPassword) {
			return alert('Both fields must be filled');
		}
		dispatch(postLoginUserAction({ email, userPassword }));
		//Call the API through action file
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
								<Form onSubmit={handleOnSubmit}>
									<div className="form-floating mb-3">
										<input
											ref={emailRef}
											type="email"
											className="form-control"
											id="floatingInputEmail"
											name="email"
											value="callmesamip@gmail.com"
											placeholder="name@example.com"
											required
										/>
										<Form.Label>Email</Form.Label>
									</div>

									<div className="form-floating mb-3">
										<input
											ref={passRef}
											type="password"
											value="123Samip"
											className="form-control"
											id="floatingPassword"
											placeholder="Password"
											name="userPassword"
											required
										/>
										<Form.Label>Password</Form.Label>
									</div>
									<div className="d-grid mb-2">
										<button
											className="btn btn-lg btn-primary btn-login fw-bold text-uppercase"
											type="submit"
										>
											Login
										</button>
									</div>
								</Form>
								<div className="text-end mt-4">
									<a href="/reset-password">Forgot Password ?</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
