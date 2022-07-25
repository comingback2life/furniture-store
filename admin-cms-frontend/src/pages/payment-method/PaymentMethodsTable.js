import React, { useState } from 'react';
import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { PaymentMethodEditForm } from '../../components/paymentMethod-form/PaymentMethodEditForm.js';
import {
	deletePaymentMethodAction,
	fetchPaymentMethods,
	editPaymentMethodAction,
} from './PaymentMethodActions.js';
import { toggleModal } from '../../system-state/systemSlice.js';
import { PaymentMethodForm } from '../../components/paymentMethod-form/PaymentMethodForm.js';
export const PaymentMethodsTable = ({ showForm, setShowForm }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchPaymentMethods());
	}, []);

	const handleOnEditModalShow = (_id) => {
		setShowForm(false);
		dispatch(editPaymentMethodAction(_id));
	};
	const { paymentMethods } = useSelector((state) => state.paymentMethod);
	return (
		<div className="">
			{showForm ? <PaymentMethodForm /> : <PaymentMethodEditForm />}
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
