import React from 'react';
import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPaymentMethods } from './PaymentMethodActions.js';

export const PaymentMethodsTable = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchPaymentMethods());
	}, []);

	const { paymentMethods } = useSelector((state) => state.paymentMethod);
	return (
		<div className="">
			<p>{paymentMethods.length} Payment Methods found</p>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>#</th>
						<th>Payment Name</th>
						<th>Status</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{paymentMethods.map(({ _id, status, name, description }, i) => {
						return (
							<tr key={status + 'name' + name}>
								<td>{i + 1}</td>
								<td>
									{name}
									<i
										className="fa-solid fa-circle-info text-primary p-2"
										title={description}
									></i>
								</td>
								<td
									className={
										status === 'active' ? 'text-success' : 'text-danger'
									}
								>
									{status}
								</td>
								<td>
									<Button variant="danger mx-1">
										<i className="fa-solid fa-trash-can"></i>
									</Button>
									<Button variant="warning">
										<i className="fa-solid fa-pen-to-square"></i>
									</Button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
		</div>
	);
};
