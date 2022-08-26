import React, { useState } from 'react';
import { useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { PaymentMethodEditForm } from '../../components/paymentMethod-form/PaymentMethodEditForm.js';
import {
	deletePaymentMethodAction,
	fetchPaymentMethods,
	editPaymentMethodAction,
} from './PaymentMethodActions.js';
import { PaymentMethodForm } from '../../components/paymentMethod-form/PaymentMethodForm.js';
export const PaymentMethodsTable = ({ showForm, setShowForm }) => {
	const dispatch = useDispatch();
	const { paymentMethods } = useSelector((state) => state.paymentMethod);
	const [ids, setIds] = useState([]);
	useEffect(() => {
		dispatch(fetchPaymentMethods());
	}, []);

	const handleOnEditModalShow = (_id) => {
		setShowForm(false);
		dispatch(editPaymentMethodAction(_id));
	};
	const handleOnCheckedChange = (e) => {
		const { name, value } = e.target;
		console.log(name, value);
	};
	return (
		<div className="">
			{showForm ? <PaymentMethodForm /> : <PaymentMethodEditForm />}
			<p>{paymentMethods.length} Payment Methods found</p>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>
							<Form.Check name="status" value="all" />
						</th>
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
								<td>
									<Form.Check
										value={_id}
										name="status"
										onChange={handleOnCheckedChange}
									/>
								</td>
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
									<Button
										variant="danger mx-1"
										onClick={() => dispatch(deletePaymentMethodAction(_id))}
									>
										<i className="fa-solid fa-trash-can"></i>
									</Button>
									<Button
										variant="warning"
										onClick={() => handleOnEditModalShow(_id)}
									>
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
