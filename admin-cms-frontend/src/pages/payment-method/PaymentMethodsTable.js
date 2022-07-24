import React from 'react';
import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useDispatch } from 'react-redux';
import { fetchPaymentMethods } from './PaymentMethodActions';

export const PaymentMethodsTable = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchPaymentMethods());
	}, []);
	return (
		<div className="">
			<p>5 Payment Methods found</p>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>#</th>
						<th>Payment Name</th>
						<th>Description</th>
						<th>Status</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>1</td>
						<td>Mark</td>
						<td>Otto</td>
						<td>@mdo</td>
						<td>@mdo</td>
					</tr>
					<tr>
						<td>2</td>
						<td>Jacob</td>
						<td>Thornton</td>
						<td>@fat</td>
						<td>
							<Button variant="danger mx-1">
								<i className="fa-solid fa-trash-can"></i>
							</Button>
							<Button variant="warning">
								<i className="fa-solid fa-pen-to-square"></i>
							</Button>
						</td>
					</tr>
				</tbody>
			</Table>
		</div>
	);
};
