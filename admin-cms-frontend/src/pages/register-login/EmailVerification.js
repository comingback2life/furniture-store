import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { postEmailVerification } from '../../helpers/axiosHelpers';
import { Alert, Button, Spinner } from 'react-bootstrap';
export const EmailVerification = () => {
	const [qryString] = useSearchParams();
	const [isPending, setIsPending] = useState(true);
	const [response, setResponse] = useState({});
	const [showAlert, setShowAlert] = useState(true);
	useEffect(() => {
		const obj = {
			emailValidationCode: qryString.get('c'),
			email: qryString.get('e'),
		};
		(async () => {
			const response = await postEmailVerification(obj);
			setResponse(response);
			setIsPending(false);
		})();
	}, []);

	return (
		<div className="d-flex justify-content-center">
			<div className="verify-email text-center mt-5 w-50 p-2 ">
				<h2>Verifying awesomeness.</h2>
				<hr />

				{isPending && (
					<>
						{' '}
						<Spinner variant={'primary'} animation="border" /> Please Wait.....{' '}
					</>
				)}
				{response.message && showAlert && (
					<Alert
						variant={response.status === 'success' ? 'success' : 'danger'}
						onClose={() => setShowAlert(false)}
						dismissible
					>
						{response.message}
					</Alert>
				)}
				{response.status === 'success' && (
					<Button variant="btn btn-outline-danger">
						<Link to="/login" className=" text-dark text-decoration-none">
							Login Now
						</Link>
					</Button>
				)}
			</div>
		</div>
	);
};
